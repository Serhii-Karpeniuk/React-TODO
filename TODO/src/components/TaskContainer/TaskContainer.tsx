import { useContext, useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./TaskContainer.scss";
import { DialogContext } from "../DialogProvider/DialogProvider";
import TaskForm from "../TaskForm/TaskForm";
import TaskInterface from "../../Interfaces/TaskInterface";
import DateComponent from "../Date/Date";

const TaskContainer = () => {
  const { setDialogState } = useContext(DialogContext);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const location = useLocation();
  const [filter, setFilter] = useState<string>(
    location.pathname.split("/").pop() || "all"
  );

  // const [time] = useState(new Date());

  // const dayOfWeek = time.getDay();
  // const getNumnerDay = time.getDate();
  // const monthOfYear = time.getMonth();
  // const getYear = time.getFullYear();

  // const days = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];

  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // const fullData = `${days[dayOfWeek]} ${getNumnerDay} ${months[monthOfYear]} ${getYear}`;

  useEffect(() => {
    const tasksItems = JSON.parse(localStorage.getItem("tasks") || "[]");

    if (Array.isArray(tasksItems)) {
      setTasks(tasksItems);
    }
  }, [location.pathname, setTasks]);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  const handleClick = () => {
    setDialogState({
      open: true,
      content: <TaskForm addTaskHandler={addTaskHandler} />,
    });
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "open") return task.open;
    if (filter === "closed") return !task.open;
    return true;
  });

  const addTaskHandler = (newTask: TaskInterface) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, open: !task.open } : task
      )
    );
  };

  return (
    <>
      <div className="list__tasks">List of tasks</div>
      <div className="add__task-container">
        <p className="date">
          <DateComponent />
        </p>
        <button className="new__task-btn" onClick={handleClick}>
          +New Task
        </button>
      </div>

      <div className="navigation_buttons-container">
        <NavLink to="all" onClick={() => handleFilterChange("all")}>
          All Task
        </NavLink>
        <NavLink to="open" onClick={() => handleFilterChange("open")}>
          Open Task
        </NavLink>
        <NavLink to="closed" onClick={() => handleFilterChange("closed")}>
          Closed Task
        </NavLink>
      </div>
      <Outlet
        context={{
          tasks: filteredTasks,
          toggleTaskStatus,
          setTasks,
          addTaskHandler,
        }}
      />
    </>
  );
};

export default TaskContainer;
