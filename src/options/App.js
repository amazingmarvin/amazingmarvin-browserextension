import { useState } from "react";
import OptionsSidebar from "../components/OptionsSidebar";
import OptionsContent from "../components/OptionsContent";

const App = () => {
  const [selectedSetting, setSelectedSetting] = useState("api");

  const settings = [
    { name: "interactions", text: "Interactions" },
    { name: "api", text: "API Token" },
    { name: "sync", text: "Sync" },
  ];

  return (
    <div className="my-0 mx-auto h-screen w-3/5 pt-12">
      <h1 className="text-2xl text-center text-primary">Settings</h1>
      <div className="mt-12 grid grid-cols-4">
        <OptionsSidebar
          settings={settings}
          selectedSetting={selectedSetting}
          setSelectedSetting={setSelectedSetting}
        />
        <div className="col-span-3 px-6">
          <OptionsContent selectedSetting={selectedSetting} />
        </div>
      </div>
    </div>
  );
};
export default App;
