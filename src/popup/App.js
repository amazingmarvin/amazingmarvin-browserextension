import { useEffect, useState } from "react";

import { getStoredToken } from "../utils/storage";

import OnboardingPage from "./components/OnboardingPage";
import BottomMenu from "./components/BottomMenu";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

const App = () => {
  const [activeTab, setActiveTab] = useState("add-task");
  const [apiToken, setApiToken] = useState(localStorage.apiToken ? JSON.parse(localStorage.apiToken) : null);
  const [onboarded, setOnboarded] = useState(!!localStorage.apiToken);

  return (
    <div className="flex flex-col w-[400px] min-h-[400px] max-h-[600px] justify-between">
      {!onboarded ? (
        <OnboardingPage setApiToken={setApiToken} setOnboarded={setOnboarded} />
      ) : (
        <>
          {activeTab === "today" && <TaskList apiToken={apiToken} />}
          {activeTab === "add-task" && <AddTask />}
          <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  );
};

export default App;
