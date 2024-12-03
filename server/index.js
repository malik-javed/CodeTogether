const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);
require("dotenv").config();

// Enable CORS
app.use(cors());

const io = new Server(server);

const userSocketMap = {};

//getAllConnected Users
const getAllConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  console.log(`user joined ${socket.id}`);
  socket.on("join", ({ roomId, username }) => {
    // console.log("Room ID :",roomId);
    // console.log("Username :",username);
    userSocketMap[socket.id] = username;
    socket.join(roomId);

    //get info of all users connected at particular room Id
    const clients = getAllConnectedClients(roomId);
    // console.log(clients);
  });
});

app.use("/ping", (req, res) => {
  res.send("PONG");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, (req, res) => {
  console.log(`Server running on ${PORT}`);
});
