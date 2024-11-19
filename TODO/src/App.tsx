import { ToastContainer } from "react-toastify";
import "./App.scss";
import Avatar from "./components/Avatar/Avatar";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import MessageProvider from "./components/MessageProvider/MessageProvider";
import DialogComponent from "./components/DialogProvider/DialogComponent";
import DialogProvider from "./components/DialogProvider/DialogProvider";
import { useEffect, useState } from "react";

export interface UserInterface {
  firstName: string;
  lastName: string;
}

const App = () => {
  const [user, setUser] = useState<UserInterface>({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    setUser({ firstName, lastName });
  }, []);

  const useResize = () => {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {
      const getSize = () => setSize([window.innerWidth, window.innerHeight]);
      getSize();
      window.addEventListener("resize", getSize);
      return () => window.removeEventListener("resize", getSize);
    }, []);

    return size;
  };

  const size = useResize();

  return (
    <DialogProvider>
      <MessageProvider>
        <DialogComponent />
        <div className="header_container">
          <Avatar user={user} />
          <Login setUser={setUser} />
        </div>

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
      <div>
        <div>window.width: {size[0]}</div>
        <div>window.height: {size[1]}</div>
      </div>
    </DialogProvider>
  );
};

export default App;
