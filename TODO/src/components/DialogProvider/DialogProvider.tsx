import { createContext, useState, ReactNode, useEffect } from "react";
import TaskInterface from "../../Interfaces/TaskInterface";
import closeButton from "../../images/close-img.png";
import "./DialogProvider.scss";
import FormDialog from "../FormDialog/FormDialog";
import TaskForm from "../TaskForm/TaskForm";

interface DialogProviderContextProps {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  isTaskFormVisible: boolean;
  setTaskFormVisible: (visible: boolean) => void;
  submittedData: { firstName: string; lastName: string };
  setSubmittedData: (data: { firstName: string; lastName: string }) => void;
  handleSubmit: (firstName: string, lastName: string) => void;
  tasks: TaskInterface[];
  setTasks: (tasks: TaskInterface[]) => void;
  addTaskHandler: (newTask: TaskInterface) => void;
  toggleTaskStatus: (taskId: string) => void;
}

export const DialogProviderContext = createContext<
  DialogProviderContextProps | undefined
>(undefined);

const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTaskFormVisible, setTaskFormVisible] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<{
    firstName: string;
    lastName: string;
  }>({ firstName: "", lastName: "" });
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  const handleSubmit = (firstName: string, lastName: string) => {
    setSubmittedData({ firstName, lastName });
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    setModalOpen(false);
  };

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");

    if (storedFirstName && storedLastName) {
      setSubmittedData({
        firstName: storedFirstName,
        lastName: storedLastName,
      });
    }
  }, []);

  const addTaskHandler = (newTask: TaskInterface) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskFormVisible(false);
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, open: !task.open } : task
      )
    );
  };

  return (
    <DialogProviderContext.Provider
      value={{
        isModalOpen,
        setModalOpen,
        isTaskFormVisible,
        setTaskFormVisible,
        submittedData,
        setSubmittedData,
        handleSubmit,
        tasks,
        setTasks,
        addTaskHandler,
        toggleTaskStatus,
      }}
    >
      {isModalOpen || isTaskFormVisible ? (
        <div className="dialog__overlay">
          <div className="dialog__container">
            <img
              src={closeButton}
              className="close__img"
              onClick={() => {
                setModalOpen(false);
                setTaskFormVisible(false);
              }}
              alt="Закрити"
            />
            {isModalOpen && <FormDialog />}
            {isTaskFormVisible && <TaskForm />}
          </div>
        </div>
      ) : null}
      {children}
    </DialogProviderContext.Provider>
  );
};

export default DialogProvider;
