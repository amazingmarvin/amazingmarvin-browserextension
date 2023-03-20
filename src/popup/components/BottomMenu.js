import { HiSun, HiPlusCircle, HiCog6Tooth } from "react-icons/hi2";

const BottomMenu = ({ activeTab, setActiveTab }) => {
  return (
    <div className="h-16">
      <div className="btm-nav">
        <button
          onClick={() => setActiveTab("today")}
          className={`${
            activeTab === "today"
              ? "active bg-primary text-white"
              : "text-primary"
          }`}
        >
          <HiSun size="20" />
          <span className="btm-nav-label">Today</span>
        </button>
        <button
          onClick={() => setActiveTab("add-task")}
          className={`${
            activeTab === "add-task"
              ? "active bg-primary text-white"
              : "text-primary"
          }`}
        >
          <HiPlusCircle size="20" />
          <span className="btm-nav-label">Add Task</span>
        </button>
        <button
          className="text-primary"
          onClick={() => {
            chrome.runtime.openOptionsPage();
          }}
        >
          <HiCog6Tooth size="20" />
          <span className="btm-nav-label">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default BottomMenu;
