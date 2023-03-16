// receive message from content script
import { addTask } from "../utils/api";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let data = {
    done: false,
  };

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
      addTask(data);
    });
  }

  if (request.message === "sendTaskFromSingleView") {
    console.log("trying to create a task");
    getTabUrl().then((url) => {
      data.title = `[${request.emailSubject}](${url})`;
      addTask(data);
    });
  }
});
