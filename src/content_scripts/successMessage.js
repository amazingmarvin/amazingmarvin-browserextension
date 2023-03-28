function changeClasses() {
  marvinSuccessMessage.classList.remove("marvinSuccessMessageHidden");
  marvinSuccessMessage.classList.add("marvinSuccessMessageVisible");
  setTimeout(() => {
    marvinSuccessMessage.classList.remove("marvinSuccessMessageVisible");
    marvinSuccessMessage.classList.add("marvinSuccessMessageHidden");
  }, 2000);
}

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
    }`;
document
  .getElementsByTagName("head")[0]
  .appendChild(marvinSuccessMessageStyles);

marvinSuccessMessage.classList.add(
  "marvinSuccessMessage",
  "marvinSuccessMessageHidden"
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.message === "success") {
    changeClasses();
  }
});
