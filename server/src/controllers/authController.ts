import { Request, Response } from "express";
import { generateToken, verifyToken } from "../utils/jwtUtils";
import { IUser } from "@shared/types/index";

const hardcodedUsers: IUser[] = [
  {
    id: "1",
    name: "Timmy",
    username: "user1",
    password: "123",
  },
  {
    id: "2",
    name: "Johnny",
    username: "user2",
    password: "123",
  },
];

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = hardcodedUsers.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Best practice would be a shorter life span and a blacklist for the token.
  // Also should do a refresh token for better UX on the client side.
  // In the end, using a third party like Auth0 or Cognito is recommended.
  const token = generateToken(user);
  const { name, id } = user;
  res.json({ user: { name, id }, token });
};

export const logout = (req: Request, res: Response) => {
  res.json({ message: "Logged out successfully" });
};

export const me = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    const { user } = decoded;

    res.json({ user, token });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
