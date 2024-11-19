import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createServer } from "http"; // Required to create the HTTP server
import { Server } from "socket.io";

dotenv.config();

import { handleSocketConnection } from "./modules/messages/messages.socket";
import { getMessagesByRoom } from "./modules/messages/messages.controller";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();
const httpServer = createServer(app); // Create the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins for development; adjust for production
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.get("/api/messages/:room", getMessagesByRoom);

// Socket.IO Connections
handleSocketConnection(io);

const PORT = process.env.PORT || 5001;

// Start the HTTP server instead of the Express app
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
