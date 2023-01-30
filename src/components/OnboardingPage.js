import { useState } from "react";
import { verifyToken } from "../utils/api";
import { setStoredToken } from "../utils/storage";

const OnboardingPage = ({ setApiToken, setOnboarded }) => {
  const [token, setToken] = useState("");
  const [wrongToken, setWrongToken] = useState(false);

  const saveTokenToStorageAndState = (tokenObject) => {
    setStoredToken(tokenObject).then(() => {
      setApiToken(tokenObject);
      setOnboarded(true);
    });
  };

  const handleSave = async () => {
    let tokenResult = await verifyToken(token);

    if (!tokenResult) {
      setWrongToken(true);
    }

    if (tokenResult) {
      console.log("saving token");
      saveTokenToStorageAndState(tokenResult);
    }
  };

  return (
    <div className="card w-full text-info-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-primary">Hello!</h2>
        <p>
          To start using Amazing Marvin extension, you will have to add your Amazing Marvin API
          token. You can get it using{" "}
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
          <div className="alert alert-error shadow-lg">
            <div>
              Wrong token. Please verify that you copied apiToken or
              fullAccessToken value
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="form-control w-full max-w-xs mt-3 mb-3">
          <input
            type="text"
            placeholder="Paste your token here"
            value={token}
            onChange={(event) => setToken(event.target.value.trim())}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary text-white" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
