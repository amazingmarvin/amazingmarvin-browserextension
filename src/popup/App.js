import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import BottomMenu from "../components/BottomMenu";
import OnboardingPage from "../components/OnboardingPage";
import { getStoredToken } from "../utils/storage";

const App = () => {
  const [activeTab, setActiveTab] = useState("add-task");
  const [onboarded, setOnboarded] = useState(false);
  const [apiToken, setApiToken] = useState(null);

  useEffect(() => {
    getStoredToken().then((token) => {
      console.log("token from storage", token);
      if (token) {
        setOnboarded(true);
        setApiToken(token);
      }
    });
  }, [onboarded]);

  return (
    <div className="flex flex-col w-[400px] h-[400px]">
      {!onboarded ? (
        <OnboardingPage setApiToken={setApiToken} setOnboarded={setOnboarded} />
      ) : (
        <>
          {activeTab === "today" && <TaskList />}
          {activeTab === "add-task" && <div>creating task</div>}
          <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  );
};

export default App;
