import Document from "../models/Documents.js";
import Room from "../models/Room.js";
import extractText from "../services/pdfProcessor.js";
import chunkText from "../services/chunkService.js";
import { generateEmbeddings } from "../services/embeddingService.js";
import {
  storeChunks,
  deleteDocumentChunks
} from "../services/pineconeService.js";
import { getSocketIO } from "../sockets/socket.js";





// Upload document
const uploadDocument = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Check room
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // Check membership
    if (!room.members.includes(req.user)) {
      return res.status(403).json({
        message: "You are not a member of this room",
      });
    }

    // Check file
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF",
      });
    }

    const document = await Document.create({
      name: req.file.originalname,
      room: roomId,
      uploadedBy: req.user,
    });


     





const text = await extractText(req.file.buffer);

const chunks = await chunkText(text);

const embeddings = await generateEmbeddings(chunks);

await storeChunks(
  chunks,
  embeddings,
  roomId,
  document._id
);



const io = getSocketIO();

io.to(roomId).emit("document-uploaded", {
  document,
});






    res.status(201).json({
      message: "PDF uploaded successfully",
      document,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error uploading PDF",
      error: error.message,
    });
  }
};


// Delete document
const deleteDocument = async (req, res) => {
  try {
    const { roomId, documentId } = req.params;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // Check membership
    if (!room.members.includes(req.user)) {
      return res.status(403).json({
        message: "You are not a member of this room",
      });
    }

    const document = await Document.findOne({
      _id: documentId,
      room: roomId,
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

   await deleteDocumentChunks(documentId);

   await Document.findByIdAndDelete(documentId);
   const io = getSocketIO();

io.to(roomId).emit("document-deleted", {
  documentId,
});

    res.status(200).json({
      message: "PDF deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting PDF",
      error: error.message,
    });
  }
};


export { uploadDocument, deleteDocument };