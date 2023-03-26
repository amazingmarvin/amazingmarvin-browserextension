import RadioButton from "../../components/RadioButton";

const AddTaskDate = ({ type, date, buttons }) => {
  const radioButtons = buttons.map((button) => {
    if (button.hasOwnProperty("isDatePicker")) {
      return (
        <RadioButton
          key={button.value}
          value={button.value}
          onClick={button.onClick}
          onChange={button.onChange}
          data-hov={button.hoverText}
          data-pos={button.hoverPos}
        >
          {button.icon}
        </RadioButton>
      );
    }

    return (
      <RadioButton
        key={button.value}
        value={date === button.value}
        onChange={button.onChange}
        data-hov={button.hoverText}
        data-pos={button.hoverPos}
      >
        {button.icon}
      </RadioButton>
    );
  });

  return (
    <div>
      <label className="label">
        <span className="label-text text-neutral">{type}</span>
      </label>

      <div className="flex flex-row gap-3 px-1">{radioButtons}</div>
    </div>
  );
};

export default AddTaskDate;
