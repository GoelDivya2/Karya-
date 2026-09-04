import express from "express";
import {
  askQuestion,
  getQuestions,
} from "../controllers/questionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";




const router = express.Router();

router.post(
  "/:roomId/questions",
  authMiddleware,
  askQuestion
);


router.get(
  "/:roomId/questions",
  authMiddleware,
  getQuestions
);

export default router;