import { useState } from "react";
import { formatDate, isValidDate } from "../utils/dates";
import { addTask, markDone } from "../utils/api";

import { BsSun, BsMoon, BsCalendarPlus, BsCalendarX } from "react-icons/bs";

import AddTaskTitle from "./AddTaskTitle";
import AddTaskDate from "./AddTaskDate";
import AddTaskDatePicker from "./AddTaskDatePicker";
import AddTaskDuration from "./AddTaskDuration";
import AddTaskNote from "./AddTaskNote";
import AddTaskParent from "./AddTaskParent";
import AddTaskParentPicker from "./AddTaskParentPicker";
import AddTaskLabels from "./AddTaskLabels";
import MarvinButton from "./MarvinButton";
import LoadingSpinner from "./LoadingSpinner";

import "react-day-picker/dist/style.css";
import "../styles/day-picker.css";

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [note, setNote] = useState("");
  const [scheduleDate, setScheduleDate] = useState("unassigned");
  const [scheduleDatePicker, setScheduleDatePicker] = useState({
    visible: false,
    selectedDate: isValidDate(scheduleDate) || new Date(),
  });
  const [dueDate, setDueDate] = useState("unassigned");
  const [dueDatePicker, setDueDatePicker] = useState({
    visible: false,
    selectedDate: isValidDate(dueDate) || new Date(),
  });
  const [timeEstimate, setTimeEstimate] = useState(null);
  const [parent, setParent] = useState({ title: "Inbox", _id: "" });
  const [parentPickerVisible, setParentPickerVisible] = useState(false);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setTaskTitle("");
    setNote("");
    setScheduleDate("unassigned");
    setScheduleDatePicker({
      visible: false,
      selectedDate: isValidDate(scheduleDate) || new Date(),
    });
    setDueDate("unassigned");
    setDueDatePicker({
      visible: false,
      selectedDate: isValidDate(dueDate) || new Date(),
    });
    setTimeEstimate(null);
    setParent({ title: "Inbox", _id: "" });
    setParentPickerVisible(false);
    setLabels([]);
  };

  const handleAddTask = () => {
    let shortcuts = [];

    let data = {
      done: false,
      title: taskTitle,
      note: note,
    };

    if (scheduleDate !== "unassigned") {
      if (isValidDate(scheduleDate)) {
        data.day = scheduleDate;
      }

      if (scheduleDate === "today") {
        data.day = formatDate(new Date());
      }

      if (scheduleDate === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        data.day = formatDate(tomorrow);
      }
    }

    if (dueDate !== "unassigned") {
      if (isValidDate(dueDate)) {
        data.dueDate = dueDate;
      }

      if (dueDate === "today") {
        data.dueDate = formatDate(new Date());
      }

      if (dueDate === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        data.dueDate = formatDate(tomorrow);
      }
    }

    if (timeEstimate) {
      data.timeEstimate = timeEstimate;
    }

    if (parent._id) {
      data.parentId = parent._id;
    } else {
      shortcuts.push(`#${parent.title}`);
    }

    if (labels.length) {
      data.labelIds = labels.map((label) => label._id);
    }

    data.title = data.title + " " + shortcuts.join(" ");
    data.title = data.title.trim();

    setLoading(true);

    addTask(data).then((message) => {
      setLoading(false);

      if (message === "success") {
        setMessage("Task successfully created!");
        resetForm();
      } else {
        setMessage("Couldn't create task!");
      }

      setInterval(() => {
        setMessage("");
      }, 2000);
    });
  };

  const scheduleDateButtons = [
    {
      value: "today",
      icon: <BsSun size={20} />,
      onChange: () => {
        setScheduleDate("today");
      },
    },
    {
      value: "tomorrow",
      icon: <BsMoon size={20} />,
      onChange: () => {
        setScheduleDate("tomorrow");
      },
    },
    {
      isDatePicker: true,
      value: isValidDate(scheduleDate),
      icon: <BsCalendarPlus size={20} />,
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
      icon: <BsSun size={20} />,
      onChange: () => {
        setDueDate("today");
      },
    },
    {
      value: "tomorrow",
      icon: <BsMoon size={20} />,
      onChange: () => {
        setDueDate("tomorrow");
      },
    },
    {
      isDatePicker: true,
      value: isValidDate(dueDate),
      icon: <BsCalendarPlus size={20} />,
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

  const displayElements = () => {
    if (scheduleDatePicker.visible) {
      return (
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
      );
    }

    if (dueDatePicker.visible) {
      return (
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
    }

    if (parentPickerVisible) {
      return (
        <AddTaskParentPicker
          parent={parent}
          setParent={setParent}
          setParentPickerVisible={setParentPickerVisible}
        />
      );
    }

    return (
      <div className="form-control w-full gap-4 divide-y">
        <div className="form-control w-full pt-2 px-5">
          <AddTaskTitle title={taskTitle} setTaskTitle={setTaskTitle} />

          <AddTaskNote note={note} setNote={setNote} />

          <div className="flex flex-row justify-between">
            <AddTaskDate
              type="Schedule date"
              date={scheduleDate}
              buttons={scheduleDateButtons}
            />

            <AddTaskDate
              type="Due date"
              date={dueDate}
              buttons={dueDateButtons}
            />
          </div>

          <AddTaskDuration
            timeEstimate={timeEstimate}
            setTimeEstimate={setTimeEstimate}
            timeEstimateButtons={timeEstimateButtons}
          />

          <AddTaskParent
            parent={parent}
            setParent={setParent}
            setParentPickerVisible={setParentPickerVisible}
          />

          <AddTaskLabels labels={labels} setLabels={setLabels} />
        </div>

        <div className="flex flex-wrap justify-center py-4 px-2">
          {message && (
            <div className="text-blue-500 p-0.5 text-base mb-1">{message}</div>
          )}
          {!loading ? (
            <MarvinButton
              width="w-full"
              disabled={!taskTitle}
              onClick={handleAddTask}
            >
              Create Task
            </MarvinButton>
          ) : (
            <LoadingSpinner height="h-5" width="w-5" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-y-scroll scrollbar-hide">{displayElements()}</div>
  );
};

export default AddTask;
