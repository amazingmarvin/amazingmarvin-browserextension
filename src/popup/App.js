import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import BottomMenu from "../components/BottomMenu";
import OnboardingPage from "../components/OnboardingPage";
import AddTask from "../components/AddTask";
import { getStoredToken } from "../utils/storage";

const App = () => {
  const [activeTab, setActiveTab] = useState("add-task");
  const [onboarded, setOnboarded] = useState(false);
  const [apiToken, setApiToken] = useState(null);

  useEffect(() => {
    getStoredToken().then((token) => {
      if (token) {
        setOnboarded(true);
        setApiToken(token);
      }
    });
  }, [onboarded]);

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
