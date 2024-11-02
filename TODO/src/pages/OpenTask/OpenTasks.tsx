import { useOutletContext } from "react-router-dom";
import OutletContextInterface from "../../Interfaces/OutletContextInterface";
import Tasks from "../../components/Tasks/Tasks";

const OpenTasks = () => {
  const { tasks } = useOutletContext<OutletContextInterface>();

  return <Tasks tasks={tasks} />;
};

export default OpenTasks;
