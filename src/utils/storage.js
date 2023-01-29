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
