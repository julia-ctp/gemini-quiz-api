import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { quizCache } from "../config/cache.js";
import { AIService } from "../services/ai.service.js";
import { CachedQuiz, QuizQuerySchema } from "../schemas/quiz.schema.js";
import { z, ZodError } from "zod";
import { SubmissionSchema } from "../schemas/submission.schema.js";

const aiService = new AIService();

export class QuizController {
  async generate(req: Request, res: Response) {
    try {
      const { category, level } = QuizQuerySchema.parse(req.query);

      const quiz = await aiService.generateQuiz(category, level);
      const quizId = uuidv4();
      quizCache.set(quizId, { ...quiz, category, level });

      const sanitizedQuestions = quiz.questions.map(
        ({ correctAnswer, ...rest }) => rest,
      );

      return res.status(201).json({
        quizId,
        category,
        level,
        questions: sanitizedQuestions,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Parâmetros inválidos",
          details: z.treeifyError(error),
        });
      }

      console.error("Erro ao gerar quiz:", error);
      return res.status(500).json({ error: "Falha ao gerar o quiz." });
    }
  }

  async submitAnswers(req: Request, res: Response) {
    try {
      const submission = SubmissionSchema.parse(req.body);

      const cachedData = quizCache.get<CachedQuiz>(submission.quizId);

      if (!cachedData) {
        return res.status(404).json({
          error:
            "Sessão de quiz expirada ou não encontrada. Gere um novo quiz.",
        });
      }

      const analysis = await aiService.analyzeAnswers(cachedData, submission);
      quizCache.del(submission.quizId);

      return res.json(analysis);
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ error: "Dados inválidos", details: z.treeifyError(error) });
      }

      console.error("Erro na submissão:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}
