import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:5001"; // Your server URL

// Initialize socket connection
const socket = io(SERVER_URL, {
  autoConnect: false, // Delay connection until explicitly called
});

// Export the socket instance
export default socket;
