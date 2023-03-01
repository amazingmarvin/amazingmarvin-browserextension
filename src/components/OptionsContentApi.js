import { getStoredToken, setStoredToken } from "../utils/storage";
import { useEffect, useState } from "react";
import { verifyToken } from "../utils/api";
import MarvinButton from "./MarvinButton";

const OptionsContentApi = () => {
  const [apiToken, setApiToken] = useState("");
  const [wrongToken, setWrongToken] = useState(false);
  const [successToken, setSuccessToken] = useState(false);

  useEffect(() => {
    getStoredToken().then((token) => {
      // Save X-API-Token value or X-FULL-ACCESS-TOKEN value
      if (token && "X-API-Token" in token) {
        setApiToken(token["X-API-Token"]);
      }

      if (token && "X-Full-Access-Token" in token) {
        setApiToken(token["X-Full-Access-Token"]);
      }
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

  const handleSave = async () => {
    let tokenResult = await verifyToken(apiToken);

    if (!tokenResult) {
      setWrongToken(true);
    }

    if (tokenResult) {
      setWrongToken(false);
      saveTokenToStorageAndState(tokenResult);
      setSuccessToken(true);
      setInterval(() => {
        setSuccessToken(false);
      }, 1500);
    }
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
        {wrongToken && (
          <p className="text-red-500 mt-3">
            Wrong token. Please verify that you copied apiToken or
            fullAccessToken value.
          </p>
        )}
        {successToken && (
          <p className="text-green-500 mt-3">Token saved successfully</p>
        )}
        <div className="flex flex-row justify-around w-full mt-3 mb-3">
          <input
            type="text"
            placeholder="Paste your token here"
            value={apiToken}
            onChange={(event) => setApiToken(event.target.value.trim())}
            className="input input-bordered w-full max-w-xs"
          />
          <MarvinButton onClick={handleSave}>Save</MarvinButton>
        </div>
      </div>
    </div>
  );
};

export default OptionsContentApi;
