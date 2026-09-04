import express from "express";
import { uploadDocument, deleteDocument } from "../controllers/documentController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/:roomId/documents",
  authMiddleware,
  upload.single("file"),
  uploadDocument
);

router.delete(
  "/:roomId/documents/:documentId",
  authMiddleware,
  deleteDocument
);





export default router;