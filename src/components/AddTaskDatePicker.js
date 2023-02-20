import { DayPicker } from "react-day-picker";

const AddTaskDatePicker = ({
  selectedDate,
  handleSelect,
  setDatePickerVisible,
}) => {
  return (
    <div className="static grid place-content-center pt-4">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(selectedDate) => {
          handleSelect(selectedDate);
        }}
      />
      <button
        className="btn btn-circle btn-outline btn-sm absolute top-2 right-2"
        onClick={setDatePickerVisible}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default AddTaskDatePicker;
