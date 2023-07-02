const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const users = [];
let cards = [];

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data.room);

    users[socket.id] = {
      room: data.room,
      name: data.name,
    };

    io.to(data.room).emit("joined", data);
  });

  socket.on("sendCard", (card) => {
    const user = users[socket.id];

    if (cards.some((c) => c.ownerID === socket.id)) {
      const userCardIndex = cards.findIndex((c) => c.ownerID === socket.id);
      cards[userCardIndex].point = card.point;
    } else {
      cards.push({ ...card, ownerID: socket.id });
    }

    io.to(user.room).emit("sendedCards", cards);
  });

  socket.on("endGame", (data) => {
    cards = [];
    io.to(users[socket.id].room).emit("endGame", data);
  });

  socket.on("revealCard", (data) => {
    io.to(users[socket.id].room).emit("revealCard", data);
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
  });
});

const port = 5000;

server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
