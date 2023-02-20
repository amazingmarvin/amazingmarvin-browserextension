import { useState } from "react";
import { formatDate, isValidDate } from "../utils/dates";

import { HiCalendar, HiOutlineMoon, HiSun } from "react-icons/hi2";
import { BsCalendarX } from "react-icons/bs";

import AddTaskTitle from "./AddTaskTitle";
import AddTaskDate from "./AddTaskDate";
import AddTaskDatePicker from "./AddTaskDatePicker";

import "react-day-picker/dist/style.css";
import "../day-picker.css";

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [scheduleDate, setScheduleDate] = useState("unassigned");
  const [dueDate, setDueDate] = useState("unassigned");

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

  return !(scheduleDatePicker.visible || dueDatePicker.visible) ? (
    <div className="form-control w-full p-5 gap-4">
      <AddTaskTitle title={taskTitle} setTaskTitle={setTaskTitle} />

      <AddTaskDate
        type="Schedule date"
        date={scheduleDate}
        buttons={scheduleDateButtons}
      />

      <AddTaskDate type="Due date" date={dueDate} buttons={dueDateButtons} />

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
