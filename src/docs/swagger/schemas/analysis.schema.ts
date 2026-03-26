export const analysisSchema = {
  type: "object",
  properties: {
    correctAnswersCount: { type: "number" },
    totalQuestions: { type: "number" },
    feedback: { type: "string" },
    answers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          selectedOption: { type: "string" },
          correctAnswer: { type: "string" },
          isCorrect: { type: "boolean" },
          explanation: { type: "string" },
        },
      },
    },
  },
};
