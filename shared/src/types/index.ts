export interface IUser {
  id: string;
  name: string;
  username?: string;
  password?: string;
}
export interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  readBy: string[];
  allRead: boolean;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}

export interface JwtPayload {
  user: IUser;
  iat: number;
  exp: number;
}
