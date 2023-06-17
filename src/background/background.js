import { addTask, getTasks } from "../utils/api";
import {
  getStoredToken,
  getStoredLabels,
  setStoredLabels,
  setStoredCategories,
  getStoredCategories,
  setStoredGmailSettings,
  setStoredBadgeSettings,
  getStoredGmailSettings,
  getStoredGeneralSettings,
  setStoredGeneralSettings,
  getStoredBadgeSettings,
} from "../utils/storage";
import { getLabels, getCategories } from "../utils/api";
import { formatDate } from "../utils/dates";
import { clearBadge, setBadge } from "../utils/badge";

console.log("background.js running");

const addTaskAndSetMessage = (data) => {
  addTask(data).then((message) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        message,
      });
    });
  });
};

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
        scheduleForToday: false,
        displayInInbox: true,
        displayInSingleEmail: true,
      });
    }
  });
  getStoredGeneralSettings().then((generalSettings) => {
    if (!generalSettings) {
      setStoredGeneralSettings({
        autoPopulateTaskTitle: false,
        autoPopulateTaskNote: false,
        displayTaskNoteInput: true,
        displayScheduleDatePicker: true,
        displayDueDatePicker: true,
        displayTimeEstimateButtons: true,
        displaySetParentPicker: true,
        displaySetLabelsPicker: true,
      });
    }
  });
  getStoredBadgeSettings().then((badgeSettings) => {
    if (!badgeSettings) {
      setStoredBadgeSettings({
        displayBadge: true,
        backgroundColor: "#1CC5CB",
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

  chrome.alarms.create({
    periodInMinutes: 60,
  });

  chrome.alarms.create("updateBadge", { periodInMinutes: 10 });
});

chrome.contextMenus.onClicked.addListener((event) => {
  console.log("adding a task from context menu");
  getTabTitleAsHyperlink().then((title) => {
    if (event.menuItemId === "addTaskToday") {
      let data = {
        done: false,
        day: formatDate(new Date()),
        title: title,
        note: `${event.selectionText}`,
      };

      console.log("scheduled", data);
      addTaskAndSetMessage(data);
    }

    if (event.menuItemId === "addTaskUnscheduled") {
      let data = {
        done: false,
        title: title,
        note: `${event.selectionText}`,
      };

      console.log("unscheduled", data);
      addTaskAndSetMessage(data);
    }
  });
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  const token = await getStoredToken();
  if (!token) {
    return;
  }

  if (alarm.name === "updateBadge") {
    const badgeSettings = await getStoredBadgeSettings();

    if (!badgeSettings?.displayBadge) {
      return;
    }

    const { ok, status, tasks } = await getTasks(token, new Date());
    if (ok) {
      setBadge(tasks.length);
    } else {
      clearBadge();
    }

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
  let token = await getStoredToken();
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
      let emailUrl = url.split("#")[0] + "#inbox/" + request.emailLink;
      data.title = `[${request.emailSubject}](${emailUrl})`;
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

  if (request.message === "toggleBadge") {
    const badgeSettings = await getStoredBadgeSettings();

    if (!badgeSettings?.displayBadge || !token) {
      clearBadge();
      return;
    }

    const { ok, status, tasks } = await getTasks(token, new Date());
    if (ok) {
      setBadge(tasks.length);
    } else {
      clearBadge();
    }
  }
});
