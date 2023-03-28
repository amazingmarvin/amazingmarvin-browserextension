import { useCallback, useEffect, useState } from "react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

import { getTasks } from "../../utils/api";
import { formatDate } from "../../utils/dates";
import { setBadge } from "../../utils/badge";

import Task from "./Task";
import TaskListHeader from "./TaskListHeader";
import LoadingSpinner from "../../components/LoadingSpinner";

const TaskList = ({ apiToken, setOnboarded }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [day, setDay] = useState(new Date());
  const [displayDate, setDisplayDate] = useState("today");

  useEffect(() => {
    getTasks(apiToken, day).then(({ ok, res, tasks }) => {
      if (ok) {
        setTasks(tasks);
        setIsLoading(false);
        if (formatDate(day) === formatDate(new Date())) {
          setBadge(tasks.length);
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

  const logout = useCallback(() => {
    setStoredToken(null);
    setOnboarded(false);
  }, []);

  const updateTasks = (taskId) => {
    const filteredTasks = tasks.filter((task) => task["_id"] !== taskId);
    setTasks(filteredTasks);
  };

  const renderedTasks = tasks.map((task) => {
    return (
      <Task
        task={task}
        key={task["_id"]}
        apiToken={apiToken}
        updateTasks={updateTasks}
      />
    );
  });

  return (
    <div
      className={
        (isLoading || isError)
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
            <span className="font-medium">Error!</span> Failed to load Tasks.
            If you rotated your API credentials, please <a href="#" onClick={logout}>logout</a>. Otherwise try again or contact support!
          </div>
        </div>
      ) : isLoading ? (
        <div className="h-64 grid place-content-center p-8">
          <LoadingSpinner />
        </div>
      ) : tasks.length ? (
        <ul className="pb-[30px]">{renderedTasks}</ul>
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
