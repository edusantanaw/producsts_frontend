import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export function useAuthContext() {
  return useContext(AuthContext);
}
