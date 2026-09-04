import Room from "../models/Room.js";

const createRoom = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Room name is required",
      });
    }

    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const room = await Room.create({
      name,
      roomCode,
      owner: req.user,
      members: [req.user],
    });

    res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create room",
      error: error.message,
    });
  }
};


const joinRoom = async (req, res) => {
  try {
    const { roomCode } = req.body;

    if (!roomCode) {
      return res.status(400).json({
        message: "Room code is required",
      });
    }

    const room = await Room.findOne({ roomCode });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    if (room.members.includes(req.user)) {
      return res.status(400).json({
        message: "You are already a member of this room",
      });
    }

    room.members.push(req.user);

    await room.save();

    res.status(200).json({
      message: "Joined room successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to join room",
      error: error.message,
    });
  }
};




const getMyRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      members: req.user,
    });

    res.status(200).json({
      message: "Rooms fetched successfully",
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch rooms",
      error: error.message,
    });
  }
};



const getRoomDetails = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId)
      .populate("owner", "name email")
      .populate("members", "name email");

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    const isMember = room.members.some(
      (member) => member._id.toString() === req.user.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "You are not a member of this room",
      });
    }

    res.status(200).json({
      message: "Room details fetched successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch room details",
      error: error.message,
    });
  }
};



const leaveRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    const isMember = room.members.some(
      (member) => member.toString() === req.user.toString()
    );

    if (!isMember) {
      return res.status(400).json({
        message: "You are not a member of this room",
      });
    }

    room.members = room.members.filter(
      (member) => member.toString() !== req.user.toString()
    );

    // If no members are left, delete the room
    if (room.members.length === 0) {
      await Room.findByIdAndDelete(roomId);

      return res.status(200).json({
        message: "You left the room and the room was deleted",
      });
    }

    await room.save();

    res.status(200).json({
      message: "Left room successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to leave room",
      error: error.message,
    });
  }
};





export {
  createRoom,
  joinRoom,
  getMyRooms,
  getRoomDetails,
  leaveRoom,
};