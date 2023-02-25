const AddTaskNote = ({ note, setNote }) => {
  return (
    <div>
      <label className="label">
        <span className="label-text text-neutral">Task note</span>
      </label>
      <textarea
        placeholder="Task note..."
        className="textarea textarea-bordered textarea-primary textarea-md w-full"
        onChange={(event) => {
          setNote(event.target.value);
        }}
      ></textarea>
    </div>
  );
};

export default AddTaskNote;
