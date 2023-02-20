export function setBadge(numberOfTasks) {
  chrome.action.setBadgeBackgroundColor({ color: "#1CC5CB" });

  chrome.action.setBadgeTextColor({ color: "#FFF" });

  chrome.action.setBadgeText({ text: `${numberOfTasks}` });
}
