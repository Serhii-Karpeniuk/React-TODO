import { FormEvent, useContext, useState } from "react";
import TaskInterface from "../../Interfaces/TaskInterface";
import { DialogContext } from "../DialogProvider/DialogProvider";
import { MessageContext } from "../MessageProvider/MessageProvider";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "./TaskForm.scss";
import MessageContextEnam from "../../Enums/MessageContextEnums";

interface TaskFormProps {
  addTaskHandler: (task: TaskInterface) => void;
}

const TaskForm = ({ addTaskHandler }: TaskFormProps) => {
  const { setDialogState } = useContext(DialogContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const { taskMessage, setTaskMessage } = useContext(MessageContext);

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
    if (startTime >= endTime) {
      setTaskMessage(() => MessageContextEnam.errorTime);

      setTimeout(() => {
        setTaskMessage("");
      }, 3000);
      return;
    }
    addTaskHandler(newTask);
    setTitle("");
    setDescription("");
    setStartTime("");
    setEndTime("");
    toast.success("Task was added");
    setDialogState({ open: false, content: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-1.5">
          <label htmlFor="title" className="title">
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="h-8 rounded-md py-3 px-0 border-2 border-slate-300"
            placeholder="Enter name task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
        </div>
        <div className="mb-1.5">
          <label htmlFor="description" className="title">
            Description: 
          </label>
          <input
            id="description"
            type="text"
            name="description"
             className="h-8 rounded-md py-3 px-0 border-2 border-slate-300 w-2/3"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
        </div>

        <div className="mb-1.5">
          <label htmlFor="start_time" className="title">
            Start:
          </label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            className="h-8 rounded-md py-3 px-0 border-2 border-slate-300"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <br />
        </div>

        <div className="mb-1.5">
          <label htmlFor="end_time" className="title">
            End:
          </label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            className="h-8 rounded-md py-3 px-0 border-2 border-slate-300"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <br />
          <p className="task__message">{taskMessage}</p>

          <div className="flex justify-center mt-1">
            <input
              disabled={!title || !description || !startTime || !endTime}
              type="submit"
              value="Add Task"
              className={`mt-1 p-1 bg-blue-500  bg-tahiti-800 text-white mx-auto w-1/2 rounded-md ${
                !title || !description || !startTime || !endTime
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
