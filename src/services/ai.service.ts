import { model } from "../config/gemini.js";
import { AnalysisResponseSchema } from "../schemas/analysis.schema.js";
import { QuizSchema, CachedQuiz } from "../schemas/quiz.schema.js";
import { Submission } from "../schemas/submission.schema.js";

export class AIService {
  async generateQuiz(category: string, level: string) {
    const prompt = `
      Você é um instrutor de programação. 
      Gere um quiz de nível "${level}" sobre "${category}".
      O quiz deve ter 5 perguntas de múltipla escolha.
      
      Retorne APENAS um JSON, SEM TEXTO ADICIONAL, no seguinte formato:
      {
        "questions": [
          {
            "id": 1,
            "question": "Texto da pergunta",
            "options": [
              "A. Texto da opção",
              "B. Texto da opção",
              "C. Texto da opção",
              "D. Texto da opção"
            ],
            "correctAnswer": "A"
          }
        ]
      }
      Importante: Cada item no array "options" DEVE começar com a letra correspondente (Ex: "A. ", "B. ").
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return QuizSchema.parse(JSON.parse(responseText));
  }

  async analyzeAnswers(cachedQuiz: CachedQuiz, userSubmission: Submission) {
    const contextForAI = cachedQuiz.questions.map((cachedQuestion) => {
      const userAnswer = userSubmission.answers.find(
        (answer) => answer.questionId === cachedQuestion.id,
      );

      const getIndex = (letter: string) => letter.charCodeAt(0) - 65;

      return {
        question: cachedQuestion.question,
        selectedOption:
          userAnswer &&
          cachedQuestion.options[getIndex(userAnswer.selectedOption)],
        correctAnswer:
          cachedQuestion.options[getIndex(cachedQuestion.correctAnswer)],
        isCorrect: userAnswer?.selectedOption === cachedQuestion.correctAnswer,
      };
    });

    const prompt = `
      Você é um avaliador técnico. Analise estas respostas de um quiz de ${cachedQuiz.category} (${cachedQuiz.level}).
    
      DADOS DAS RESPOSTAS:
      ${JSON.stringify(contextForAI)}

      INSTRUÇÕES DE RESPOSTA:
      Retorne um JSON que siga este formato:
      {
        "correctAnswersCount": (número de acertos),
        "totalQuestions": ${cachedQuiz.questions.length},
        "feedback": "Um parágrafo motivador e técnico com base no desempenho",
        "answers": [
          {
            "question": "texto da pergunta",
            "selectedOption": "texto da opção escolhida",
            "correctAnswer": "texto da opção correta",
            "isCorrect": boolean,
            "explanation": "Explicação de por que está certo ou errado, com linguagem clara"
          }
        ]
      }
      NÃO adicione markdown ou comentários fora do objeto JSON.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return AnalysisResponseSchema.parse(JSON.parse(responseText));
  }
}
