export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);

      console.log(`Socket ${socket.id} joined room ${roomId}`);

      socket.to(roomId).emit("member-joined", {
        socketId: socket.id,
      });
    });

    socket.on("leave-room", (roomId) => {
      socket.leave(roomId);

      console.log(`Socket ${socket.id} left room ${roomId}`);

      socket.to(roomId).emit("member-left", {
        socketId: socket.id,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};