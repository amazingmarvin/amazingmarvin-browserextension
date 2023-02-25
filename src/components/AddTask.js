import { useState } from "react";
import { formatDate, isValidDate } from "../utils/dates";

import { HiCalendar, HiOutlineMoon, HiSun } from "react-icons/hi2";
import { BsCalendarX } from "react-icons/bs";

import AddTaskTitle from "./AddTaskTitle";
import AddTaskDate from "./AddTaskDate";
import AddTaskDatePicker from "./AddTaskDatePicker";
import AddTaskDuration from "./AddTaskDuration";
import AddTaskNote from "./AddTaskNote";

import "react-day-picker/dist/style.css";
import "../styles/day-picker.css";

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [scheduleDate, setScheduleDate] = useState("unassigned");
  const [dueDate, setDueDate] = useState("unassigned");
  const [timeEstimate, setTimeEstimate] = useState(1200000);
  const [note, setNote] = useState("");

  const [scheduleDatePicker, setScheduleDatePicker] = useState({
    visible: false,
    selectedDate: isValidDate(scheduleDate) || new Date(),
  });
  const [dueDatePicker, setDueDatePicker] = useState({
    visible: false,
    selectedDate: isValidDate(dueDate) || new Date(),
  });

  const scheduleDateButtons = [
    {
      value: "today",
      icon: <HiSun size={22} />,
      onChange: () => {
        setScheduleDate("today");
      },
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
        setScheduleDatePicker({
          ...scheduleDatePicker,
          visible: !scheduleDatePicker.visible,
        });
      },
      onChange: () => {
        setScheduleDatePicker({
          ...scheduleDatePicker,
          visible: !scheduleDatePicker.visible,
        });
      },
    },
    {
      value: "unassigned",
      icon: <BsCalendarX size={20} />,
      onChange: () => {
        setScheduleDate("unassigned");
      },
    },
  ];
  const dueDateButtons = [
    {
      value: "today",
      icon: <HiSun size={22} />,
      onChange: () => {
        setDueDate("today");
      },
    },
    {
      value: "tomorrow",
      icon: <HiOutlineMoon size={22} />,
      onChange: () => {
        setDueDate("tomorrow");
      },
    },
    {
      isDatePicker: true,
      value: isValidDate(dueDate),
      icon: <HiCalendar size={22} />,
      onClick: () => {
        setDueDatePicker({
          ...dueDatePicker,
          visible: !dueDatePicker.visible,
        });
      },
      onChange: () => {
        setDueDatePicker({
          ...dueDatePicker,
          visible: !dueDatePicker.visible,
        });
      },
    },
    {
      value: "unassigned",
      icon: <BsCalendarX size={20} />,
      onChange: () => {
        setDueDate("unassigned");
      },
    },
  ];
  const timeEstimateButtons = [
    { text: "5m", value: 300000 },
    { text: "10m", value: 600000 },
    { text: "15m", value: 900000 },
    { text: "20m", value: 1200000 },
    { text: "30m", value: 1800000 },
    { text: "45m", value: 2700000 },
    { text: "1h", value: 3600000 },
    { text: "1h 30m", value: 5400000 },
    { text: "2h", value: 7200000 },
  ];

  return !(scheduleDatePicker.visible || dueDatePicker.visible) ? (
    <div className="form-control w-full p-5 gap-2">
      <AddTaskTitle title={taskTitle} setTaskTitle={setTaskTitle} />

      <AddTaskNote note={note} setNote={setNote} />

      <AddTaskDate
        type="Schedule date"
        date={scheduleDate}
        buttons={scheduleDateButtons}
      />

      <AddTaskDate type="Due date" date={dueDate} buttons={dueDateButtons} />

      <AddTaskDuration
        timeEstimate={timeEstimate}
        setTimeEstimate={setTimeEstimate}
        timeEstimateButtons={timeEstimateButtons}
      />

      <button className="btn btn-primary text-white">Create Task</button>
    </div>
  ) : scheduleDatePicker.visible ? (
    <AddTaskDatePicker
      selectedDate={scheduleDatePicker.selectedDate}
      handleSelect={(selectedDate) => {
        setScheduleDate(formatDate(selectedDate));
        setScheduleDatePicker({
          ...scheduleDatePicker,
          selectedDate,
          visible: false,
        });
      }}
      setDatePickerVisible={() => {
        setScheduleDatePicker({
          ...scheduleDatePicker,
          visible: false,
        });
      }}
    />
  ) : (
    <AddTaskDatePicker
      selectedDate={dueDatePicker.selectedDate}
      handleSelect={(selectedDate) => {
        setDueDate(formatDate(selectedDate));
        setDueDatePicker({
          ...dueDatePicker,
          selectedDate,
          visible: false,
        });
      }}
      setDatePickerVisible={() => {
        setDueDatePicker({
          ...dueDatePicker,
          visible: false,
        });
      }}
    />
  );
};

export default AddTask;
