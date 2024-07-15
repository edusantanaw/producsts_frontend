import Home from "../pages/home";
import Log from "../pages/logs/index.tsx";

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
    route: "/logs",
    element: <Log />,
  },
] as IRoute[];
