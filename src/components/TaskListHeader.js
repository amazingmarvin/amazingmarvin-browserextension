import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { displayDate, changeDay } from "../utils/dates";

const TaskListHeader = ({ day, setDay }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setDay(changeDay(day, -1))}
        >
          <HiChevronLeft size={20} />
        </button>
      </div>
      <div className="navbar-center">
        <p className="btn btn-ghost normal-case text-l">{displayDate(day)}</p>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle" onClick={() => setDay(changeDay(day, 1))}>
          <HiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskListHeader;
