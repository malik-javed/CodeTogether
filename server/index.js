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

    //notify all users that a new user has joined
    clients.forEach(({ socketId }) => {
      // sending all the information to the frontend to that to display the names of the user how are currently joined in and how as newly joined
      io.to(socketId).emit("joined", {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // sync code -> listening the code sync
  socket.on("code-change", ({ roomId, code }) => {
    socket.in(roomId).emit("code-change", { code });
  });

  // when new user join in between the user will get the previous all code
  socket.on("sync-code", ({ socketId, code }) => {
    io.to(socketId).emit("code-change", { code });
  });

  // leave room -> user disconnected
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

app.use("/ping", (req, res) => {
  res.send("PONG");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, (req, res) => {
  console.log(`Server running on ${PORT}`);
});
