import { useEffect, useState } from "react";

import { getStoredToken } from "../utils/storage";

import OnboardingPage from "./components/OnboardingPage";
import BottomMenu from "./components/BottomMenu";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

let initialApiToken = null;
try {
  if (localStorage.apiToken) {
    initialApiToken = JSON.parse(localStorage.apiToken);
    if (!initialApiToken["X-API-Token"] && !initialApiToken["X-Full-Access-Token"]) {
      initialApiToken = null;
    }
  }
} catch (err) {
}

const App = () => {
  const [activeTab, setActiveTab] = useState("add-task");
  const [apiToken, setApiToken] = useState(initialApiToken);
  const [onboarded, setOnboarded] = useState(!!initialApiToken);

  return (
    <div className="flex flex-col w-[400px] min-h-[400px] max-h-[600px] justify-between">
      {!onboarded ? (
        <OnboardingPage setApiToken={setApiToken} setOnboarded={setOnboarded} />
      ) : (
        <>
          {activeTab === "today" && <TaskList apiToken={apiToken} setOnboarded={setOnboarded} />}
          {activeTab === "add-task" && <AddTask setOnboarded={setOnboarded} />}
          <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  );
};

export default App;
