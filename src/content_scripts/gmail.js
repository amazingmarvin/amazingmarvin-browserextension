import { getStoredGmailSettings } from "../utils/storage";

getStoredGmailSettings().then((settings) => {
  let isDisplayedInInbox = settings.displayInInbox;
  let isDisplayedInSingleEmail = settings.displayInSingleEmail;

  let logo = chrome.runtime.getURL("static/logo.png");

  let tables;
  let emailElement;

  function changeClasses() {
    marvinSuccessMessage.classList.remove("marvinSuccessMessageHidden");
    marvinSuccessMessage.classList.add("marvinSuccessMessageVisible");
    setTimeout(() => {
      marvinSuccessMessage.classList.remove("marvinSuccessMessageVisible");
      marvinSuccessMessage.classList.add("marvinSuccessMessageHidden");
    }, 2000);
  }

  // Marvin button for Table view

  let tableMarvinButton = document.createElement("li");
  tableMarvinButton.classList.add("bqX");
  tableMarvinButton.style.cssText = `background: url(${logo}) no-repeat center center; background-size: 20px; width: 20px; height: 20px; margin-right: 10px; margin-left: 10px; border-radius: 50%`;
  tableMarvinButton.setAttribute("data-tooltip", "Add to Marvin");
  tableMarvinButton.onclick = () => {
    let emailSubject =
      emailElement.childNodes[5].childNodes[0].childNodes[0].childNodes[0]
        .childNodes[0].childNodes[0].innerText;
    let emailLink =
      emailElement.childNodes[5].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].getAttribute(
        "data-legacy-last-message-id"
      );

    let message = chrome.runtime.sendMessage({
      message: "sendTaskFromTable",
      emailSubject: emailSubject.trim(),
      emailLink,
    });

    message.then(() => {
      changeClasses();
    });
  };

  // Marvin buttons for Single Email view

  let singleEmail;
  const generateTitle = (titleElement) => {
    let title = [];
    titleElement.forEach((el) => {
      if (el.textContent !== "") title.push(el.textContent.trim());
    });
    return title.join(" ");
  };

  let marvinButtonContainer = document.createElement("div");
  marvinButtonContainer.classList.add(
    "T-I",
    "J-J5-Ji",
    "T-I-Js-Gs",
    "T-I-ax7",
    "T-I-Js-IF"
  );
  marvinButtonContainer.innerHTML = '<div class="asa"></div>';
  marvinButtonContainer.setAttribute("data-tooltip", "Add to Marvin");
  marvinButtonContainer.setAttribute("role", "button");
  marvinButtonContainer.setAttribute("tabIndex", "0");
  marvinButtonContainer.setAttribute("aria-haspopup", "false");
  marvinButtonContainer.setAttribute("aria-expanded", "false");
  marvinButtonContainer.setAttribute("aria-label", "Add to Marvin");

  marvinButtonContainer.onmouseenter = () => {
    marvinButtonContainer.classList.add("T-I-JW");
  };
  marvinButtonContainer.onmouseleave = () => {
    marvinButtonContainer.classList.remove("T-I-JW");
  };
  marvinButtonContainer.onclick = () => {
    let titleElement =
      singleEmail.childNodes[1].childNodes[0].childNodes[0].childNodes;
    let emailSubject = generateTitle(titleElement);
    let emailLink =
      singleEmail.childNodes[1].childNodes[0].childNodes[0].getAttribute(
        "data-legacy-thread-id"
      );

    let message = chrome.runtime.sendMessage({
      message: "sendTaskFromSingleView",
      emailSubject,
      emailLink,
    });

    message.then(() => {
      changeClasses();
    });
  };

  let singleMarvinButton = document.createElement("div");
  singleMarvinButton.style.cssText = `background: url(${logo}) no-repeat center center; background-size: 20px; width: 20px; height: 20px; border-radius: 50%`;
  singleMarvinButton.classList.add("ase", "T-I-J3", "J-J5-Ji");

  // Success Message

  let marvinSuccessMessage = document.createElement("div");
  marvinSuccessMessage.textContent = "Task successfully added to Marvin!";
  document.body.appendChild(marvinSuccessMessage);

  let marvinSuccessMessageStyles = document.createElement("style");
  marvinSuccessMessageStyles.innerHTML = `
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
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 350px;
        height: 75px;
        z-index: 999;
        border-radius: 10px;
        text-align: center;
        padding: 10px;
    }`;
  document
    .getElementsByTagName("head")[0]
    .appendChild(marvinSuccessMessageStyles);

  marvinSuccessMessage.classList.add(
    "marvinSuccessMessage",
    "marvinSuccessMessageHidden"
  );

  setInterval(() => {
    tables = document.querySelectorAll("table.F.cf.zt");
    if (tables && isDisplayedInInbox) {
      tables.forEach((table) => {
        // check if we already added a listener to the table
        if (table.getAttribute("listener") !== "true") {
          table.addEventListener("mousemove", (e) => {
            if (
              e.target.nodeName === "TR" &&
              e.target.classList.contains("aqw")
            ) {
              emailElement = e.target;
              let buttons = e.target.childNodes[9].childNodes[0];
              let lastChild = buttons.lastChild;
              buttons.insertBefore(tableMarvinButton, lastChild);
            }
          });

          table.setAttribute("listener", "true");
        }
      });
    }

    singleEmail = document.querySelector(".nH.V8djrc.byY");
    if (singleEmail && isDisplayedInSingleEmail) {
      let singleEmailButtons = document.querySelector(".iH.bzn");
      let singleEmailButtonsElement =
        singleEmailButtons.childNodes[0].childNodes[3];

      marvinButtonContainer.childNodes[0].appendChild(singleMarvinButton);
      singleEmailButtonsElement.appendChild(marvinButtonContainer);
    }
  }, 2000);
});
