import fs from "fs";
import path from "path";
import { Message } from "@shared/types/index";

type Messages = Record<string, Message[]>;

const messagesFilePath = path.resolve(__dirname, "../../db/messages.json");

export const loadMessages = (): Messages => {
  try {
    const data = fs.readFileSync(messagesFilePath, "utf8");
    return JSON.parse(data) as Messages;
  } catch (err) {
    console.error("Error loading messages:", err);
    return {};
  }
};

export const saveMessages = (messages: Messages): void => {
  try {
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error("Error saving messages:", err);
  }
};
