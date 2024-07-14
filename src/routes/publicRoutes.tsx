import Login from "../pages/login";
import Signup from "../pages/login/Signup";
import { IRoute } from "./privateRoutes";

export default [
  {
    route: "/login",
    element: <Login />,
  },
  {
    route: "/signup",
    element: <Signup />,
  },
] as IRoute[];
