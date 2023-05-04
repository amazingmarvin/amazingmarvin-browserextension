import { getStoredBadgeSettings } from "./storage";

export function clearBadge() {
  chrome.action.setBadgeText({ text: "" });
}

export async function setBadge(numberOfTasks) {
  const badgeSettings = await getStoredBadgeSettings();

  // Get the backgroundColor from badgeSettings, or use the default value
  const backgroundColor = badgeSettings.backgroundColor ?? "#1CC5CB";

  chrome.action.setBadgeBackgroundColor({ color: backgroundColor });
  chrome.action.setBadgeTextColor({ color: "#FFF" });
  chrome.action.setBadgeText({ text: `${numberOfTasks}` });
}
