import { quizPaths } from "./paths/quiz.path.js";
import { quizSchema } from "./schemas/quiz.schema.js";
import { analysisSchema } from "./schemas/analysis.schema.js";
import { submissionSchema } from "./schemas/submission.schema.js";

export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "Gemini Quiz API",
    version: "1.0.0",
    description:
      "API de geração e correção de quizes técnicos utilizando Google Gemini AI",
  },
  servers: [{ url: "http://localhost:3000", description: "Servidor Local" }],
  paths: {
    ...quizPaths,
  },
  components: {
    schemas: {
      Quiz: quizSchema,
      Submission: submissionSchema,
      Analysis: analysisSchema,
    },
  },
};
