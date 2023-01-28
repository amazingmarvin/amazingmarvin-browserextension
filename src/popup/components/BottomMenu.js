import { HiSun, HiPlusCircle, HiCog6Tooth } from "react-icons/hi2";

const BottomMenu = () => {
  return (
    <div className="btm-nav">
      <button>
        <HiSun size="20"/>
        <span className="btm-nav-label">Today</span>
      </button>
      <button className="active">
        <HiPlusCircle size="20" />
        <span className="btm-nav-label">Add Task</span>
      </button>
      <button>
        <HiCog6Tooth size="20" />
        <span className="btm-nav-label">Settings</span>
      </button>
    </div>
  );
};

export default BottomMenu;
