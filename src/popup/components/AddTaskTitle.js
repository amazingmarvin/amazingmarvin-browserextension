const AddTaskTitle = ({ title, setTaskTitle }) => {
  return (
    <div>
      <label className="label">
        <span className="label-text text-neutral">Task title</span>
      </label>
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
