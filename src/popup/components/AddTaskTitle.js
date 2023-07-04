import { BsX } from "react-icons/bs";

const AddTaskTitle = ({ title, setTaskTitle }) => {
  return (
    <div>
      <div className="flex flex-row items-center gap-0.5">
        <label className="label">
          <span className="label-text text-neutral">Task title</span>
        </label>
        {title.length > 0 && (
          <button
            type="button"
            className="relative btn btn-xs btn-ghost btn-circle no-animation text-red-500 mb-[0.15rem]"
            data-hov="clear title"
            data-pos="C"
            onClick={() => setTaskTitle("")}
          >
            <BsX size={18} />
          </button>
        )}
      </div>
      <input
        type="text"
        value={title}
        onChange={(event) => {
          setTaskTitle(event.target.value);
        }}
        placeholder="Enter task title"
        className="input input-bordered input-primary w-full text-base"
        autoFocus={!title}
      />
    </div>
  );
};

export default AddTaskTitle;
