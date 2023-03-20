import { useState } from "react";
import { markDone } from "../../utils/api";

import { HiFlag } from "react-icons/hi2";

import LoadingSpinner from "../../components/LoadingSpinner";

const Task = ({ task, apiToken, updateTasks }) => {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = () => {
    setIsLoading(true);
    markDone(apiToken, task["_id"]).then((id) => {
      updateTasks(id);
      setIsLoading(false);
    });
  };

  return (
    <li className="flex items-center gap-3 px-2 py-3 hover:bg-neutral-50 text-base">
      {isLoading ? (
        <LoadingSpinner height="h-5" width="w-5" />
      ) : task.db === "Tasks" ? (
        <input
          type="checkbox"
          checked={checked}
          className="w-6 h-6 big"
          onChange={handleChange}
          onMouseEnter={() => {
            setChecked(true);
          }}
          onMouseLeave={() => {
            setChecked(false);
          }}
        />
      ) : (
        <HiFlag size={20} className="text-primary" />
      )}
      <label>{task.title}</label>
    </li>
  );
};

export default Task;
