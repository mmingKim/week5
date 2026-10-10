"use strict";

const socketIO = require("socket.io");
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(port, () => {
  console.log("Listening on port: " + port);
});

const io = socketIO(server);

let growth = 0;

io.on("connection", (socket) => {
  console.log("Participant connected: " + socket.id);

  socket.emit("plant state", growth);

  socket.on("water plant", () => {
    growth = Math.min(growth + 1, 10);

    io.emit("plant state", growth);
  });

  socket.on("disconnect", () => {
    console.log("Participant disconnected: " + socket.id);
  });
});