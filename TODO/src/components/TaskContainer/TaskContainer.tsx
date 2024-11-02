import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TaskContainerProps from "../../Interfaces/TaskContainerProps";
import TaskForm from "../TaskForm/TaskForm";
import TaskInterface from "../../Interfaces/TaskInterface";
import "./TaskContainer.scss";

const TaskContainer = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [filter, setFilter] = useState<string>(
    location.pathname.split("/").pop() || "all"
  );

  useEffect(() => {
    const tasksItems = JSON.parse(localStorage.getItem("tasks") || "[]");

    if (Array.isArray(tasksItems)) {
      setTasks(tasksItems);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  const handleClick = () => {
    setIsVisible(true);
  }; // setModalSettings викликатии і передати об'єкт

  const addTaskHandler = (newTask: TaskInterface) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsVisible(false);
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, open: !task.open } : task
      )
    );
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

  return (
    <>
      <div className="list__tasks">List of tasks</div>
      <div className="add__task-container">
        <p className="date">Thursday, 24 October Доробити</p>
        <button className="new__task-btn" onClick={handleClick}>
          +New Task
        </button>
      </div>
      <TaskForm isVisible={isVisible} addTaskHandler={addTaskHandler} />
      <div className="navigation_buttons-container">
        <NavLink
          to="all"
          onClick={() => handleFilterChange("all")}
          className={({ isActive, isPending }: TaskContainerProps) =>
            isPending ? "pending" : isActive ? "active" : "default_link"
          }
        >
          All Task
        </NavLink>

        <NavLink
          to="open"
          onClick={() => handleFilterChange("open")}
          className={({ isActive, isPending }: TaskContainerProps) =>
            isPending ? "pending" : isActive ? "active" : "default_link"
          }
        >
          Open Task
        </NavLink>

        <NavLink
          to="closed"
          onClick={() => handleFilterChange("closed")}
          className={({ isActive, isPending }: TaskContainerProps) =>
            isPending ? "pending" : isActive ? "active" : "default_link"
          }
        >
          Closed Task
        </NavLink>
      </div>

      <Outlet context={{ tasks: filteredTasks, toggleTaskStatus, setTasks }} />
    </>
  );
};

export default TaskContainer;
