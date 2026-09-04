import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);

  socket.emit("join-room", "6a9482019ddab051c775bb86");
});

socket.on("member-joined", (data) => {
  console.log("Member joined:", data);
});