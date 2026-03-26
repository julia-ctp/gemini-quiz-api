import { QUIZ_CATEGORIES, QUIZ_LEVELS } from "../../../types/constants.js";

export const quizSchema = {
  type: "object",
  properties: {
    quizId: { type: "string", format: "uuid" },
    category: { type: "string", enum: QUIZ_CATEGORIES },
    level: { type: "string", enum: QUIZ_LEVELS },
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          question: { type: "string" },
          options: {
            type: "array",
            items: { type: "string" },
            minItems: 4,
            maxItems: 4,
          },
        },
      },
    },
  },
};
