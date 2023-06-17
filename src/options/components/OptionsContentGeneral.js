import { useState, useEffect } from "react";
import {
  getStoredGeneralSettings,
  setStoredGeneralSettings,
} from "../../utils/storage";

const OptionsContentGeneral = () => {
  const [displaySettings, setDisplaySettings] = useState({});

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
