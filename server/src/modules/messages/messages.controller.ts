import { Request, Response } from "express";
import { loadMessages, saveMessages } from "./message.model";
import { Message } from "@shared/types";

export const getMessagesByRoom = (req: Request, res: Response) => {
  const roomId = req.params.room;
  const messages = loadMessages();
  const roomMessages = messages[roomId] || [];
  res.json(roomMessages);
};

export const saveMessageToRoom = (
  roomId: string,
  updatedMessages: Message | Message[]
) => {
  const messages = loadMessages(); // Load all messages
  const roomMessages = messages[roomId] || []; // Get the messages for the room, or an empty array

  // Ensure we are working with an array of messages
  const messagesToUpdate = Array.isArray(updatedMessages)
    ? updatedMessages
    : [updatedMessages];

  messagesToUpdate.forEach((updatedMessage) => {
    const messageIndex = roomMessages.findIndex(
      (msg) => msg.id === updatedMessage.id
    );

    if (messageIndex > -1) {
      // Update the existing message
      roomMessages[messageIndex] = updatedMessage;
    } else {
      // Add the message if it doesn't exist
      roomMessages.push(updatedMessage);
    }
  });

  // Save the updated room messages
  messages[roomId] = roomMessages;
  saveMessages(messages);
};
