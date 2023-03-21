import { addTask } from "../utils/api";
import {
  getStoredToken,
  getStoredLabels,
  setStoredLabels,
  setStoredCategories,
  getStoredCategories,
  setStoredGmailSettings,
  getStoredGmailSettings,
  getStoredGeneralSettings,
  setStoredGeneralSettings,
} from "../utils/storage";
import { getLabels, getCategories } from "../utils/api";
import { formatDate } from "../utils/dates";

console.log("background.js running");

const getTabTitleAsHyperlink = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let tab = tabs[0];
      resolve(`[${tab.title}](${tab.url})`);
    });
  });
};

chrome.runtime.onInstalled.addListener(() => {
  getStoredLabels().then((labels) => {
    if (!labels) {
      setStoredLabels([]);
    }
  });
  getStoredCategories().then((categories) => {
    if (!categories) {
      setStoredCategories([]);
    }
  });
  getStoredGmailSettings().then((gmailSettings) => {
    if (!gmailSettings) {
      setStoredGmailSettings({
        scheduleForToday: true,
        displayInInbox: true,
        displayInSingleEmail: true,
      });
    }
  });
  getStoredGeneralSettings().then((generalSettings) => {
    if (!generalSettings) {
      setStoredGeneralSettings({
        displayTaskNoteInput: true,
        displayScheduleDatePicker: true,
        displayDueDatePicker: true,
        displayTimeEstimateButtons: true,
        displaySetParentPicker: true,
        displaySetLabelsPicker: true,
      });
    }
  });

  chrome.contextMenus.create({
    id: "addTask",
    title: "Add task to Marvin",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "addTaskToday",
    title: "Add task for today",
    contexts: ["selection"],
    parentId: "addTask",
  });
  chrome.contextMenus.create({
    id: "addTaskUnscheduled",
    title: "Add unscheduled task",
    contexts: ["selection"],
    parentId: "addTask",
  });

  chrome.contextMenus.onClicked.addListener((event) => {
    getTabTitleAsHyperlink().then((title) => {
      console.log(title);
      if (event.menuItemId === "addTaskToday") {
        let data = {
          done: false,
          day: formatDate(new Date()),
          title: title,
          note: `${event.selectionText}`,
        };

        console.log(data);

        addTask(data);
      }

      if (event.menuItemId === "addTaskUnscheduled") {
        let data = {
          done: false,
          title: title,
          note: `${event.selectionText}`,
        };

        addTask(data);
      }
    });
  });

  chrome.alarms.create({
    periodInMinutes: 30,
  });
});

chrome.alarms.onAlarm.addListener(async () => {
  let token = await getStoredToken().then((token) => token);
  if (!token) {
    return;
  }

  await getLabels();
  setTimeout(() => {
    getCategories();
  }, 1000);
});

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  let data = {
    done: false,
  };

  let scheduleForToday = await getStoredGmailSettings().then(
    (gmailSettings) => gmailSettings.scheduleForToday
  );

  if (scheduleForToday) data.day = formatDate(new Date());

  const getTabUrl = () => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        let url = tabs[0].url;
        resolve(url);
      });
    });
  };

  if (request.message === "sendTaskFromTable") {
    getTabUrl().then((url) => {
      data.title = `[${request.emailSubject}](${url}/${request.emailLink})`;
      addTask(data).then((message) => {
        if (message === "success") {
          Promise.resolve();
        }
      });
    });
  }

  if (request.message === "sendTaskFromSingleView") {
    getTabUrl().then((url) => {
      data.title = `[${request.emailSubject}](${url})`;
      addTask(data).then((message) => {
        if (message === "success") {
          Promise.resolve();
        }
      });
    });
  }
});
