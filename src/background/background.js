import { addTask } from "../utils/api";
import {
  setStoredLabels,
  setStoredCategories,
  getStoredToken,
} from "../utils/storage";
import { getLabels, getCategories } from "../utils/api";

chrome.runtime.onInstalled.addListener(() => {
  setStoredLabels([]);
  setStoredCategories([]);

  chrome.alarms.create({
    periodInMinutes: 30,
  });
});

chrome.alarms.onAlarm.addListener(async () => {
  console.log("in alarm");

  let token = await getStoredToken().then((token) => token);
  if (!token) {
    return;
  }

  await getLabels();
  setTimeout(() => {
    getCategories();
  }, 1000);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let data = {
    done: false,
  };

  // Ovde ucitati opcije iz storage-a

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
