import { useState } from "react";
import { getCategories } from "../utils/api";

import MarvinButton from "./MarvinButton";
import LoadingSpinner from "./LoadingSpinner";

const OptionsContentSync = () => {
  const [loadingCategories, setLoadingCategories] = useState(false);
  const fetchCategories = () => {
    setLoadingCategories(true);
    getCategories().then(() => {
      setLoadingCategories(false);
      console.log("Categories updated");
    });
  };

  return (
    <>
      <div className="rounded-lg bg-white shadow-lg text-sm">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Update Categories/Projects</h3>
          <p>
            Extension automatically loads your categories and projects every
            hour but you can also manually load them by clicking the button
            below. Use this setting if you just added a new category or a
            project in Marvin and need it in the "Set parent" picker when
            creating a new task.
          </p>
          <div className="card-actions justify-center mt-4">
            <MarvinButton onClick={fetchCategories}>
              {loadingCategories ? (
                <LoadingSpinner height="h-5" width="w-5" />
              ) : (
                "Load latest"
              )}
            </MarvinButton>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-lg text-sm mt-8">
        <div className="px-6 py-8">
          <h3 className="font-bold mb-3">Update Labels</h3>
          <p>
            Extension automatically loads your labels every hour but you can
            also manually load them by clicking the button below. Use this
            setting if you just added a new label in Marvin and need it in the
            "Set labels" picker when creating a new task.
          </p>
          <div className="card-actions justify-center mt-4">
            <MarvinButton onClick={() => {}}>Load latest</MarvinButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default OptionsContentSync;
