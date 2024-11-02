import Task from "../Task/Task";
import TaskInterface from "../../Interfaces/TaskInterface";
import { useContext, useEffect } from "react";
import { MessageContext } from "../MessageProvider/MessageProvider";
import MessageContextEnam from "../../Enums/MessageContextEnums";

interface TaskProps {
  tasks: TaskInterface[];
}

const Tasks = ({ tasks }: TaskProps) => {
  const taskContext = useContext(MessageContext);

  if (!taskContext) {
    throw new Error("taskContext must be used within a MessageProvider");
  }

  const { taskMessageStyle, setTaskMessage } = taskContext;

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      setTaskMessage(MessageContextEnam.info);
    } else {
      setTaskMessage(null);
    }
  }, [tasks, setTaskMessage]);

  if (!tasks || tasks.length === 0) {
    return <div style={taskMessageStyle}>{MessageContextEnam.info}</div>;
  }

  return (
    <div>
      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
