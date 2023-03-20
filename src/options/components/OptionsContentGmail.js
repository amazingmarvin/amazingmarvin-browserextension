import { useEffect, useState } from "react";

import {
  getStoredGmailSettings,
  setStoredGmailSettings,
} from "../../utils/storage";

const OptionsContentGmail = () => {
  let singleEmailImage = chrome.runtime.getURL("static/singleemail.png");
  let inboxListImage = chrome.runtime.getURL("static/inboxlist.png");

  const [scheduleForToday, setScheduleForToday] = useState(true);
  const [displayInInbox, setDisplayInInbox] = useState(true);
  const [displayInSingleEmail, setDisplayInSingleEmail] = useState(true);

  useEffect(() => {
    getStoredGmailSettings().then((settings) => {
      setScheduleForToday(settings.scheduleForToday);
      setDisplayInInbox(settings.displayInInbox);
      setDisplayInSingleEmail(settings.displayInSingleEmail);
    });
  }, []);

  const handleScheduleForTodayChange = () => {
    setStoredGmailSettings({
      scheduleForToday: !scheduleForToday,
      displayInInbox,
      displayInSingleEmail,
    });
    setScheduleForToday(!scheduleForToday);
  };

  const handleDisplayInInboxChange = () => {
    setStoredGmailSettings({
      scheduleForToday,
      displayInInbox: !displayInInbox,
      displayInSingleEmail,
    });
    setDisplayInInbox(!displayInInbox);
  };

  const handleDisplayInSingleEmailChange = () => {
    setStoredGmailSettings({
      scheduleForToday,
      displayInInbox,
      displayInSingleEmail: !displayInSingleEmail,
    });
    setDisplayInSingleEmail(!displayInSingleEmail);
  };

  return (
    <>
      <div className="rounded-lg bg-white shadow-lg text-sm">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Automatically schedule for Today</h3>
          <div className="flex flex-row items-center justify-between w-full mt-3 mb-3">
            <p>
              With this setting enabled, emails sent to Marvin as tasks will
              also get scheduled for today.
            </p>
            <label className="relative inline-flex cursor-pointer ml-8">
              <input
                type="checkbox"
                checked={scheduleForToday}
                onChange={handleScheduleForTodayChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-offset-2 peer-focus:ring-[#1CC5CB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1CC5CB]"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-lg text-sm mt-8">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Display Marvin button in Inbox</h3>
          <div className="flex flex-row items-center justify-between w-full mt-3 mb-3">
            <p>
              Display the Marvin button when hovering over emails in Inbox and
              other lists (e.g. Starred, Important, etc.).
            </p>
            <label className="relative inline-flex cursor-pointer ml-8">
              <input
                type="checkbox"
                checked={displayInInbox}
                onChange={handleDisplayInInboxChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-offset-2 peer-focus:ring-[#1CC5CB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1CC5CB]"></div>
            </label>
          </div>
          <img
            className="h-auto max-w-full rounded-lg mx-auto mt-6 px-8"
            src={inboxListImage}
            alt="image description"
          />
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-lg text-sm mt-8 mb-8">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">
            Display Marvin button in single email view
          </h3>
          <div className="flex flex-row items-center justify-between w-full mt-3 mb-3">
            <p>
              Display the Marvin button at the top when viewing a single email.
            </p>
            <label className="relative inline-flex cursor-pointer ml-8">
              <input
                type="checkbox"
                checked={displayInSingleEmail}
                onChange={handleDisplayInSingleEmailChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-offset-2 peer-focus:ring-[#1CC5CB] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1CC5CB]"></div>
            </label>
          </div>

          <img
            className="h-auto max-w-full rounded-lg mx-auto mt-6 px-8"
            src={singleEmailImage}
            alt="image description"
          />
        </div>
      </div>
    </>
  );
};

export default OptionsContentGmail;
