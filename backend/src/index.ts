import express, { NextFunction, Request, Response } from "express";
import dot from "dotenv";
import { createTable, dropAllTable, dummyScore } from "./initializeDB";
import ScoreRoute from "./route/ScoreRoute";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { top100Ranking, top100Ranking2 } from "./controller/ScoreController";
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

app.use("/api/v1", ScoreRoute);

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
    socket.emit("rankingSocket", await top100Ranking2());
    socket.emit("test", "top100Ranking2()");
    socket.on("addingScore", async (scoreData: NewScore) => {
      await createScore(scoreData);
      console.log("Received new score:", scoreData);
      io.emit("rankingSocket", await top100Ranking2());
    });
    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });
});
