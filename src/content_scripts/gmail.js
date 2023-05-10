import { getStoredGmailSettings } from "../utils/storage";
import { addTask } from "../utils/api";
import { formatDate } from "../utils/dates";

const logo = chrome.runtime.getURL("static/logo.png");

/*
    ***************
    Success Message
    ***************
*/

const marvinSuccessMessage = document.createElement("div");
document.body.appendChild(marvinSuccessMessage);

let marvinSuccessStyles = document.createElement("style");
marvinSuccessStyles.appendChild(
  document.createTextNode(`
    .marvinSuccessMessageVisible {
        display: grid;
        place-items: center;
    }

    .marvinSuccessMessageHidden {
        display: none;
    }

    .marvinSuccessMessage {
        background: linear-gradient(165deg, #26d6c4 0%, #10b1d3 100%);
        box-shadow: 0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a;
        color: white;
        font-size: 18px;
        position: absolute !important;
        bottom: 5%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 350px;
        height: 75px;
        z-index: 999;
        border-radius: 10px;
        text-align: center;
        padding: 10px;
    }`)
);
document.getElementsByTagName("head")[0].appendChild(marvinSuccessStyles);

marvinSuccessMessage.classList.add(
  "marvinSuccessMessage",
  "marvinSuccessMessageHidden"
);

function changeSuccessMessageClasses(successMessage) {
  marvinSuccessMessage.textContent =
    successMessage === "success"
      ? "Task successfully added to Marvin!"
      : "Failed to add Task to Marvin!";
  marvinSuccessMessage.classList.remove("marvinSuccessMessageHidden");
  marvinSuccessMessage.classList.add("marvinSuccessMessageVisible");
  setTimeout(() => {
    marvinSuccessMessage.classList.remove("marvinSuccessMessageVisible");
    marvinSuccessMessage.classList.add("marvinSuccessMessageHidden");
  }, 2000);
}

function getTableRows() {
  return document.querySelectorAll('tr[role="row"]');
}

function getLegacyThreadId(email) {
  const threadIdElements = email.querySelectorAll("[data-legacy-thread-id]");
  return threadIdElements.length > 0
    ? threadIdElements[0].getAttribute("data-legacy-thread-id")
    : null;
}

function getEmailSubject(email) {
  const subjectElement = email.querySelector("[data-legacy-thread-id]");
  return subjectElement?.textContent.trim();
}

function getSenderEmail(email) {
  const emailElement = email.querySelector("[email]");
  return emailElement ? emailElement.getAttribute("email") : null;
}

function getSenderName(email) {
  const nameElement = email.querySelector("[name][email]");
  return nameElement ? nameElement.getAttribute("name") : null;
}

/**
 * Extracts email metadata from a given HTML element.
 *
 * @function getEmailMetadata
 * @param {HTMLElement} email - DOM element whose children contain email metadata.
 * @returns {EmailMetadata} An object containing the email metadata.
 *
 * @typedef {Object} EmailMetadata
 * @property {string} legacyThreadId - Legacy thread ID of the email.
 * @property {string} emailSubject - Email subject.
 * @property {string} senderEmail - Sender's email address.
 * @property {string} senderName - Sender's name.
 */

function getEmailMetadata(email) {
  return {
    legacyThreadId: getLegacyThreadId(email),
    emailSubject: getEmailSubject(email),
    senderEmail: getSenderEmail(email),
    senderName: getSenderName(email),
  };
}

function isNotMarvinButton(element) {
  return !element.classList.contains("marvinButton");
}

function handleMarvinButtonClick(emailData) {
  let emailUrl =
    window.location.href.split("#")[0] + "#inbox/" + emailData.legacyThreadId;
  let data = {
    title: `[${emailData.emailSubject}](${emailUrl})`,
    done: false,
  };
  data.note =
    `:::info\nSender: ${emailData.senderName}\n\nSender’s e-mail address: ${emailData.senderEmail}`.trim();

  if (scheduleForToday) data.day = formatDate(new Date());

  addTask(data).then((message) => {
    if (message === "success") {
      changeSuccessMessageClasses("success");
    } else {
      changeSuccessMessageClasses("fail");
    }
  });
}

function createTableMarvinButton(emailData) {
  let tableMarvinButton = document.createElement("li");
  tableMarvinButton.classList.add("bqX", "marvinButton");
  tableMarvinButton.style.cssText = `background: url(${logo}) no-repeat center center; background-size: 20px; width: 20px; height: 20px; margin-right: 10px; margin-left: 10px; border-radius: 50%`;
  tableMarvinButton.setAttribute("data-tooltip", "Add to Marvin");

  tableMarvinButton.onclick = () => {
    handleMarvinButtonClick(emailData);
  };

  return tableMarvinButton;
}

function createSingleEmailMarvinButton(emailData) {
  let marvinButtonContainer = document.createElement("div");
  marvinButtonContainer.classList.add(
    "T-I",
    "J-J5-Ji",
    "T-I-Js-Gs",
    "T-I-ax7",
    "T-I-Js-IF",
    "marvinButton"
  );
  marvinButtonContainer.setAttribute("data-tooltip", "Add to Marvin");
  marvinButtonContainer.setAttribute("role", "button");
  marvinButtonContainer.setAttribute("tabIndex", "0");
  marvinButtonContainer.setAttribute("aria-haspopup", "false");
  marvinButtonContainer.setAttribute("aria-expanded", "false");
  marvinButtonContainer.setAttribute("aria-label", "Add to Marvin");
  marvinButtonContainer.setAttribute("data-email-id", emailData.legacyThreadId);
  const asaDiv = document.createElement("div");
  asaDiv.classList.add("asa");
  marvinButtonContainer.appendChild(asaDiv);

  marvinButtonContainer.onmouseenter = () => {
    marvinButtonContainer.classList.add("T-I-JW");
  };
  marvinButtonContainer.onmouseleave = () => {
    marvinButtonContainer.classList.remove("T-I-JW");
  };

  marvinButtonContainer.onclick = () => {
    handleMarvinButtonClick(emailData);
  };

  let singleMarvinButton = document.createElement("div");
  singleMarvinButton.style.cssText = `background: url(${logo}) no-repeat center center; background-size: 20px; width: 20px; height: 20px; border-radius: 50%`;
  singleMarvinButton.classList.add("ase", "T-I-J3", "J-J5-Ji");

  asaDiv.appendChild(singleMarvinButton);

  return marvinButtonContainer;
}

function addMarvinButtonToToolbarButtons() {
  const tableRows = getTableRows();

  if (tableRows.length === 0) {
    return;
  }

  tableRows.forEach((tableRow) => {
    // Selects element containing "Archive", "Delete, "Mark as read", "Snooze", etc. buttons.
    const toolbar = tableRow.querySelector('ul[role="toolbar"]');
    const emailData = getEmailMetadata(tableRow);

    let noMarvinButton = [...toolbar.childNodes].every(isNotMarvinButton);

    if (noMarvinButton) {
      toolbar.appendChild(createTableMarvinButton(emailData));
    }
  });

  isDoneDeterminingView = true;
}

/**
 * Checks if a button with a specific emailId exists within a given parent element.
 * @function checkIfButtonExists
 * @param {string} emailId - The Legacy thread ID of the email stored in custom data-email-id data attribute.
 * @param {HTMLElement} element - The parent element where the button should be located.
 * @returns {boolean} True if the button exists, false otherwise.
 */
function checkIfButtonExists(emailId, element) {
  const existingButton = element.querySelector(
    `.marvinButton[data-email-id="${emailId}"]`
  );
  return existingButton !== null;
}

// Adds "Add to Marvin" button to a single email which can be displayed:
// - on its own (https://mail.google.com/mail/u/0/#inbox/RANDOMEMAILIDSTRING)
// - in horizontal or vertical split pane, under or on the right side of the list of emails
function addMarvinButtonToSingleEmail() {
  // Element containing all buttons at the top: Back to Inbox, Archive, Report Spam, ..., More.
  const allButtonsContainers = document.querySelectorAll(".G-tF");
  if (allButtonsContainers.length === 0) {
    return;
  }

  let buttonsContainer;

  // Since it's possible for there to be multiple buttons containers,
  // here we're selecting the one that is visible. The one that is visible
  // will have offsetParent property set to a DOM element.
  // There are some other properties on the element that is visible that are not null:
  // offsetHeight, offsetWidth, offsetLeft, offsetTop, clientHeight and clientWidth.
  allButtonsContainers.forEach((el) => {
    if (el.offsetParent !== null) {
      buttonsContainer = el;
    }
  });

  // Find div element containing "Move to" and "Labels" buttons
  const insertIntoElement = buttonsContainer && buttonsContainer.childNodes[3];
  let noMarvinButton = [...insertIntoElement.childNodes].every(
    isNotMarvinButton
  );

  // When e-mail is displayed in split pane mode, buttonsContainer
  // will be the same as when viewing a single email. So we have to
  // handle the case when an email is displayed in the split pane
  // and there's also a list of emails. In that case we have to
  // get email metadata from the split pane.

  // When using split pane mode (vertical or horizontal split)
  // the email in the pane will be displayed in a table whose
  // parent is a div with a width style attribute.
  let splitPaneEmail = [...document.querySelectorAll("table")].filter((el) => {
    let isDiv = el.parentNode.nodeName === "DIV";
    let hasWidthStyle = el.parentNode.getAttribute("style")?.includes("width");
    return isDiv && hasWidthStyle;
  })[0];

  // If split pane exists, check that "No conversations selected" is not displayed
  // by querying for data-legacy-thread-id attribute
  let splitPaneEmailContainsEmail =
    splitPaneEmail &&
    splitPaneEmail.querySelectorAll("[data-legacy-thread-id]").length > 0;

  // If email is displayed in split pane we have to replace the Marvin button.
  // If we don't, it will contain email metadata for the first email in displayed tab (Primary, Social, Updates, etc.)
  if (splitPaneEmail && splitPaneEmailContainsEmail) {
    const emailData = getEmailMetadata(splitPaneEmail);

    if (!checkIfButtonExists(emailData.legacyThreadId, insertIntoElement)) {
      let marvinButtonForReplacement =
        insertIntoElement.querySelector(".marvinButton");
      const newButton = createSingleEmailMarvinButton(emailData);
      insertIntoElement.replaceChild(newButton, marvinButtonForReplacement);
    }

    isDoneDeterminingView = true;
    return;
  }

  // When only one email is displayed, we don't have to check
  // if the button already exists using data-email-id attribute.
  // It's enough to just check if the button exists.
  if (!noMarvinButton) {
    return;
  }

  // Get emailData and create Marvin button
  const emailData = getEmailMetadata(
    document.querySelector('div[role="main"]')
  );
  const marvinButton = createSingleEmailMarvinButton(emailData);

  // Insert Marvin button into the target element
  insertIntoElement.appendChild(marvinButton);

  isDoneDeterminingView = true;
}

async function handleMutation(mutationsList, observer) {
  const childListMutations = mutationsList.filter(
    (mutation) => mutation.type === "childList"
  );
  for (const mutation of mutationsList) {
    // Monitor for changes made to the div we're observing (div with role set to main).
    // For example, when the user opens an email, Gmail will keep this element
    // in the DOM, but will remove role="main" from it and create a new div
    // with role="main".
    if (
      mutation.target === mainDivElement &&
      mutation.type === "attributes" &&
      mutation.attributeName === "role"
    ) {
      const role = mainDivElement.getAttribute("role");
      if (role !== "main") {
        // Remove the observer from the currently monitored div element
        observer.disconnect();

        // Re-add buttons to handle the case when single email view is displayed.
        // When we open an email from table view, we need to display Marvin button.
        // Just setting an observer won't work as it's possible no mutations will be
        // made resulting in the Marvin button not getting added.
        determineViewAndAddButtons(displayInInbox, displayInSingleEmail);

        // Find the new div with role="main" and start observing it
        mainDivElement = document.querySelector('div[role="main"]');
        const observerConfig = {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["role"],
        };
        observer.observe(mainDivElement, observerConfig);

        break;
      }
    }

    // Try to re-render buttons only for the last child list mutation.
    if (
      mutation.type === "childList" &&
      mutation === childListMutations[childListMutations.length - 1]
    ) {
      determineViewAndAddButtons(displayInInbox, displayInSingleEmail);
    }
  }
}

/**
 * Determines the current email view (single email or list of emails)
 * and adds the Marvin button(s) to the appropriate location(s).
 * @function determineViewAndAddButtons
 * @param {boolean} displayInInbox - Indicates whether the Marvin button should be added to the emails in the list.
 * @param {boolean} displayInSingleEmail - Indicates whether the Marvin button should be added to the single email.
 */
function determineViewAndAddButtons(displayInInbox, displayInSingleEmail) {
  // Initially I was scanning for divs with role="tabpanel" but it turns out that
  // there are cases when those are not displayed. Instead, div with role="grid"
  // is displayed everywhere, including lists like Starred, Snoozed, etc.
  let emailGrid = document.querySelectorAll('table[role="grid"]');
  // Select back to (Inbox) list button
  let backToListButton;
  let allBackToListButtons = document.querySelectorAll('div[act="19"]');
  if (allBackToListButtons.length > 0) {
    // Select the last button in the list since it's the one that is visible
    backToListButton = allBackToListButtons[allBackToListButtons.length - 1];
  }

  // Single email is displayed - either on its own or in split pane
  if (backToListButton !== null && displayInSingleEmail) {
    addMarvinButtonToSingleEmail();
  }
  // List of emails is displayed
  if (emailGrid.length > 0 && getTableRows().length > 0 && displayInInbox) {
    addMarvinButtonToToolbarButtons();
  }
}

let mainDivElement;
let scheduleForToday = false;
let displayInInbox = false;
let displayInSingleEmail = false;
let isDoneDeterminingView = false;

async function init() {
  let gmailSettings = await getStoredGmailSettings();
  displayInInbox = gmailSettings.displayInInbox;
  displayInSingleEmail = gmailSettings.displayInSingleEmail;
  scheduleForToday = gmailSettings.scheduleForToday;

  if (!displayInInbox && !displayInSingleEmail) {
    clearInterval(loopInterval);
    return;
  }

  // Selects panels (email container lists, for example Primary, Social, Promotions, etc. )
  // or the element containing a single email
  mainDivElement = document.querySelector('div[role="main"]');

  determineViewAndAddButtons(displayInInbox, displayInSingleEmail);

  if (mainDivElement && isDoneDeterminingView) {
    const observer = new MutationObserver(handleMutation);
    const observerConfig = {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["role"],
    };
    observer.observe(mainDivElement, observerConfig);

    // Stop the loopInterval as the mutation observer is now handling the changes
    clearInterval(loopInterval);
  }
}

const loopInterval = setInterval(init, 1000);
