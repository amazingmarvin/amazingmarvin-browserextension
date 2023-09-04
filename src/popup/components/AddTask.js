import { useCallback, useState, useEffect } from "react";
import { formatDate, isValidDate } from "../../utils/dates";
import {
  getLastSyncedCustomSections,
  getStoredGeneralSettings,
  setStoredToken,
} from "../../utils/storage";
import {
  addTask,
  getCustomSections,
  getDefaultCustomSection,
} from "../../utils/api";

import { BsSun, BsMoon, BsCalendarPlus, BsCalendarX } from "react-icons/bs";

import AddTaskTitle from "./AddTaskTitle";
import AddTaskDate from "./AddTaskDate";
import AddTaskDatePicker from "./AddTaskDatePicker";
import AddTaskDuration from "./AddTaskDuration";
import AddTaskNote from "./AddTaskNote";
import AddTaskParent from "./AddTaskParent";
import AddTaskParentPicker from "./AddTaskParentPicker";
import AddTaskLabels from "./AddTaskLabels";
import MarvinButton from "../../components/MarvinButton";
import LoadingSpinner from "../../components/LoadingSpinner";

import "react-day-picker/dist/style.css";
import "../../styles/day-picker.css";

let messageCounter = 0;

const AddTask = ({ setOnboarded }) => {
  const [displaySettings, setDisplaySettings] = useState({});

  const [taskTitle, setTaskTitle] = useState(localStorage.savedTitle || "");
  const [note, setNote] = useState(localStorage.savedNote || "");
  const [scheduleDate, setScheduleDate] = useState("unassigned");
  const [scheduleDatePicker, setScheduleDatePicker] = useState({
    visible: false,
    selectedDate: isValidDate(scheduleDate) || new Date(),
  });
  const [dueDate, setDueDate] = useState("unassigned");
  const [dueDatePicker, setDueDatePicker] = useState({
    visible: false,
    selectedDate: isValidDate(dueDate) || new Date(),
  });
  const [timeEstimate, setTimeEstimate] = useState(null);
  const [parent, setParent] = useState({ title: "Inbox", _id: "" });
  const [parentPickerVisible, setParentPickerVisible] = useState(false);
  const [labels, setLabels] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const logout = useCallback(() => {
    setStoredToken(null);
    setOnboarded(false);
  }, []);

  useEffect(() => {
    getStoredGeneralSettings().then((settings) => {
      setDisplaySettings(settings);

      const {
        autoPopulateTaskTitle,
        displayTaskNoteInput,
        autoPopulateTaskNote,
        groupByMethod,
      } = settings;

      // Don't overwrite the task title if some text is already saved in local storage
      if (autoPopulateTaskTitle && taskTitle === "") {
        // Get the title of the current web page
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
          let url = tabs[0].url;
          chrome.tabs.sendMessage(
            tabs[0].id,
            { message: "getPageTitle" },
            (response) => {
              if (response) {
                setTaskTitle(`[${response.title}](${response.url})`);
              }
            }
          );
        });
      }
      // Don't overwrite the note if some text is already saved in local storage
      if (displayTaskNoteInput && autoPopulateTaskNote && note === "") {
        // Get the title of the current web page
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
          let url = tabs[0].url;
          chrome.tabs.sendMessage(
            tabs[0].id,
            { message: "getSelectedText" },
            (response) => {
              if (response) {
                setNote(response.selectedText);
              }
            }
          );
        });
      }

      if (groupByMethod === "customSection") {
        getLastSyncedCustomSections().then((lastSyncedCustomSections) => {
          if (formatDate(new Date()) !== lastSyncedCustomSections) {
            getCustomSections().then((customSections) => {
              getDefaultCustomSection();
            });
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    localStorage.savedTitle = taskTitle;
  }, [taskTitle]);

  useEffect(() => {
    localStorage.savedNote = note;
  }, [note]);

  useEffect(() => {
    const snapshot = ++messageCounter;
    if (message === "success") {
      setTimeout(() => {
        if (snapshot === messageCounter) {
          setMessage("");
        }
      }, 3000);
    }
  }, [message]);

  const resetForm = () => {
    setTaskTitle("");
    setNote("");
    setScheduleDate("unassigned");
    setScheduleDatePicker({
      visible: false,
      selectedDate: isValidDate(scheduleDate) || new Date(),
    });
    setDueDate("unassigned");
    setDueDatePicker({
      visible: false,
      selectedDate: isValidDate(dueDate) || new Date(),
    });
    setTimeEstimate(null);
    setParent({ title: "Inbox", _id: "" });
    setParentPickerVisible(false);
    setLabels([]);
  };

  const handleAddTask = useCallback(() => {
    setMessage("");
    let shortcuts = [];

    let data = {
      done: false,
      title: taskTitle,
      note: note,
    };

    if (scheduleDate !== "unassigned") {
      if (isValidDate(scheduleDate)) {
        data.day = scheduleDate;
      }

      if (scheduleDate === "today") {
        data.day = formatDate(new Date());
      }

      if (scheduleDate === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        data.day = formatDate(tomorrow);
      }
    }

    if (dueDate !== "unassigned") {
      if (isValidDate(dueDate)) {
        data.dueDate = dueDate;
      }

      if (dueDate === "today") {
        data.dueDate = formatDate(new Date());
      }

      if (dueDate === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        data.dueDate = formatDate(tomorrow);
      }
    }

    if (timeEstimate) {
      data.timeEstimate = timeEstimate;
    }

    if (parent._id) {
      data.parentId = parent._id;
    } else {
      shortcuts.push(`#${parent.title}`);
    }

    if (labels.length) {
      data.labelIds = labels.map((label) => label._id);
    }

    data.title = data.title + " " + shortcuts.join(" ");
    data.title = data.title.trim();

    setLoading(true);

    addTask(data).then((message) => {
      setLoading(false);

      if (message === "success") {
        setMessage("success");
        resetForm();
        delete localStorage.savedTitle;
        delete localStorage.savedNote;
      } else {
        setMessage("fail");
      }
    });
  }, [
    setMessage,
    setLoading,
    taskTitle,
    note,
    scheduleDate,
    dueDate,
    labels,
    parent,
    timeEstimate,
  ]);

  const scheduleDateButtons = [
    {
      value: "today",
      icon: <BsSun size={20} />,
      hoverText: "Schedule for today",
      hoverPos: "L",
      onChange: () => {
        setScheduleDate("today");
      },
    },
    {
      value: "tomorrow",
      icon: <BsMoon size={20} />,
      hoverText: "Schedule for tomorrow",
      hoverPos: "L",
      onChange: () => {
        setScheduleDate("tomorrow");
      },
    },
    {
      isDatePicker: true,
      value: isValidDate(scheduleDate),
      icon: <BsCalendarPlus size={20} />,
      hoverText: "Choose schedule date...",
      hoverPos: "L",
      onClick: () => {
        setScheduleDatePicker({
          ...scheduleDatePicker,
          visible: !scheduleDatePicker.visible,
        });
      },
      onChange: () => {
        setScheduleDatePicker({
          ...scheduleDatePicker,
          visible: !scheduleDatePicker.visible,
        });
      },
    },
    {
      value: "unassigned",
      icon: <BsCalendarX size={20} />,
      hoverText: "Not scheduled",
      hoverPos: "L",
      onChange: () => {
        setScheduleDate("unassigned");
      },
    },
  ];
  const dueDateButtons = [
    {
      value: "today",
      icon: <BsSun size={20} />,
      hoverText: "Due today",
      hoverPos: "R",
      onChange: () => {
        setDueDate("today");
      },
    },
    {
      value: "tomorrow",
      icon: <BsMoon size={20} />,
      hoverText: "Due tomorrow",
      hoverPos: "R",
      onChange: () => {
        setDueDate("tomorrow");
      },
    },
    {
      isDatePicker: true,
      value: isValidDate(dueDate),
      icon: <BsCalendarPlus size={20} />,
      hoverText: "Choose due date...",
      hoverPos: "R",
      onClick: () => {
        setDueDatePicker({
          ...dueDatePicker,
          visible: !dueDatePicker.visible,
        });
      },
      onChange: () => {
        setDueDatePicker({
          ...dueDatePicker,
          visible: !dueDatePicker.visible,
        });
      },
    },
    {
      value: "unassigned",
      icon: <BsCalendarX size={20} />,
      hoverText: "No due date",
      hoverPos: "R",
      onChange: () => {
        setDueDate("unassigned");
      },
    },
  ];
  const timeEstimateButtons = [
    { text: "5m", value: 300000 },
    { text: "10m", value: 600000 },
    { text: "15m", value: 900000 },
    { text: "20m", value: 1200000 },
    { text: "30m", value: 1800000 },
    { text: "45m", value: 2700000 },
    { text: "1h", value: 3600000 },
    { text: "1h 30m", value: 5400000 },
    { text: "2h", value: 7200000 },
  ];

  const keyUp = useCallback(
    (e) => {
      if (e.which === 13) {
        if (document.activeElement.tagName === "TEXTAREA") {
          // Don't create when the note is focused
        } else if (taskTitle) {
          handleAddTask();
        } else {
          setMessage("The task title is required");
        }
      }
    },
    [taskTitle, handleAddTask, setMessage]
  );

  const displayElements = () => {
    if (scheduleDatePicker.visible) {
      return (
        <AddTaskDatePicker
          selectedDate={scheduleDatePicker.selectedDate}
          handleSelect={(selectedDate) => {
            setScheduleDate(formatDate(selectedDate));
            setScheduleDatePicker({
              ...scheduleDatePicker,
              selectedDate,
              visible: false,
            });
          }}
          setDatePickerVisible={() => {
            setScheduleDatePicker({
              ...scheduleDatePicker,
              visible: false,
            });
          }}
        />
      );
    }

    if (dueDatePicker.visible) {
      return (
        <AddTaskDatePicker
          selectedDate={dueDatePicker.selectedDate}
          handleSelect={(selectedDate) => {
            setDueDate(formatDate(selectedDate));
            setDueDatePicker({
              ...dueDatePicker,
              selectedDate,
              visible: false,
            });
          }}
          setDatePickerVisible={() => {
            setDueDatePicker({
              ...dueDatePicker,
              visible: false,
            });
          }}
        />
      );
    }

    if (parentPickerVisible) {
      return (
        <AddTaskParentPicker
          parent={parent}
          setParent={setParent}
          setParentPickerVisible={setParentPickerVisible}
        />
      );
    }

    return (
      <div
        className="form-control justify-between w-full gap-4 divide-y"
        onKeyUp={keyUp}
      >
        <div
          id="AddTask"
          className="form-control w-full pt-2 pl-5 pr-2 overflow-y-scroll"
        >
          <AddTaskTitle title={taskTitle} setTaskTitle={setTaskTitle} />

          {displaySettings?.displayTaskNoteInput && (
            <AddTaskNote note={note} setNote={setNote} />
          )}

          <div className="flex flex-row justify-between">
            {displaySettings?.displayScheduleDatePicker && (
              <AddTaskDate
                type="Schedule date"
                date={scheduleDate}
                buttons={scheduleDateButtons}
              />
            )}

            {displaySettings.displayDueDatePicker && (
              <AddTaskDate
                type="Due date"
                date={dueDate}
                buttons={dueDateButtons}
              />
            )}
          </div>

          {displaySettings?.displayTimeEstimateButtons && (
            <AddTaskDuration
              timeEstimate={timeEstimate}
              setTimeEstimate={setTimeEstimate}
              timeEstimateButtons={timeEstimateButtons}
            />
          )}

          {displaySettings?.displaySetParentPicker && (
            <AddTaskParent
              parent={parent}
              setParent={setParent}
              setParentPickerVisible={setParentPickerVisible}
            />
          )}

          {displaySettings?.displaySetLabelsPicker && (
            <AddTaskLabels labels={labels} setLabels={setLabels} />
          )}
        </div>

        <div className="flex flex-wrap justify-center py-4 px-2">
          {message &&
            (message === "success" ? (
              <div
                className="p-4 my-1 text-sm text-green-800 rounded-lg bg-green-50"
                role="alert"
              >
                <span className="font-medium">Success!</span> Task was
                successfully added to Marvin.
              </div>
            ) : message === "fail" ? (
              <div
                className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                <span className="font-medium">Error!</span> Failed to add Task.
                If you rotated your API credentials, please{" "}
                <a href="#" onClick={logout}>
                  logout
                </a>
                . Otherwise try again or contact support!
              </div>
            ) : (
              <div
                className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {message}
              </div>
            ))}
          {!loading ? (
            <div
              className="relative w-full px-3"
              data-hov={taskTitle ? null : "The task title is required"}
              data-pos="T C"
            >
              <MarvinButton
                width="w-full"
                disabled={!taskTitle}
                onClick={handleAddTask}
              >
                Create Task
              </MarvinButton>
            </div>
          ) : (
            <LoadingSpinner height="h-5" width="w-5" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-auto flex flex-1 scrollbar-parent">
      {displayElements()}
    </div>
  );
};

export default AddTask;
