import express, { NextFunction, Request, Response } from "express";
import dot from "dotenv";
import { createTable, dropAllTable, dummyScore } from "./initializeDB";
import ScoreRoute from "./route/ScoreRoute";

dot.config();
const app = express();
app.use(express.json());

async function main() {
  try {
    await dropAllTable();
    await createTable();
    await dummyScore();
  } catch (error) {
    console.error("Error:", error);
  }
}

app.use("/api/v1", ScoreRoute);

const PORT = process.env.APP_PORT || 4000;

main().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
