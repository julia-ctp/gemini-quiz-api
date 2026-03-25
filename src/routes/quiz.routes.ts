import { Router } from "express";
import { QuizController } from "../controllers/quiz.controller.js";

const router = Router();
const quizController = new QuizController();

router.get("/generate", quizController.generate);
router.post("/submit", quizController.submitAnswers);

export default router;
