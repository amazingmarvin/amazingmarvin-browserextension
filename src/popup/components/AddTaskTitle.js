import React from "react";
import { BsX } from "react-icons/bs";

const AddTaskTitle = ({ title, setTaskTitle }) => {
  const select = React.useCallback((e) => {
    e.target.select();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center gap-0.5">
        <label className="label">
          <span className="label-text text-neutral">Task title</span>
        </label>
      </div>
      <div className="relative w-full">
        <input
          type="text"
          value={title}
          onChange={(event) => {
            setTaskTitle(event.target.value);
          }}
          placeholder="Enter task title"
          className="input input-bordered input-primary w-full text-base pr-[30px]"
          autoFocus={!title}
          onFocus={select}
        />

        {title.length > 0 && (
          <button
            type="button"
            className="absolute right-[8px] top-1/2 padding-4 transform -translate-y-1/2 no-animation text-gray-500"
            data-hov="Clear title"
            data-pos="R"
            onClick={() => setTaskTitle("")}
          >
            <BsX size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddTaskTitle;
