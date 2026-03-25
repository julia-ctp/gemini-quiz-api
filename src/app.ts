import express from "express";
import quizRoutes from "./routes/quiz.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/quiz", quizRoutes);

export default app;
