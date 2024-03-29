import { displayDate, changeDay } from "../../utils/dates";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const TaskListHeader = ({ day, setDay, setIsLoading }) => {
  const handleClick = (direction) => {
    setIsLoading(true);
    direction === "right"
      ? setDay(changeDay(day, 1))
      : setDay(changeDay(day, -1));
  };

  return (
    <div className="navbar bg-base-100 sticky top-0 p-0 pl-3 z-10">
      <div className="navbar-start">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => handleClick("left")}
        >
          <HiChevronLeft size={20} />
        </button>
      </div>
      <div className="navbar-center">
        <p className="btn btn-ghost normal-case text-l">{displayDate(day)}</p>
      </div>
      <div className="navbar-end">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => handleClick("right")}
        >
          <HiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskListHeader;
