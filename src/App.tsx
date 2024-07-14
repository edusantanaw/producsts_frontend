import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import privateRoutes from "./routes/privateRoutes";
import publicRoutes from "./routes/publicRoutes";
import { useAuthContext } from "./shared/hooks/useAuthContext";
import { GlobalStyle } from "./shared/styles/global";

function App() {
  const [lastUserLocation, setUserLocation] = useState<string>("/");

  const { token } = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    const findPath = privateRoutes.find((e) => e.route === location.pathname);
    const isPathDiff = location.pathname != lastUserLocation;
    if (isPathDiff && findPath) setUserLocation(location.pathname);
  }, [location]);

  return (
    <>
      <GlobalStyle />
      <Routes>
        {privateRoutes.map((e) => (
          <Route
            path={e.route}
            element={token ? e.element : <Navigate to="/login" />}
            key={e.route}
          />
        ))}
        {publicRoutes.map((e) => (
          <Route
            path={e.route}
            element={!token ? e.element : <Navigate to={lastUserLocation} />}
            key={e.route}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
