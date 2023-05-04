import { useState, useEffect, useCallback } from "react";

import {
  getStoredBadgeSettings,
  setStoredBadgeSettings,
} from "../../utils/storage";

import MarvinButton from "../../components/MarvinButton";

const OptionsContentBadge = () => {
  const [badgeSettings, setBadgeSettings] = useState({});
  const [badgeColor, setBadgeColor] = useState("#1CC5CB");

  useEffect(() => {
    if (Object.keys(badgeSettings).length === 0) {
      getStoredBadgeSettings().then((settings) => {
        setBadgeSettings(settings);
        setBadgeColor(settings.backgroundColor);
      });

      return;
    }

    setStoredBadgeSettings(badgeSettings).then(() => {
      chrome.runtime.sendMessage({
        message: "toggleBadge",
      });
    });
  }, [badgeSettings]);

  const handleBadgeSetting = (setting, value) => {
    console.log("handle badge setting", setting, value);
    setBadgeSettings((prev) => {
      return {
        ...prev,
        [setting]: value,
      };
    });
  };

  const updateBadgeColor = useCallback(() => {
    handleBadgeSetting("backgroundColor", badgeColor);
  }, [badgeColor]);

  const resetBadgeColor = useCallback(() => {
    setBadgeColor("#1CC5CB");
    handleBadgeSetting("backgroundColor", "#1CC5CB");
  }, []);

  return (
    <>
      <div className="rounded-lg bg-white shadow-lg text-sm">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Display Badge</h3>
          <div className="flex flex-row items-center justify-between w-full mt-3 mb-3">
            <p>
              When this setting is enabled, the badge will be displayed on the
              extension icon and show the number of tasks scheduled for
              today.
            </p>
            <label className="relative inline-flex cursor-pointer ml-8">
              <input
                type="checkbox"
                checked={badgeSettings?.displayBadge || false}
                onChange={() =>
                  handleBadgeSetting(
                    "displayBadge",
                    !badgeSettings.displayBadge
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-offset-2 peer-focus:ring-[#1CC5CB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1CC5CB]"></div>
            </label>
          </div>
          {badgeSettings.displayBadge && (
            <div className="mt-3">
              <label className="font-bold mb-3" htmlFor="badgeColor">
                Badge background color
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-12 lg:grid-rows-none items-center w-full mt-3 mb-3 gap-1">
                <p className="lg:col-span-5">
                  Here you can change the background color of the badge.
                </p>
                <div className="w-8 h-8 overflow-hidden rounded-full justify-self-center">
                  <input
                    type="color"
                    id="badgeColor"
                    value={badgeColor}
                    onChange={(e) => {
                      setBadgeColor(e.target.value);
                    }}
                    className="w-full h-full bg-white bg-no-repeat bg-padding-box shadow-md transform scale-150 hover:cursor-pointer"
                  />
                </div>
                <div className="lg:col-span-3 flex justify-center">
                  <MarvinButton onClick={updateBadgeColor}>
                    Update color
                  </MarvinButton>
                </div>
                <div className="lg:col-span-3 flex justify-center">
                  <MarvinButton onClick={resetBadgeColor}>
                    Reset color
                  </MarvinButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OptionsContentBadge;
