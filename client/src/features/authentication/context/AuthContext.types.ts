import { IAuthResponse, IUser } from "@shared/types/index";
export interface IAuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (userData: IAuthResponse) => void;
  logout: () => void;
}
