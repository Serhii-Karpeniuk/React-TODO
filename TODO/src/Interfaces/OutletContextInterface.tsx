import TaskInterface from "./TaskInterface";

interface OutletContextInterface {
  toggleTaskStatus: (taskId: string) => void;
  tasks: TaskInterface[];
  setTasks: (tasks: TaskInterface[]) => void;
}

export default OutletContextInterface;
