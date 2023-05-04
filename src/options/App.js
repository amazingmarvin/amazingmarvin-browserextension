import { useState } from "react";

import OptionsSidebar from "./components/OptionsSidebar";
import OptionsContent from "./components/OptionsContent";

const App = () => {
  const [selectedSetting, setSelectedSetting] = useState("general");

  const settings = [
    { name: "general", text: "General" },
    { name: "badge", text: "Badge" },
    { name: "api", text: "API Token" },
    { name: "sync", text: "Sync" },
    { name: "gmail", text: "Gmail Addon" },
  ];

  return (
    <div className="my-0 mx-auto w-3/5 pt-12">
      <h1 className="mb-4 text-2xl text-center font-bold text-gray-900">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#26d6c4] to-[#10b1d3]">
          Settings
        </span>
      </h1>
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
