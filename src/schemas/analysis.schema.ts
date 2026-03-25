import z from "zod";

export const AnalysisResponseSchema = z.object({
  correctAnswersCount: z.number(),
  feedback: z.string(),
  totalQuestions: z.number(),
  answers: z.array(
    z.object({
      question: z.string(),
      selectedOption: z.string(),
      correctAnswer: z.string(),
      isCorrect: z.boolean(),
      explanation: z.string(),
    }),
  ),
});

export type AnalysisResponse = z.infer<typeof AnalysisResponseSchema>;
