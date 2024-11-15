import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <>
      <div className="container">
        <h3 className="menu">MENU</h3>
        <div className="buttons-container">
          <NavLink to="tasks/all" className="sidebar__item-button">
            Go to your tasks
          </NavLink>
          <NavLink to="random" className="sidebar__item-button">
            Random Task
          </NavLink>
          <NavLink to="about" className="sidebar__item-button">
            About Me
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
