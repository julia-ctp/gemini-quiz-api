import { z } from "zod";
import { QUIZ_CATEGORIES, QUIZ_LEVELS } from "../types/constants";

export const QuizSchema = z.object({
  questions: z.array(
    z.object({
      id: z.number(),
      question: z.string(),
      options: z.array(z.string()).length(4),
      correctAnswer: z.string(),
    }),
  ),
});

export const QuizQuerySchema = z.object({
  category: z.enum(QUIZ_CATEGORIES),
  level: z.enum(QUIZ_LEVELS),
});

export type Quiz = z.infer<typeof QuizSchema>;
export type CachedQuiz = Quiz & { category: string; level: string };
export type QuizQueryType = z.infer<typeof QuizQuerySchema>;
