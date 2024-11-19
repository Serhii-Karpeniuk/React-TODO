import TaskInterface from "./TaskInterface";

interface OutletContextInterface {
  toggleTaskStatus: (taskId: string) => void;
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
}

export default OutletContextInterface;
