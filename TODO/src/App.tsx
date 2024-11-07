import { ToastContainer } from "react-toastify";
import "./App.scss";
import Avatar from "./components/Avatar/Avatar";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import MessageProvider from "./components/MessageProvider/MessageProvider";
import DialogProvider from "./components/DialogProvider/DialogProvider"; //

const App = () => {
  return (
    <DialogProvider>
      <MessageProvider>
        <div className="header_container">
          <Avatar />
          <Login />
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
    </DialogProvider>
  );
};

export default App;
