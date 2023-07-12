import React from "react";
import { BsX } from "react-icons/bs";

const AddTaskNote = ({ note, setNote }) => {
  const select = React.useCallback((e) => {
    e.target.select();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center gap-0.5">
        <label className="label">
          <span className="label-text text-neutral">Task note</span>
        </label>
      </div>
      <div className="relative w-full">
        <textarea
          placeholder="Task note..."
          rows={1}
          value={note}
          className="textarea textarea-bordered textarea-primary w-full text-base pr-[30px]"
          onChange={(event) => {
            setNote(event.target.value);
          }}
          onFocus={select}
        />

        {note.length > 0 && (
          <button
            type="button"
            className="absolute right-[8px] top-[8px] padding-4 no-animation text-gray-500"
            data-hov="Clear note"
            data-pos="R"
            onClick={() => setNote("")}
          >
            <BsX size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddTaskNote;
