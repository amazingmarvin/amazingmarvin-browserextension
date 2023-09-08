import { useCallback, useEffect, useState } from "react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

import { getTasks } from "../../utils/api";
import { formatDate } from "../../utils/dates";
import { setBadge } from "../../utils/badge";
import {
  getStoredBadgeSettings,
  getStoredGeneralSettings,
  getStoredCustomSections,
  getStoredDefaultCustomSection,
} from "../../utils/storage";

import Task from "./Task";
import TaskListHeader from "./TaskListHeader";
import LoadingSpinner from "../../components/LoadingSpinner";

const TaskList = ({ apiToken, setOnboarded }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [day, setDay] = useState(new Date());
  const [displayDate, setDisplayDate] = useState("today");
  const [groupByMethod, setGroupByMethod] = useState("none"); // Can be "none", "dailyTasks", "bonusSection" or "customSection"
  const [customSections, setCustomSections] = useState([]);
  const [defaultCustomSection, setDefaultCustomSection] = useState("");
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [groupedTasks, setGroupedTasks] = useState({});

  useEffect(() => {
    getTasks(apiToken, day).then(({ ok, res, tasks }) => {
      if (ok) {
        setTasks(tasks);
        setIsLoading(false);
        if (formatDate(day) === formatDate(new Date())) {
          getStoredBadgeSettings().then((badgeSettings) => {
            if (badgeSettings.displayBadge) {
              setBadge(tasks.length);
            }
          });
        }
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    });
  }, [day]);

  useEffect(() => {
    switch (differenceInCalendarDays(day, new Date())) {
      case -1:
        setDisplayDate("yesterday");
        break;
      case 0:
        setDisplayDate("today");
        break;
      case 1:
        setDisplayDate("tomorrow");
        break;
      default:
        setDisplayDate(formatDate(day));
        break;
    }
  }, [day, setDisplayDate]);

  // Get settings from storage
  useEffect(() => {
    getStoredGeneralSettings().then((generalSettings) => {
      setGroupByMethod(generalSettings.groupByMethod);
    });
    getStoredCustomSections().then((customSections) => {
      setCustomSections(customSections);
    });
    getStoredDefaultCustomSection().then((defaultCustomSection) => {
      setDefaultCustomSection(defaultCustomSection);
    });
  }, []);

  // Group tasks by the selected method
  // once tasks and settings are loaded
  useEffect(() => {
    if (groupByMethod !== "none") {
      let defaultSection = "";
      let customSectionLookup = {};
      let defaultCustomSectionName = "";

      if (groupByMethod === "dailySection") {
        defaultSection = "Morning";
      } else if (groupByMethod === "bonusSection") {
        defaultSection = "Essential";
      } else if (groupByMethod === "customSection" && customSections?.length) {
        customSectionLookup = customSections.reduce((acc, section) => {
          acc[section.id] = section.title;
          return acc;
        }, {});
        defaultCustomSectionName =
          customSectionLookup[defaultCustomSection] || "Default section";
      }

      const sectionInfo = {
        defaultSection,
        customSectionLookup,
        defaultCustomSectionName,
      };

      const newGroupedTasks = tasks.reduce(
        groupTasksByKey(groupByMethod, sectionInfo),
        {}
      );
      setGroupedTasks(newGroupedTasks);
    } else {
      setGroupedTasks({ none: tasks });
    }
  }, [tasks, groupByMethod, customSections, defaultCustomSection]);

  const logout = useCallback(() => {
    setStoredToken(null);
    setOnboarded(false);
  }, []);

  const updateTasks = (taskId) => {
    const filteredTasks = tasks.filter((task) => task["_id"] !== taskId);
    setTasks(filteredTasks);
  };

  const groupTasksByKey = (key, sectionInfo) => {
    return (acc, task) => {
      let group = task[key];
      if (key === "customSection") {
        if (sectionInfo.customSectionLookup[group]) {
          group = sectionInfo.customSectionLookup[group];
        } else if (!group && sectionInfo.defaultCustomSectionName) {
          group = sectionInfo.defaultCustomSectionName;
        }
      }
      group = group || sectionInfo.defaultSection;
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(task);
      return acc;
    };
  };

  const toggleCollapse = (group) => {
    setCollapsedGroups((prevState) => ({
      ...prevState,
      [group]: !prevState[group],
    }));
  };

  const sectionOrder = {
    dailySection: ["Morning", "Afternoon", "Evening"],
    bonusSection: ["Essential", "Bonus"],
  };

  const renderedTasks = () => {
    const orderedGroups = Object.keys(groupedTasks).sort((a, b) => {
      if (groupByMethod in sectionOrder) {
        return (
          sectionOrder[groupByMethod].indexOf(a) -
          sectionOrder[groupByMethod].indexOf(b)
        );
      }
      return 0;
    });

    return orderedGroups.map((group) => (
      <div key={group} className="px-2">
        <h2
          className="text-primary text-lg font-semibold cursor-pointer pl-2 py-1"
          onClick={() => toggleCollapse(group)}
        >
          {group !== "none" && group}
          {collapsedGroups[group] && ` (${groupedTasks[group].length})`}
        </h2>
        <ul>
          {!collapsedGroups[group] &&
            groupedTasks[group].map((task) => (
              <Task
                task={task}
                key={task["_id"]}
                apiToken={apiToken}
                updateTasks={updateTasks}
              />
            ))}
        </ul>
      </div>
    ));
  };

  return (
    <div
      className={
        isLoading || isError
          ? "scrollbar-hidden pr-3"
          : "overflow-y-scroll scrollbar-today"
      }
    >
      <TaskListHeader day={day} setDay={setDay} setIsLoading={setIsLoading} />
      {isError ? (
        <div className="h-64 grid place-content-center p-8">
          <div
            className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium">Error!</span> Failed to load Tasks. If
            you rotated your API credentials, please{" "}
            <a href="#" onClick={logout}>
              logout
            </a>
            . Otherwise try again or contact support!
          </div>
        </div>
      ) : isLoading ? (
        <div className="h-64 grid place-content-center p-8">
          <LoadingSpinner />
        </div>
      ) : tasks.length ? (
        <ul className="pb-[30px]">{renderedTasks()}</ul>
      ) : (
        <div className="h-64 grid place-content-center p-8">
          <h2 className="text-lg">
            You don't have any tasks scheduled for {displayDate}.
          </h2>
        </div>
      )}
    </div>
  );
};

export default TaskList;
