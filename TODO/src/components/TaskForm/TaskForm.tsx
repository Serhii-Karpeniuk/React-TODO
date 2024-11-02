import { FormEvent, useState, FC } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TaskForm.scss";
import TaskInterface from "../../Interfaces/TaskInterface";

// interface TaskFormProps {
//   addTaskHandler: (newTask: {
//     id: string;
//     title: string;
//     description: string;
//     startTime: string;
//     endTime: string;
//     open: boolean;
//   }) => void;
//   isVisible: boolean;
// }

interface TaskFormProps {
  addTaskHandler: (newTask: TaskInterface) => void;
  isVisible: boolean;
}

const TaskForm: FC<TaskFormProps> = ({ addTaskHandler, isVisible }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: uuidv4(),
      open: true,
      title,
      description,
      startTime,
      endTime,
    };
    addTaskHandler(newTask);
    setTitle("");
    setDescription("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <>
      <div
        className="form__task-container"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        <form className="form_task" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            data-field="task_name"
            className="margin border-radius"
            placeholder="Enter name task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            data-field="task_description"
            className="margin border-radius"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />

          <label htmlFor="start_time">Start:</label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            data-field="start_time"
            className="margin border-radius"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <br />

          <label htmlFor="end_time">End:</label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            data-field="end_time"
            className="margin border-radius"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <br />

          <input
            type="submit"
            value="Add Task"
            className="add_task-button margin"
          />
        </form>
      </div>
    </>
  );
};

export default TaskForm;
