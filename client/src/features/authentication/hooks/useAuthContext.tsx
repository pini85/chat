import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { IAuthContextType } from "../context/AuthContext.types";
export const useAuthContext = (): IAuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
