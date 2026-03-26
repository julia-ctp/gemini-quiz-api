import express from "express";
import quizRoutes from "./routes/quiz.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerConfig } from "./docs/swagger/swagger.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api/quiz", quizRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

export default app;
