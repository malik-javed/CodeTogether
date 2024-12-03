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

io.on("connection", (socket) => {
  console.log(`user joined ${socket.id}`);
  socket.on("join", ({ roomId, username }) => {
    // console.log("Room ID :",roomId);
    // console.log("Username :",username);
  });
});

app.use("/ping", (req, res) => {
  res.send("PONG");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, (req, res) => {
  console.log(`Server running on ${PORT}`);
});
