import { getTasks } from "../utils/api";
import Task from "./Task";
import TaskListHeader from "./TaskListHeader";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const TaskList = ({ apiToken }) => {
  console.log(apiToken);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [day, setDay] = useState(new Date());

  useEffect(() => {
    getTasks(apiToken, day).then((tasks) => {
      setTasks(tasks);
      setIsLoading(false);
    });
  }, [day]);

  const renderedTasks = tasks.map((task) => {
    return <Task task={task} key={task["_id"]} />;
  });

  return (
    <div className="overflow-scroll scrollbar-hide">
      <TaskListHeader day={day} setDay={setDay} setIsLoading={setIsLoading} />
      {isLoading ? (
        <div className="h-64 grid place-content-center p-8">
          <LoadingSpinner />
        </div>
      ) : tasks.length ? (
        <ul>{renderedTasks}</ul>
      ) : (
        <div className="h-64 grid place-content-center p-8">
          <h2 className="text-lg">
            You don't have any tasks scheduled for this day.
          </h2>
        </div>
      )}
    </div>
  );
};

export default TaskList;
