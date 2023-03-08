const AddTaskParent = ({ parent, setParent, setParentPickerVisible }) => {
  return (
    <div>
      <label className="label">
        <span className="label-text text-neutral">Set Parent</span>
      </label>

      <div className="relative flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
          #
        </span>
        <input
          type="text"
          className="rounded-none rounded-r-lg bg-gray-50 border border-[#1CC5CB] text-gray-900 focus-visible:outline-none focus:ring-2 focus:ring-[#1CC5CB] focus:ring-offset-2 focus:border focus:border-[#1CC5CB] block flex-1 min-w-0 w-full text-sm p-2.5"
          placeholder="Search for a project"
          value={parent.title}
          onChange={(e) => setParent({ ...parent, title: e.target.value })}
        />
        <button
          className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-[#1CC5CB] rounded-r-lg border border-[#1CC5CB] hover:bg-white hover:text-[#1CC5CB]"
          onClick={() => setParentPickerVisible(true)}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
};

export default AddTaskParent;
