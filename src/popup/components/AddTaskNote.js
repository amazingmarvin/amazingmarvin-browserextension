import { BsX } from "react-icons/bs";

const AddTaskNote = ({ note, setNote }) => {
  return (
    <div>
      <div className="flex flex-row items-center gap-0.5">
        <label className="label">
          <span className="label-text text-neutral">Task note</span>
        </label>
        {note.length > 0 && (
          <button
            type="button"
            className="relative btn btn-xs btn-ghost btn-circle no-animation text-red-500 mb-[0.15rem]"
            data-hov="clear note"
            data-pos="C"
            onClick={() => setNote("")}
          >
            <BsX size={18} />
          </button>
        )}
      </div>
      <textarea
        placeholder="Task note..."
        rows={1}
        value={note}
        className="textarea textarea-bordered textarea-primary w-full text-base"
        onChange={(event) => {
          setNote(event.target.value);
        }}
      ></textarea>
    </div>
  );
};

export default AddTaskNote;
