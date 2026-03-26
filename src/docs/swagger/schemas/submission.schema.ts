export const submissionSchema = {
  type: "object",
  required: ["quizId", "answers"],
  properties: {
    quizId: { type: "string", format: "uuid" },
    answers: {
      type: "array",
      minItems: 5,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          questionId: { type: "number" },
          selectedOption: { type: "string", enum: ["A", "B", "C", "D"] },
        },
      },
    },
  },
};
