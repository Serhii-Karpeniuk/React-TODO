import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import TaskContainer from "./components/TaskContainer/TaskContainer.tsx";
import AllTasks from "./pages/AllTasks/AllTasks.tsx";
import OpenTasks from "./pages/OpenTask/OpenTasks.tsx";
import ClosedTasks from "./pages/ClosedTask/ClosedTasks.tsx";
import AboutMe from "./pages/AboutMe/AboutMe.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Navigate to="tasks" />,
      },
      {
        path: "tasks",
        element: <TaskContainer />,
        children: [
          {
            path: "all",
            element: <AllTasks />,
          },
          {
            path: "open",
            element: <OpenTasks />,
          },
          {
            path: "closed",
            element: <ClosedTasks />,
          },
        ],
      },
      {
        path: "about",
        element: <AboutMe />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
