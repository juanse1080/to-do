import { createBrowserRouter } from "react-router-dom";
import ListTasks from "./ListTasks";
import Login from "./Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListTasks />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
