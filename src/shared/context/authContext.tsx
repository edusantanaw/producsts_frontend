import { createContext, useLayoutEffect, useState } from "react";
import { loginService } from "../../services/auth";
import { TOKEN_KEY } from "../constants";

type IAuthContext = {
  token: string | null;
  error: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext({} as IAuthContext);

interface props {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: props) => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogin(email: string, password: string) {
    if (error) setError(null);
    setLoading(() => true);
    try {
      const response = await loginService(email, password);
      setToken(response.token);
      localStorage.setItem(TOKEN_KEY, response.token);
    } catch (error) {
      const { message } = error as Error;
      setError(message);
    }
    setLoading(() => false);
  }

  useLayoutEffect(() => {
    const maybeToken = localStorage.getItem(TOKEN_KEY);
    if (maybeToken) setToken(maybeToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, loading, handleLogin, error }}>
      {children}
    </AuthContext.Provider>
  );
};
