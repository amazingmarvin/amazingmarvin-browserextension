import { useState } from "react";

const Task = ({ task }) => {
  const [checked, setChecked] = useState(false);

  return (
    <li className="flex items-center gap-3 px-2 py-3 hover:bg-neutral-50 text-base">
      <input
        type="checkbox"
        checked={checked}
        className="checkbox checkbox-primary"
        onMouseEnter={() => {
          setChecked(true);
        }}
        onMouseLeave={() => {
          setChecked(false);
        }}
      />
      <label>{task.title}</label>
    </li>
  );
};

export default Task;
