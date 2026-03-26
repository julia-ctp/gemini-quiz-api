import { QUIZ_CATEGORIES, QUIZ_LEVELS } from "../../../types/constants.js";

export const quizPaths = {
  "/api/quiz/generate": {
    get: {
      tags: ["Quiz"],
      summary: "Gera um novo quiz",
      parameters: [
        {
          name: "category",
          in: "query",
          required: true,
          schema: { type: "string", enum: QUIZ_CATEGORIES },
        },
        {
          name: "level",
          in: "query",
          required: true,
          schema: { type: "string", enum: QUIZ_LEVELS },
        },
      ],
      responses: {
        201: {
          description: "Quiz gerado com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Quiz" },
            },
          },
        },
        400: { description: "Parâmetros inválidos" },
      },
    },
  },

  "/api/quiz/submit": {
    post: {
      tags: ["Quiz"],
      summary: "Envia as respostas do quiz para análise",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Submission" },
          },
        },
      },
      responses: {
        200: {
          description: "Análise processada com sucesso",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Analysis" },
            },
          },
        },
        404: { description: "Sessão de quiz expirada ou não encontrada" },
        400: { description: "Dados de submissão inválidos" },
      },
    },
  },
};
