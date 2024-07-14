import Home from "../pages/home";

export type IRoute = {
  element: JSX.Element;
  route: string;
};

export default [
  {
    route: "/",
    element: <Home />,
  },
] as IRoute[];
