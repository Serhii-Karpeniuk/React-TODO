import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import Avatar from "./components/Avatar/Avatar";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Modal from "./components/Modal/Modal";
import { Outlet } from "react-router-dom";
import MessageProvider from "./components/MessageProvider/MessageProvider";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submittedData, setSubmittedData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleCloseModal = (): void => {
    setModalOpen(false);
  };

  const handleSubmit = (firstName: string, lastName: string): void => {
    setSubmittedData({ firstName, lastName });
    setFirstName("");
    setLastName("");
    setModalOpen(false);
  };

  return (
    <MessageProvider>
      <div className="header_container">
        <Avatar
          firstName={submittedData.firstName}
          lastName={submittedData.lastName}
        />
        <Login onLoginClick={() => setModalOpen(true)} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        onSubmit={handleSubmit}
      />
      <div className="sidebar_container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="task_container">
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </MessageProvider>
  );
};

export default App;

// модалка через контекст
