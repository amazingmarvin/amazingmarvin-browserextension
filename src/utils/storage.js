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
    let dateString = date.toDateString();
    let timeString = date.toTimeString();
    let syncedTime = `${dateString} - ${timeString}`;
    chrome.storage.local.set({ lastSyncedCategories: syncedTime }).then(() => {
      resolve();
    });
  });
}
