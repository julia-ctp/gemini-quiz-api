export const QUIZ_CATEGORIES = [
  "javascript",
  "typescript",
  "react",
  "html e css",
  "sql",
  "ingles para devs",
] as const;

export const QUIZ_LEVELS = ["iniciante", "intermediario", "avançado"] as const;

export type QuizCategory = (typeof QUIZ_CATEGORIES)[number];
export type QuizLevel = (typeof QUIZ_LEVELS)[number];
