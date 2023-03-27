import { useCallback, useEffect, useState } from "react";

const AddTaskLabelsDropdown = ({ allLabels, labels, checkLabel }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLabels, setFilteredLabels] = useState(allLabels);

  useEffect(() => {
    setFilteredLabels(allLabels);
  }, [allLabels]);

  useEffect(() => {
    setFilteredLabels(
      allLabels.filter((label) =>
        label.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [labels]);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((x) => !x);
  }, [setIsDropdownOpen]);

  // Scroll to bottom after opening dropdown.
  useEffect(() => {
    if (isDropdownOpen) {
      document.getElementById("AddTask").scrollTop = 1e4;
    }
  }, [isDropdownOpen]);

  const filterLabels = (query) => {
    setSearchQuery(query);
    setFilteredLabels(
      allLabels.filter((label) =>
        label.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const classes = `
    w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primary/[0.8] focus:outline-none ${
      labels.length ? "mt-4" : ""
    }
  `;

  return (
    <div>
      <button
        id="dropdownSearchButton"
        data-dropdown-toggle="dropdownSearch"
        className={classes}
        type="button"
        onClick={toggleDropdown}
      >
        Select labels{" "}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdownSearch"
          className="w-full z-10 bg-white rounded-lg shadow"
        >
          <div className="p-3">
            <label htmlFor="input-group-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border border-[#1CC5CB] text-gray-900 focus-visible:outline-none focus:ring-2 focus:ring-[#1CC5CB] focus:ring-offset-2 focus:border focus:border-[#1CC5CB] block w-full pl-10 p-2.5"
                placeholder="Search labels"
                value={searchQuery}
                onInput={(e) => filterLabels(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <ul
            className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownSearchButton"
          >
            {filteredLabels.length > 0 &&
              filteredLabels.map((label) => {
                return (
                  <li key={label._id}>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100">
                      <input
                        checked={label.selected}
                        onChange={() => checkLabel(label)}
                        type="checkbox"
                        className="w-5 h-5 bg-gray-100 border-gray-300 rounded"
                      />
                      <label
                        onClick={() => checkLabel(label)}
                        className="w-full ml-2 text-sm font-medium text-gray-900 rounded"
                      >
                        {label.title}
                      </label>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddTaskLabelsDropdown;
