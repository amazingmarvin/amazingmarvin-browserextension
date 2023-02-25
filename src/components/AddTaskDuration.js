const AddTaskDuration = ({
  timeEstimate,
  setTimeEstimate,
  timeEstimateButtons,
}) => {
  const buttons = timeEstimateButtons.map((button) => {
    const isChecked = timeEstimate === button.value;
    const classes = `btn btn-primary btn-xs no-animation ${
      isChecked ? "text-white" : "btn-outline"
    }`;

    return (
      <button
        key={button.value}
        className={classes}
        onClick={() => {
          console.log("clicked (onClick) on button: ", button.text);
          if (timeEstimate === button.value) {
            setTimeEstimate(0);
            return;
          }
          
          setTimeEstimate(button.value);
        }}
      >
        {button.text}
      </button>
    );
  });

  return (
    <div>
      <label className="label">
        <span className="label-text text-neutral">Time Estimate</span>
      </label>

      <div className="flex flex-wrap gap-1 px-1">{buttons}</div>
    </div>
  );
};

export default AddTaskDuration;
