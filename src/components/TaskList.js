import { getTasks } from "../utils/api";
import Task from "./Task";
import TaskListHeader from "./TaskListHeader";
import { useEffect, useState } from "react";
import { displayDate } from "../utils/dates";

const TaskList = ({ apiToken }) => {
  console.log(apiToken);
  const [tasks, setTasks] = useState([]);
  const [day, setDay] = useState(new Date());

  useEffect(() => {
    console.log("api token", apiToken);
    getTasks(apiToken, day).then((tasks) => {
      console.log("response in useffect", tasks);
      setTasks(tasks);
    });
  }, [day]);

  const renderedTasks = tasks.map((task) => {
    return <Task task={task} key={task["_id"]} />;
  });

  return (
    <div className="overflow-scroll scrollbar-hide">
      <TaskListHeader day={day} setDay={setDay} />
      <h2>{displayDate(day)}</h2>
      <ul>{renderedTasks}</ul>
    </div>
  );
};

export default TaskList;
