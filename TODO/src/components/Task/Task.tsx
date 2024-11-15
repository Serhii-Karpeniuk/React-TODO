import { useOutletContext } from "react-router-dom";
import TaskInterface from "../../Interfaces/TaskInterface";
import OutletContextInterface from "../../Interfaces/OutletContextInterface";
import unCheckedImg from "../../images/unchecked.png";
import checkedImg from "../../images/checked.png";
import "../Task/Task.scss";

const Task = ({ task }: { task: TaskInterface }) => {
  const { tasks, setTasks } = useOutletContext<OutletContextInterface>();

  const removeTask = (ID: string) => {
    const removeTasks = tasks.filter((task) => task.id !== ID);
    setTasks(removeTasks);
    localStorage.setItem("tasks", JSON.stringify(removeTasks));
  };

  const toggleCheckbox = () => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? { ...t, open: !t.open } : t))
    );

    return task.open ? checkedImg : unCheckedImg;
  };

  return (
    <>
      <div className="card_task">
        <div className="sub__container">
          <p className="task__title">Title: {task.title}</p>
          <img
            src={task.open ? checkedImg : unCheckedImg}
            onClick={toggleCheckbox}
          />
        </div>
        <p className="task__description">Description: {task.description}</p>
        <div className="time__container">
          <p className="task__startTime">
            Start: {task.startTime} - End: {task.endTime}
          </p>
          <button
            className="remove__button"
            onClick={() => removeTask(task.id)}
          >
            remove task
          </button>
        </div>
      </div>
    </>
  );
};

export default Task;
