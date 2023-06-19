const marvinSuccessMessage = document.createElement("div");
document.body.appendChild(marvinSuccessMessage);

function changeClasses() {
  marvinSuccessMessage.classList.remove("marvinSuccessMessageHidden");
  marvinSuccessMessage.classList.add("marvinSuccessMessageVisible");
  setTimeout(() => {
    marvinSuccessMessage.classList.remove("marvinSuccessMessageVisible");
    marvinSuccessMessage.classList.add("marvinSuccessMessageHidden");
  }, 2000);
}

const marvinSuccessStyles = document.createElement("style");
marvinSuccessStyles.appendChild(document.createTextNode(`
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
  color: #fff;
  font-size: 18px;
  position: sticky;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 75px;
  z-index: 999;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
}
`));

document
  .getElementsByTagName("head")[0]
  .appendChild(marvinSuccessStyles);

marvinSuccessMessage.classList.add(
  "marvinSuccessMessage",
  "marvinSuccessMessageHidden"
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.message === "getPageTitle") {
    sendResponse({
      title: document.title,
      url: window.location.href,
    });
  } else if (message.message === "getSelectedText") {
    sendResponse({ selectedText: window.getSelection().toString() });
  } else if (message.message === "success" || message.message === "fail") {
    marvinSuccessMessage.textContent =
      message.message === "success"
        ? "Task successfully added to Marvin!"
        : "Failed to add Task to Marvin!";
    changeClasses();
  }
});
