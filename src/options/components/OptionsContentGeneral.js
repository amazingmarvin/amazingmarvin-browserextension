import { useState, useEffect, useCallback } from "react";

import {
  getStoredGeneralSettings,
  setStoredGeneralSettings,
  getStoredCustomSections,
} from "../../utils/storage";

import { getCustomSections, getDefaultCustomSection } from "../../utils/api";

const OptionsContentGeneral = () => {
  const [displaySettings, setDisplaySettings] = useState({});
  const [groupByExpanded, setGroupByExpanded] = useState(false);
  const groupByMethods = [
    { none: "None" },
    { dailySection: "Break the Day Down (Morning/Afternoon/Evening)" },
    { bonusSection: "Just the Essentials (Essential/Bonus)" },
    { customSection: "Custom Sections" },
  ];

  useEffect(() => {
    if (Object.keys(displaySettings).length === 0) {
      getStoredGeneralSettings().then((settings) => {
        setDisplaySettings(settings);
      });

      return;
    }

    setStoredGeneralSettings(displaySettings);
  }, [displaySettings]);

  const handleDisplaySetting = (setting, value) => {
    setDisplaySettings((prev) => {
      return {
        ...prev,
        [setting]: value,
      };
    });
  };

  const fetchCustomSections = useCallback(async () => {
    await getCustomSections();
    setTimeout(() => {
      getDefaultCustomSection();
    }, 1000);
  }, []);

  const dropdownText = () => {
    if (Object.keys(displaySettings).length === 0) {
      return "None";
    }

    const groupByMethod = displaySettings.groupByMethod || "none";

    if (groupByMethod === "none") {
      return "Group by";
    }

    const groupByMethodObj = groupByMethods.find(
      (method) => Object.keys(method)[0] === groupByMethod
    );

    return Object.values(groupByMethodObj)[0];
  };

  return (
    <>
      <div className="rounded-lg bg-white shadow-lg text-sm">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Auto-populate Task Title Input</h3>
          <div className="flex flex-row items-center justify-between w-full mt-3 mb-3">
            <p>
              When this setting is enabled, the task title will default to the
              title of the current page.
            </p>
            <label className="relative inline-flex cursor-pointer ml-8">
              <input
                type="checkbox"
                checked={displaySettings?.autoPopulateTaskTitle || false}
                onChange={() =>
                  handleDisplaySetting(
                    "autoPopulateTaskTitle",
                    !displaySettings.autoPopulateTaskTitle
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-offset-2 peer-focus:ring-[#1CC5CB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1CC5CB]"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-lg text-sm mt-8">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Auto-populate Task Note Input</h3>
          <div className="flex flex-row items-center justify-between w-full mt-3 mb-3">
            <p>
              When this setting is enabled, the task note will default to select
              text on the current page.
            </p>
            <label className="relative inline-flex cursor-pointer ml-8">
              <input
                type="checkbox"
                checked={displaySettings?.autoPopulateTaskNote || false}
                onChange={() =>
                  handleDisplaySetting(
                    "autoPopulateTaskNote",
                    !displaySettings.autoPopulateTaskNote
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-offset-2 peer-focus:ring-[#1CC5CB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1CC5CB]"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-lg text-sm mt-8 mb-8">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Group Today list</h3>
          <div className="flex flex-row items-center justify-between gap-2 w-full mt-3 mb-3">
            <p className="self-start basis-3/5">
              Break your daily todo list into sections. Using the dropdown menu,
              choose which method you would like to use to group your tasks.
            </p>
            <div className="self-start basis-2/5 pl-5">
              <button
                className="text-white relative w-full bg-[#1CC5CB] hover:bg-[#19B1B6] focus:ring-2 focus:outline-none focus:ring-[#1CC5CB] focus:ring-offset-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
                onClick={() => setGroupByExpanded(!groupByExpanded)}
              >
                {dropdownText()}
                <svg
                  className="w-2.5 h-2.5 absolute right-3 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown"
                className={`${
                  groupByExpanded ? "block" : "hidden"
                } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {groupByMethods.map((method, index) => {
                    const keyName = Object.keys(method)[0];
                    const value = method[keyName];

                    return (
                      <li key={keyName}>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => {
                            handleDisplaySetting("groupByMethod", keyName);
                            setGroupByExpanded(false);

                            if (keyName === "customSection") {
                              getStoredCustomSections().then((sections) => {
                                if (sections.length === 0) {
                                  fetchCustomSections();
                                }
                              });
                            }
                          }}
                        >
                          {value}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {displaySettings.groupByMethod === "customSection" &&
                !groupByExpanded && (
                  <div className="text-xs text-center">
                    <button
                      className="mt-2 text-primary"
                      onClick={fetchCustomSections}
                    >
                      Update Custom Sections
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-lg text-sm mt-8">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Display Task Note input</h3>
          <div className="flex flex-row items-center justify-between w-full mt-3 mb-3">
            <p>
              When this setting is disabled, the task note input will be hidden.
            </p>
            <label className="relative inline-flex cursor-pointer ml-8">
              <input
                type="checkbox"
                checked={displaySettings?.displayTaskNoteInput || false}
                onChange={() =>
                  handleDisplaySetting(
                    "displayTaskNoteInput",
                    !displaySettings.displayTaskNoteInput
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-offset-2 peer-focus:ring-[#1CC5CB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1CC5CB]"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-lg text-sm mt-8">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Display Schedule Date picker</h3>
          <div className="flex flex-row items-center justify-between w-full mt-3 mb-3">
            <p>
              When this setting is disabled, the schedule date picker will be
              hidden and tasks will be added as unscheduled tasks.
            </p>
            <label className="relative inline-flex cursor-pointer ml-8">
              <input
                type="checkbox"
                checked={displaySettings?.displayScheduleDatePicker || false}
                onChange={() =>
                  handleDisplaySetting(
                    "displayScheduleDatePicker",
                    !displaySettings.displayScheduleDatePicker
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-offset-2 peer-focus:ring-[#1CC5CB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1CC5CB]"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-lg text-sm mt-8">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Display Due Date picker</h3>
          <div className="flex flex-row items-center justify-between w-full mt-3 mb-3">
            <p>
              When this setting is disabled, the due date picker will be hidden
              and tasks will be added without a due date.
            </p>
            <label className="relative inline-flex cursor-pointer ml-8">
              <input
                type="checkbox"
                checked={displaySettings?.displayDueDatePicker || false}
                onChange={() =>
                  handleDisplaySetting(
                    "displayDueDatePicker",
                    !displaySettings.displayDueDatePicker
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-offset-2 peer-focus:ring-[#1CC5CB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1CC5CB]"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-lg text-sm mt-8">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Display Time Estimate buttons</h3>
          <div className="flex flex-row items-center justify-between w-full mt-3 mb-3">
            <p>
              When this setting is disabled, the time estimate buttons will be
              hidden and tasks will be added without a time estimate.
            </p>
            <label className="relative inline-flex cursor-pointer ml-8">
              <input
                type="checkbox"
                checked={displaySettings?.displayTimeEstimateButtons || false}
                onChange={() =>
                  handleDisplaySetting(
                    "displayTimeEstimateButtons",
                    !displaySettings.displayTimeEstimateButtons
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-offset-2 peer-focus:ring-[#1CC5CB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1CC5CB]"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-lg text-sm mt-8">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Display Set Parent picker</h3>
          <div className="flex flex-row items-center justify-between w-full mt-3 mb-3">
            <p>
              When this setting is disabled, the set parent picker will be
              hidden and tasks will be added to Inbox.
            </p>
            <label className="relative inline-flex cursor-pointer ml-8">
              <input
                type="checkbox"
                checked={displaySettings?.displaySetParentPicker || false}
                onChange={() =>
                  handleDisplaySetting(
                    "displaySetParentPicker",
                    !displaySettings.displaySetParentPicker
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-offset-2 peer-focus:ring-[#1CC5CB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1CC5CB]"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-lg text-sm mt-8 mb-8">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Display Set Labels picker</h3>
          <div className="flex flex-row items-center justify-between w-full mt-3 mb-3">
            <p>
              When this setting is disabled, the set labels picker will be
              hidden and tasks will be added without any labels.
            </p>
            <label className="relative inline-flex cursor-pointer ml-8">
              <input
                type="checkbox"
                checked={displaySettings?.displaySetLabelsPicker || false}
                onChange={() =>
                  handleDisplaySetting(
                    "displaySetLabelsPicker",
                    !displaySettings.displaySetLabelsPicker
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-offset-2 peer-focus:ring-[#1CC5CB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1CC5CB]"></div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionsContentGeneral;
