import Home from "../pages/home";
import Log from "../pages/logs";

export type IRoute = {
  element: JSX.Element;
  route: string;
};

export default [
  {
    route: "/",
    element: <Home />,
  },
  {
    route: "/log",
    element: <Log />,
  },
] as IRoute[];
