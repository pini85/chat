import { Server } from "socket.io";
import { saveMessageToRoom } from "./messages.controller";
import { loadMessages } from "./message.model";
import { Message } from "@shared/types";

const participants: Record<string, string[]> = {}; // Room ID -> User list

// Helper: Get participants for a room
export const getParticipantsForRoom = (room: string): string[] => {
  if (!participants[room]) {
    participants[room] = [];
  }
  return participants[room];
};

// Helper: Remove a participant from a room
export const removeParticipantFromRoom = (room: string, username: string) => {
  if (participants[room]) {
    participants[room] = participants[room].filter((user) => user !== username);

    // If the room is empty, remove it from the participants record
    if (participants[room].length === 0) {
      delete participants[room];
    }
  }
};

// Helper: Broadcast participants update
export const broadcastParticipantsUpdate = (io: Server, room: string) => {
  io.to(room).emit("participantsUpdate", participants[room] || []);
};

// Helper: Broadcast a new message
export const broadcastMessage = (
  io: Server,
  room: string,
  message: Message
) => {
  io.to(room).emit("message", message);
};

// Helper: Broadcast message status update (e.g., read status)
export const broadcastMessageStatus = (
  io: Server,
  room: string,
  messageId: string,
  readBy: string[],
  allRead: boolean
) => {
  io.to(room).emit("updateMessageStatus", {
    messageId,
    readBy,
    allRead,
  });
};

// Helper: Load messages for a room
export const getMessagesForRoom = (room: string): Message[] => {
  const allMessages = loadMessages();
  return allMessages[room] || [];
};

// Helper: Save or update a message in the room
export const saveOrUpdateMessageInRoom = (room: string, message: Message) => {
  const allMessages = loadMessages();
  const roomMessages = allMessages[room] || [];

  const existingMessageIndex = roomMessages.findIndex(
    (msg) => msg.id === message.id
  );

  if (existingMessageIndex !== -1) {
    // Update the existing message
    roomMessages[existingMessageIndex] = message;
  } else {
    // Add new message
    roomMessages.push(message);
  }

  saveMessageToRoom(room, roomMessages);
};
