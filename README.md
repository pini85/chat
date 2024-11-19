Let's Chat
Let’s Chat is a real-time group chat application where users can join predefined chat groups, send messages, and see read receipts for their messages.

🚀 Quick Start
1. Clone the Repository
bash
Copy code
git clone https://github.com/pini85/chat.git
cd chat
2. Install Dependencies
bash
Copy code
npm install
3. Setup Environment Variables
Navigate to the server/ directory, copy the .env.example file, and rename it to .env:

bash
Copy code
cd server
cp .env.example .env
cd ..
No .env is required for the client.

4. Start the Application
Run the following command to start both the client and server concurrently:

bash
Copy code
npm start
The client will run at: http://localhost:5173/
The server will run at: http://localhost:5001/
5. Login to the App
You can log in using the following credentials:

Username: user1, Password: 123
Username: user2, Password: 123
After logging in, you can join group chats and start messaging!

✨ Features
Group Chats
Join Group Chats: Users can join predefined groups and start chatting.
Real-time Messaging: Messages are updated instantly across all users in the group.
Read Receipts
Single Tick: Message sent successfully.
Double Gray Ticks: Message read by at least one user.
Double Blue Ticks: Message read by all users in the group.
User Authentication
Secure login system with predefined users.
Optimized Monorepo
Shared utilities between client and server ensure consistency and maintainability.
📂 Project Structure
This project uses npm workspaces to manage the following directories:

client/: The frontend of the application, built with React and Vite.
server/: The backend of the application, built with Express and Socket.IO.
shared/: Shared TypeScript utilities and types for consistency between the client and server.
🛠️ Scripts
Common Commands
Install Dependencies: npm install
Start Application: npm start
Build All Workspaces: npm run build
Individual Workspaces
Start Server: npm run start:server
Start Client: npm run start:client
Build Server: npm run build:server
Build Client: npm run build:client
Build Shared: npm run build:shared
Notes
Make sure ports 5173 (client) and 5001 (server) are available on your machine.
The application is fully functional out of the box—just clone, install dependencies, and start it.