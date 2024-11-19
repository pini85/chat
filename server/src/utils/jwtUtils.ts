import jwt from "jsonwebtoken";
import { IUser, JwtPayload } from "@shared/types/index";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const generateToken = (user: IUser) => {
  const { name, id } = user;
  return jwt.sign({ user: { name, id } }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
