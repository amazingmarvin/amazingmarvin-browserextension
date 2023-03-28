export function getStoredToken() {
  if (localStorage.apiToken) {
    return Promise.resolve(JSON.parse(localStorage.apiToken));
  }

  return new Promise((resolve) => {
    chrome.storage.local.get(["apiToken"]).then((result) => {
      resolve(result.apiToken);
    });
  });
}

export function setStoredToken(apiToken) {
  // Save to localStorage so that the Onboarding doesn't flash while the
  // apiToken is being loaded.
  if (apiToken) {
    localStorage.apiToken = JSON.stringify(apiToken);
  } else {
    delete localStorage.apiToken;
  }

  // Continue to save to chrome.storage.local so that background script can
  // access it.
  return new Promise((resolve) => {
    chrome.storage.local.set({ apiToken }).then(() => {
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
