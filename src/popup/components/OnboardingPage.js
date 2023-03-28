import { useCallback, useState } from "react";

import { verifyToken, getLabels, getCategories } from "../../utils/api";
import { setStoredToken } from "../../utils/storage";

import MarvinButton from "../../components/MarvinButton";
import LoadingSpinner from "../../components/LoadingSpinner";

const OnboardingPage = ({ setApiToken, setOnboarded }) => {
  let marvinHello = chrome.runtime.getURL("static/marvinhello.png");

  const [token, setToken] = useState("");
  const [verifyingToken, setVerifyingToken] = useState(false);
  const [wrongToken, setWrongToken] = useState(false);

  const changeToken = useCallback((e) => {
    setToken(e.target.value.trim())
  }, [setToken]);

  const saveTokenToStorageAndState = (tokenObject) => {
    setStoredToken(tokenObject).then(() => {
      setApiToken(tokenObject);
      setOnboarded(true);
    });
  };

  const save = useCallback(async (apiToken) => {
    setWrongToken(false);
    setVerifyingToken(true);

    let justTokenPart = apiToken.split(" ").at(-1);
    let tokenResult = await verifyToken(justTokenPart);

    if (!tokenResult) {
      setWrongToken(true);
      setTimeout(() => {
        setWrongToken(false);
      }, 3000);
      setVerifyingToken(false);
    }

    if (tokenResult) {
      setVerifyingToken(true);
      await saveTokenToStorageAndState(tokenResult);
      await getLabels();
      await getCategories();
      setVerifyingToken(false);
    }
  }, [setWrongToken, setVerifyingToken]);

  const paste = useCallback((e) => {
    const pastedToken = e.clipboardData.getData("text");
    if (pastedToken) {
      save(pastedToken);
    }
  }, [token]);

  const handleSave = useCallback(() => {
    if (!token) {
      setWrongToken(true);
      return;
    }

    save(token);
  }, [token, save, setWrongToken]);

  return (
    <div className="card w-full text-info-content">
      <div className="card-body items-center text-center">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#26d6c4] to-[#10b1d3]">
            Hello!
          </span>
        </h1>
        <p className="text-base font-normal text-gray-500">
          To start using the Amazing Marvin browser extension, you will have to
          add your Amazing Marvin API token. You can get it from{" "}
          <a
            href="https://app.amazingmarvin.com/pre?api"
            target="_blank"
            className="link link-primary"
          >
            this link
          </a>
          .
        </p>

        {wrongToken ? (
          <div
            className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <span className="font-medium font-bold">Wrong token!</span> Please
            verify that you copied apiToken or fullAccessToken value.
          </div>
        ) : (
          ""
        )}
        <div className="form-control w-full max-w-xs mt-3 mb-3">
          <input
            type="text"
            placeholder="Paste your token here"
            value={token}
            onChange={changeToken}
            className="input input-primary input-bordered w-full max-w-xs"
            autoFocus
            onPaste={paste}
          />
        </div>
        <div className="card-actions justify-end">
          {!token ? (
            <MarvinButton className="invisible">
              <LoadingSpinner width="w-4" height="h-4" />
            </MarvinButton>
          ) : !verifyingToken ? (
            <button
              className="text-white bg-gradient-to-r from-[#26d6c4] to-[#10b1d3] hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-[0_2px_10px_rgba(28,197,203,0.5)] font-medium rounded-lg text-sm text-center px-5 py-2.5 mx-1 my-1"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <MarvinButton>
              <LoadingSpinner width="w-4" height="h-4" />
            </MarvinButton>
          )}
        </div>
      </div>
      <div className="relative h-[90px]">
        <img
          className="w-[200px] absolute bottom-0 right-0"
          src={marvinHello}
          alt="image description"
        ></img>
      </div>
    </div>
  );
};

export default OnboardingPage;
