import { useCallback, useEffect, useState } from "react";

import { getStoredToken, setStoredToken } from "../../utils/storage";
import { verifyToken } from "../../utils/api";

import MarvinButton from "../../components/MarvinButton";

function copyText(text, showToastr=true, what="text") {
  const temp = document.createElement("PRE");
  temp.opacity = 0;
  temp.position = "absolute";
  temp.innerText = text;
  document.body.appendChild(temp);

  try {
    const range = document.createRange();
    range.selectNode(temp);
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    const success = document.execCommand("copy");
  } catch (err) { // eslint-disable-line
    // Do nothing
  } finally {
    document.body.removeChild(temp);
  }
}

const OptionsContentApi = () => {
  const [initialApiToken, setInitialApiToken] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [loggedOut, setLoggedOut] = useState(false);
  const [wrongToken, setWrongToken] = useState(false);
  const [successToken, setSuccessToken] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getStoredToken().then((token) => {
      const apiToken = (token && (token["X-API-Token"] || token["X-Full-Access-Token"])) || "";
      setApiToken(apiToken);
      setInitialApiToken(apiToken);
    });
  }, []);

  const saveTokenToStorageAndState = (tokenObject) => {
    setStoredToken(tokenObject).then(() => {
      if (tokenObject && "X-API-Token" in tokenObject) {
        setApiToken(tokenObject["X-API-Token"]);
      }

      if (tokenObject && "X-Full-Access-Token" in tokenObject) {
        setApiToken(tokenObject["X-Full-Access-Token"]);
      }
    });
  };

  const copyToken = useCallback(() => {
    copyText(apiToken);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [apiToken, setCopied])

  const toggleShowToken = useCallback(() => {
    setShowToken((x) => !x);
  }, [setShowToken]);

  const save = useCallback(async (token) => {
    setLoggedOut(false);
    if (!token) {
      setWrongToken(true);
      setTimeout(() => {
        setWrongToken(false);
      }, 3000);
      return;
    }

    let justTokenPart = token.split(" ").at(-1);
    let tokenResult = await verifyToken(justTokenPart);

    if (!tokenResult) {
      setWrongToken(true);
      setTimeout(() => {
        setWrongToken(false);
      }, 3000);
    }

    if (tokenResult) {
      setWrongToken(false);
      saveTokenToStorageAndState(tokenResult);
      setSuccessToken(true);
      setInitialApiToken(token);
      setTimeout(() => {
        setSuccessToken(false);
      }, 2000);
    }
  }, []);

  const handleSave = useCallback(() => {
    save(apiToken);
  }, [apiToken]);

  const paste = useCallback((e) => {
    const pastedToken = e.clipboardData.getData("text");
    if (pastedToken) {
      save(pastedToken);
    }
  }, []);

  const handleLogout = () => {
    setInitialApiToken("");
    setApiToken("");
    setStoredToken(null);
    setLoggedOut(true);
  };

  return (
    <div className="rounded-lg bg-white shadow-lg text-sm">
      <div className="px-6 py-8">
        <h3 className="font-bold mb-3">API Token</h3>
        <p>
          Here you can enter or change your Amazing Marvin API token. To get
          your token open{" "}
          <a
            href="https://app.amazingmarvin.com/pre?api"
            target="_blank"
            className="link link-primary"
          >
            this link
          </a>
          .
        </p>
        <div className="flex flex-row justify-around w-full mt-3 mb-3 gap-2">
          <input
            type={showToken ? "text" : "password"}
            placeholder="Paste your token here"
            value={apiToken}
            onChange={(event) => setApiToken(event.target.value.trim())}
            onPaste={paste}
            className="input input-primary input-bordered w-full"
          />
          {apiToken && (
            <MarvinButton onClick={copyToken}>Copy</MarvinButton>
          )}
          <MarvinButton onClick={toggleShowToken}>{showToken ? "Hide" : "Show"}</MarvinButton>
          {apiToken && apiToken !== initialApiToken && (
            <MarvinButton onClick={handleSave}>Save</MarvinButton>
          )}
          {apiToken && apiToken === initialApiToken && (
            <MarvinButton onClick={handleLogout}>Logout</MarvinButton>
          )}
        </div>
        {wrongToken && (
          <p className="text-red-500 mt-3">
            Wrong token. Please verify that you copied apiToken or
            fullAccessToken value.
          </p>
        )}
        {successToken && (
          <p className="text-green-500 mt-3">Token successfully saved.</p>
        )}
        {copied && (
          <p className="text-green-500 mt-3">Copied to clipboard!</p>
        )}
        {loggedOut && (
          <p className="text-red-500 mt-3">
            You have logged out. You'll need to enter a new token to continue use of this browser extension.
          </p>
        )}
      </div>
    </div>
  );
};

export default OptionsContentApi;
