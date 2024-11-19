import { Server, Socket } from "socket.io";
import {
  handleJoinRoom,
  handleReadMessage,
  handleIncomingMessage,
  handleLeaveRoom,
  handleDisconnection,
} from "./messages.handlers";

export const handleSocketConnection = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    handleJoinRoom(io, socket);
    handleReadMessage(io, socket);
    handleIncomingMessage(io, socket);
    handleLeaveRoom(io, socket);
    handleDisconnection(io, socket);
  });
};
