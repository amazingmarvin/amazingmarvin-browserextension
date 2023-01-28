import { useState } from "react";
import TaskList from "./components/TaskList";
import BottomMenu from "./components/BottomMenu";


const App = () => {
  const [activeTab, setActiveTab] = useState("today");
  
  return (
    <div className="flex flex-col w-[400px] h-[400px]">
      {activeTab === "today" && <TaskList />}
      {activeTab === "add-task" && <div>creating task</div>}
      <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
