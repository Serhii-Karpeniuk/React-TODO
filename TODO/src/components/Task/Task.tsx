import { useOutletContext } from "react-router-dom";
import TaskInterface from "../../Interfaces/TaskInterface";
import OutletContextInterface from "../../Interfaces/OutletContextInterface";
import "../Task/Task.scss";

const Task = ({ task }: { task: TaskInterface }) => {
  const { toggleTaskStatus, tasks, setTasks } =
    useOutletContext<OutletContextInterface>();
  // console.log(`Task Component`, tasks);

  const handleCheckBoxChange = () => {
    toggleTaskStatus(task.id);
  };

  const removeTask = (ID: string) => {
    const removeTasks = tasks.filter((task) => task.id !== ID);
    setTasks(removeTasks);
    localStorage.setItem("tasks", JSON.stringify(removeTasks));
    console.log(removeTasks);
  };

  return (
    <>
      <div className="card_task">
        <button onClick={() => removeTask(task.id)}>X</button>
        <div className="sub__container">
          <p className="task__title">Title: {task.title}</p>
          <input
            type="checkbox"
            checked={!task.open}
            onChange={handleCheckBoxChange}
          />
        </div>
        <p className="task__description">Description: {task.description}</p>
        <div className="time__container">
          <p className="task__startTime">
            Start: {task.startTime} - End: {task.endTime}
          </p>
        </div>
      </div>
    </>
  );
};

export default Task;
