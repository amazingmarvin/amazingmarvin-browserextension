import { useState } from "react";
import { formatDate, isValidDate } from "../utils/dates";

import { HiCalendar, HiOutlineMoon, HiSun } from "react-icons/hi2";
import { BsCalendarX } from "react-icons/bs";

import AddTaskTitle from "./AddTaskTitle";
import AddTaskDate from "./AddTaskDate";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../day-picker.css";

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const [scheduleDate, setScheduleDate] = useState("unassigned");
  const [selected, setSelected] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const scheduleDateButtons = [
    {
      value: "today",
      icon: <HiSun size={22} />,
      onChange: () => {
        setScheduleDate("today");
      }
    },
    {
      value: "tomorrow",
      icon: <HiOutlineMoon size={22} />,
      onChange: () => {
        setScheduleDate("tomorrow");
      },
    },
    {
      isDatePicker: true,
      value: isValidDate(scheduleDate),
      icon: <HiCalendar size={22} />,
      onClick: () => {
        setDatePickerVisible(!datePickerVisible);
      },
      onChange: () => {
        setDatePickerVisible(!datePickerVisible);
      },
    },
    {
      value: "unassigned",
      icon: <BsCalendarX size={20} />,
      onChange: () => {
        setScheduleDate("unassigned");
      }
    },
  ];

  return !datePickerVisible ? (
    <div className="form-control w-full p-5 gap-4">
      <AddTaskTitle title={taskTitle} setTaskTitle={setTaskTitle} />

      <AddTaskDate
        type="Schedule date"
        date={scheduleDate}
        buttons={scheduleDateButtons}
      />

      <button className="btn btn-primary text-white">Create Task</button>
    </div>
  ) : (
    <div className="static grid place-content-center pt-4">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(selectedDate) => {
          setScheduleDate(formatDate(selectedDate));
          setSelected(selectedDate);
          setDatePickerVisible(false);
        }}
      />
      <button
        className="btn btn-circle btn-outline btn-sm absolute top-2 right-2"
        onClick={() => setDatePickerVisible(false)}
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

export default AddTask;
