import { useEffect, useState, useRef } from "react";
import { getStoredCategories } from "../utils/storage";
import MarvinButton from "./MarvinButton";

const AddTaskParentPicker = ({ parent, setParent, setParentPickerVisible }) => {
  const [searchQuery, setSearchQuery] = useState(
    parent.title === "Inbox" ? "" : parent.title
  );
  const [categories, setCategories] = useState([]);

  // useRef to store the previous value of searchQuery so that we can track
  // when searchQuery is shorter than the previous value
  let searchQueryRef = useRef(searchQuery);
  const filterCategories = (searchQuery, categories) => {
    if (!searchQuery || !categories) {
      return [];
    }

    return categories.filter((category) => {
      return category.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  useEffect(() => {
    if (
      !categories.length ||
      searchQuery.length < searchQueryRef.current.length ||
      !searchQueryRef.current.includes(searchQuery)
    ) {
      getStoredCategories().then((categories) => {
        let filteredCategories = filterCategories(searchQuery, categories);

        setCategories(filteredCategories);
      });

      return;
    }

    let filteredCategories = filterCategories(searchQuery, categories);
    setCategories(() => filteredCategories);

    searchQueryRef.current = searchQuery;
  }, [searchQuery]);

  const handleClose = () => {
    setParentPickerVisible(false);
  };

  const handleParentSelect = (category) => {
    setParent({ title: category.title, _id: category._id });
    handleClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="static grid place-content-center pt-4">
      <button
        className="btn btn-circle btn-outline btn-sm absolute top-2 right-2"
        onClick={handleClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <form
        className="flex items-center w-[250px]  justify-self-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="simple-search" className="sr-only">
          {searchQuery}
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
            id="simple-search"
            className="bg-gray-50 border rounded-lg border-[#1CC5CB] text-gray-900 focus-visible:outline-none focus:ring-2 focus:ring-[#1CC5CB] focus:ring-offset-2 focus:border focus:border-[#1CC5CB] block w-full pl-10 p-2.5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>
      </form>
      <div className="mt-4 max-w-[350px] space-y-1">
        {categories.map((category) => {
          return (
            <div
              key={category["_id"]}
              className="flex flex-row items-center gap-2 p-2 text-sm text-gray-800 rounded-lg bg-gray-50"
            >
              <div className="mr-auto p-1">{category.title}</div>
              <MarvinButton
                textSize="text-xs"
                onClick={() => handleParentSelect(category)}
              >
                Select
              </MarvinButton>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddTaskParentPicker;
