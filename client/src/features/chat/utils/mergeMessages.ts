import { Message } from "@shared/types";
//Just incase we have a message that is already in the cache, we want to make sure we don't add it again
export const mergeMessages = (
  cachedMessages: Message[],
  newMessages: Message[]
): Message[] => {
  const existingMessageIds = new Set(cachedMessages.map((msg) => msg.id));
  const uniqueNewMessages = newMessages.filter(
    (msg) => !existingMessageIds.has(msg.id)
  );
  return [...cachedMessages, ...uniqueNewMessages];
};
