import Room from "../models/Room.js";
import { generateQueryEmbedding } from "../services/embeddingService.js";
import { searchChunks } from "../services/pineconeService.js";
import generateAnswer from "../services/llmService.js";
import Question from "../models/Question.js";
import { getSocketIO } from "../sockets/socket.js";
const askQuestion = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({
        message: "Question is required",
      });
    }
    
    const room = await Room.findById(roomId);

if (!room) {
  return res.status(404).json({
    message: "Room not found",
  });
}


if (!room.members.includes(req.user)) {
  return res.status(403).json({
    message: "You are not a member of this room",
  });
}

const questionEmbedding = await generateQueryEmbedding(question);
const matches = await searchChunks(questionEmbedding, roomId);
const context = matches
  .map((match) => match.metadata.text)
  .join("\n\n");

const answer = await generateAnswer(context, question);
const newQuestion = await Question.create({
  room: roomId,
  askedBy: req.user,
  question,
  answer,
});



const io = getSocketIO();

io.to(roomId).emit("new-question", {
  question: newQuestion,
});


return res.status(200).json({
  message: "Question answered successfully",
  data: newQuestion,
});





    
  } catch (error) {
    res.status(500).json({
      message: "Error asking question",
      error: error.message,
    });
  }
};








const getQuestions = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    if (!room.members.includes(req.user)) {
      return res.status(403).json({
        message: "You are not a member of this room",
      });
    }

    const questions = await Question.find({
      room: roomId,
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      message: "Questions fetched successfully",
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching questions",
      error: error.message,
    });
  }
};

















export { askQuestion, getQuestions };