import { useState } from "react";
import { markDone } from "../../utils/api";

import { HiFlag, HiArrowTopRightOnSquare } from "react-icons/hi2";

import LoadingSpinner from "../../components/LoadingSpinner";

const Task = ({ task, apiToken, updateTasks }) => {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const urlRegex = /\[([^\]]+)]\((https?:\/\/\S+)\)/g;

  const handleChange = () => {
    setIsLoading(true);
    markDone(apiToken, task["_id"]).then((id) => {
      updateTasks(id);
      setIsLoading(false);
    });
  };

  return (
    <li
      className="flex items-center justify-between gap-3 px-2 py-3 hover:bg-neutral-50 text-base"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className="flex items-center gap-3 overflow-scroll scrollbar-hide">
        {isLoading ? (
          <LoadingSpinner height="h-5" width="w-5" />
        ) : task.db === "Tasks" ? (
          <div>
            <input
              type="checkbox"
              checked={checked}
              className="w-6 h-6 big basis-6"
              onChange={handleChange}
              onMouseEnter={() => {
                setChecked(true);
              }}
              onMouseLeave={() => {
                setChecked(false);
              }}
            />
          </div>
        ) : (
          <div className="h-6 w-6">
            <HiFlag size={20} className="text-primary" />
          </div>
        )}
        <label className="overflow-auto scrollbar-hide">
          {task.title.replace(urlRegex, "$1")}
        </label>
      </div>
      {isHovered && (
        <div
          className="relative hover:cursor-pointer"
          data-hov="Open in Marvin"
          data-pos="R"
        >
          <a
            href={`https://app.amazingmarvin.com/#${
              task.db === "Tasks" ? "t" : "p"
            }=${task._id}`}
            target="_blank"
          >
            <HiArrowTopRightOnSquare size={20} className="text-primary" />
          </a>
        </div>
      )}
    </li>
  );
};

export default Task;
