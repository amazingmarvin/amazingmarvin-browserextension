import RadioButton from "./RadioButton";
import { HiSun, HiOutlineMoon, HiCalendar } from "react-icons/hi2";
import { useState } from "react";
import { formatDate, isValidDate } from "../utils/dates";
import { BsCalendarX } from "react-icons/bs";

import AddTaskTitle from "./AddTaskTitle";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import '../day-picker.css';

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState("")
  const [scheduleDate, setScheduleDate] = useState("unassigned");
  const [selected, setSelected] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  return !datePickerVisible ? (
    <div className="form-control w-full p-5 gap-4">

      <AddTaskTitle title={taskTitle} setTaskTitle={setTaskTitle} />


      <div>
        <label className="label">
          <span className="label-text text-neutral">Schedule date</span>
        </label>

        <div className="flex flex-row gap-3 px-1">
          <RadioButton
            value={scheduleDate === "today"}
            onChange={() => {
              setScheduleDate("today");
            }}
          >
            <HiSun size={22} />
          </RadioButton>

          <RadioButton
            value={scheduleDate === "tomorrow"}
            onChange={() => {
              setScheduleDate("tomorrow");
            }}
          >
            <HiOutlineMoon size={22} />
          </RadioButton>

          <RadioButton
            value={isValidDate(scheduleDate)}
            onClick={() => {
              setDatePickerVisible(!datePickerVisible);
            }}
            onChange={() => {
              setDatePickerVisible(!datePickerVisible);
            }}
          >
            <HiCalendar size={22} />
          </RadioButton>

          <RadioButton
            value={scheduleDate === "unassigned"}
            onChange={() => {
              setScheduleDate("unassigned");
            }}
          >
            <BsCalendarX size={20} />
          </RadioButton>
        </div>
      </div>
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
      <button className="btn btn-circle btn-outline btn-sm absolute top-2 right-2" onClick={() => setDatePickerVisible(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
};

export default AddTask;
