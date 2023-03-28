import { useEffect, useState } from "react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

import { getTasks } from "../../utils/api";
import { formatDate } from "../../utils/dates";
import { setBadge } from "../../utils/badge";

import Task from "./Task";
import TaskListHeader from "./TaskListHeader";
import LoadingSpinner from "../../components/LoadingSpinner";

const TaskList = ({ apiToken }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [day, setDay] = useState(new Date());
  const [displayDate, setDisplayDate] = useState("today");

  useEffect(() => {
    getTasks(apiToken, day).then((tasks) => {
      setTasks(tasks);
      setIsLoading(false);

      if (formatDate(day) === formatDate(new Date())) setBadge(tasks.length);
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
        isLoading
          ? "scrollbar-hidden pr-3"
          : "overflow-y-scroll scrollbar-today"
      }
    >
      <TaskListHeader day={day} setDay={setDay} setIsLoading={setIsLoading} />
      {isLoading ? (
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
