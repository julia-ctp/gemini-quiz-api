import z from "zod";

export const SubmissionSchema = z.object({
  quizId: z.uuid(),
  answers: z
    .array(
      z.object({
        questionId: z.number(),
        selectedOption: z.enum(["A", "B", "C", "D"]),
      }),
    )
    .refine((answers) => answers.length === 5, {
      message: "Todas as perguntas do quiz devem ser respondidas.",
    })
    .refine(
      (answers) => {
        const ids = answers.map((a) => a.questionId);
        return new Set(ids).size === ids.length;
      },
      {
        message:
          "Não é permitido enviar respostas duplicadas para a mesma pergunta.",
      },
    ),
});

export type Submission = z.infer<typeof SubmissionSchema>;
