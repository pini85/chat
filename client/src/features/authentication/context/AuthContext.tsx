import React, { createContext, useState, useEffect, ReactNode } from "react";
import { IUser, IAuthResponse } from "@shared/types/index";
import { IAuthContextType } from "./AuthContext.types";
import useCheckAuthStatus from "../hooks/queries/useCheckAuthStatus";

const defaultAuthValue: IAuthContextType = {
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext: React.Context<IAuthContextType> =
  createContext<IAuthContextType>(defaultAuthValue);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const login = (data: IAuthResponse) => {
    setUser(data?.user);
    localStorage.setItem("token", data?.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const { data, isLoading, isError } = useCheckAuthStatus();

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        login(data);
      } else if (isError) {
        logout();
      }
      setIsCheckingToken(false);
    }
  }, [data, isLoading, isError]);

  if (isCheckingToken) {
    return null;
  }
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
