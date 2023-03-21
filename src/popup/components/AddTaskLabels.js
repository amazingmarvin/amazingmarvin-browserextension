import { useEffect, useState } from "react";
import { getStoredLabels } from "../../utils/storage";
import MarvinLabel from "../../components/MarvinLabel";
import AddTaskLabelsDropdown from "./AddTaskLabelsDropdown";

const AddTaskLabels = ({ labels, setLabels }) => {
  const [allLabels, setAllLabels] = useState([]);

  useEffect(() => {
    getStoredLabels().then((storedLabels) => {
      if (!storedLabels || storedLabels.length === 0) {
        return;
      }

      let allLabels = storedLabels.map((storedLabel) => {
        storedLabel.selected = false;
        return storedLabel;
      });

      setAllLabels(allLabels);
    });
  }, []);

  const checkLabel = (label) => {
    if (label.selected) {
      uncheckLabel(label._id);

      return;
    }

    setLabels((prevLabels) => {
      if (prevLabels.find((prevLabel) => prevLabel._id === label._id)) {
        return prevLabels;
      }

      return [...prevLabels, label];
    });

    setAllLabels((prevAllLabels) => {
      return prevAllLabels.map((prevLabel) => {
        if (prevLabel._id === label._id) {
          prevLabel.selected = true;
        }
        return prevLabel;
      });
    });
  };
  const uncheckLabel = (id) => {
    setLabels((prevLabels) => {
      return prevLabels.filter((label) => label._id !== id);
    });

    setAllLabels((prevAllLabels) => {
      return prevAllLabels.map((label) => {
        if (label._id === id) {
          label.selected = false;
        }
        return label;
      });
    });
  };

  return (
    <div>
      <label className="label">
        <span className="label-text text-neutral">Set Labels</span>
      </label>
      <div className="flex flex-wrap gap-y-2">
        {labels.length > 0 &&
          labels.map((label) => {
            if (!label.selected) {
              return;
            }

            return (
              <MarvinLabel
                key={label._id}
                label={label}
                uncheckLabel={uncheckLabel}
              />
            );
          })}
      </div>
      <AddTaskLabelsDropdown
        allLabels={allLabels}
        checkLabel={checkLabel}
        labels={labels}
      />
    </div>
  );
};

export default AddTaskLabels;
