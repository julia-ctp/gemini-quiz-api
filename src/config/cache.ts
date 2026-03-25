import NodeCache from "node-cache";

export const quizCache = new NodeCache({ stdTTL: 3600 });
