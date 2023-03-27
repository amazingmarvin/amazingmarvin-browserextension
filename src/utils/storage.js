export function getStoredToken() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["apiToken"]).then((result) => {
      resolve(result.apiToken);
    });
  });
}

export function setStoredToken(token) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ apiToken: token }).then(() => {
      resolve();
    });
  });
}

export function getStoredCategories() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["categories"]).then((result) => {
      resolve([{ _id: "unassigned", title: "Inbox" }, ...(result.categories || [])]);
    });
  });
}

export function setStoredCategories(categories) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ categories: categories }).then(() => {
      resolve();
    });
  });
}

export function getLastSyncedCategories() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["lastSyncedCategories"]).then((result) => {
      resolve(result.lastSyncedCategories);
    });
  });
}
export function setLastSyncedCategories(date = new Date()) {
  return new Promise((resolve) => {
    let syncedTime = `${date.toDateString()} - ${date.toTimeString()}`;
    chrome.storage.local.set({ lastSyncedCategories: syncedTime }).then(() => {
      resolve();
    });
  });
}

export function getStoredLabels() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["labels"]).then((result) => {
      resolve(result.labels);
    });
  });
}

export function setStoredLabels(labels) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ labels: labels }).then(() => {
      resolve();
    });
  });
}

export function getLastSyncedLabels() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["lastSyncedLabels"]).then((result) => {
      resolve(result.lastSyncedLabels);
    });
  });
}
export function setLastSyncedLabels(date = new Date()) {
  return new Promise((resolve) => {
    let syncedTime = `${date.toDateString()} - ${date.toTimeString()}`;
    chrome.storage.local.set({ lastSyncedLabels: syncedTime }).then(() => {
      resolve();
    });
  });
}

export function getStoredGmailSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["gmailSettings"]).then((result) => {
      resolve(result.gmailSettings);
    });
  });
}

export function setStoredGmailSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ gmailSettings: settings }).then(() => {
      resolve();
    });
  });
}

export function getStoredGeneralSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["generalSettings"]).then((result) => {
      resolve(result.generalSettings);
    });
  });
}

export function setStoredGeneralSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ generalSettings: settings }).then(() => {
      resolve();
    });
  });
}
