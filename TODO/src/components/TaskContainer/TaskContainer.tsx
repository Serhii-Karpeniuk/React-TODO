import { useContext, useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./TaskContainer.scss";
import { DialogProviderContext } from "../DialogProvider/DialogProvider";

const TaskContainer = () => {
  const context = useContext(DialogProviderContext);
  if (!context) {
    throw new Error(
      "DialogProviderContext must be used within a DialogProvider"
    );
  }
  const {
    setTaskFormVisible,
    tasks,
    setTasks,
    addTaskHandler,
    toggleTaskStatus,
  } = context;
  const location = useLocation();
  const [filter, setFilter] = useState<string>(
    location.pathname.split("/").pop() || "all"
  );

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
    setTaskFormVisible(true);
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
