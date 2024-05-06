import express, { NextFunction, Request, Response } from "express";
import dot from "dotenv";
import { createTable, dropAllTable, dummyScore } from "./initializeDB";
// import ScoreRoute from "./route/ScoreRoute";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import {
  getRank,
  saveScore,
  top100Ranking,
} from "./controller/ScoreController";
import { NewScore } from "./types";
import { createScore } from "./repository/ScoreRepo";

dot.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

async function main() {
  try {
    await dropAllTable();
    await createTable();
    await dummyScore();
  } catch (error) {
    console.error("Error:", error);
  }
}

// app.use("/api/v1", ScoreRoute);

const PORT = process.env.APP_PORT || 4000;

main().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", async (socket) => {
    console.log("connected socket id ", socket.id);
    socket.emit("rankingSocket", await top100Ranking());
    socket.on("addingScore", async (scoreData: NewScore) => {
      const savedData = await saveScore(scoreData);
      socket.emit("savedScore", savedData);
      io.emit("rankingSocket", await top100Ranking());
    });
    socket.on("getRank", async (score_id: number) => {
      const rank = await getRank(score_id);
      socket.emit("rankCallBack", rank);
    });
    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });
});
