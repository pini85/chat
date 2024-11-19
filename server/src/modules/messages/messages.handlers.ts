import { Server, Socket } from "socket.io";
import { saveMessageToRoom } from "./messages.controller";
import { loadMessages } from "./message.model";
import {
  broadcastParticipantsUpdate,
  broadcastMessage,
  broadcastMessageStatus,
  getParticipantsForRoom,
  removeParticipantFromRoom,
} from "./messages.helpers";
import { Message } from "@shared/types";

interface JoinRoomPayload {
  room: string;
  username: string;
}

interface SendMessagePayload {
  room: string;
  message: Message;
}

// Handle user joining a room
export const handleJoinRoom = (io: Server, socket: Socket) => {
  socket.on("joinRoom", ({ room, username }: JoinRoomPayload) => {
    console.log("User joined room", { username, room });
    socket.join(room);

    const participants = getParticipantsForRoom(room);
    if (!participants.includes(username)) {
      participants.push(username);
    }

    broadcastParticipantsUpdate(io, room);
  });
};

// Handle marking a message as read
export const handleReadMessage = (io: Server, socket: Socket) => {
  socket.on("readMessage", ({ room, messageId, username }) => {
    console.log(`User ${username} read message ${messageId} in room ${room}`);

    const roomMessages = loadMessages()[room] || [];
    const message = roomMessages.find((msg) => msg.id === messageId);

    if (message) {
      if (!message.readBy.includes(username)) {
        message.readBy.push(username);
      }

      const nonAuthorParticipants = getParticipantsForRoom(room).filter(
        (participant) => participant !== message.user
      );

      message.allRead =
        nonAuthorParticipants.every((participant) =>
          message.readBy.includes(participant)
        ) || false;

      saveMessageToRoom(room, message);

      broadcastMessageStatus(
        io,
        room,
        messageId,
        message.readBy,
        message.allRead
      );
    }
  });
};

// Handle incoming messages
export const handleIncomingMessage = (io: Server, socket: Socket) => {
  socket.on("message", ({ room, message }: SendMessagePayload) => {
    console.log(`Message received in room ${room}:`, message);

    message.readBy = [];
    message.allRead = false;

    saveMessageToRoom(room, message);

    broadcastMessage(io, room, message);
  });
};

// Handle user leaving a room
export const handleLeaveRoom = (io: Server, socket: Socket) => {
  socket.on("leaveRoom", ({ room, username }: JoinRoomPayload) => {
    console.log("User leaving room", { username, room });
    socket.leave(room);

    removeParticipantFromRoom(room, username);
    broadcastParticipantsUpdate(io, room);
  });
};

// Handle user disconnection
export const handleDisconnection = (io: Server, socket: Socket) => {
  socket.on("disconnecting", () => {
    console.log("User disconnecting:", socket.id);

    const rooms = Array.from(socket.rooms).filter((room) => room !== socket.id);
    rooms.forEach((room) => {
      removeParticipantFromRoom(room, socket.id);
      broadcastParticipantsUpdate(io, room);
    });
  });
};
