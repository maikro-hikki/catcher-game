import express from "express";
import dot from "dotenv";
import { createTable, dropAllTable, dummyScore } from "./initializeDB";
import cors from "cors";
import {
  getRank,
  saveScore,
  top100Ranking,
} from "./controller/ScoreController";
import { NewScore } from "./types";

dot.config();
const app = express();
app.use(express.json());
const clientPort = process.env.CLIENT_PORT || 5173;

//allow access for specified origins
app.use(
  cors({
    origin: `http://localhost:${clientPort}`,
  })
);

async function main() {
  try {
    //removes any table in the database
    //can comment out if data needs to be persisted after shutting down the server
    await dropAllTable();

    //create the score table if it doesn't exist
    await createTable();

    //adds dummy data to the database
    //can comment out if no dummy data needed
    await dummyScore();
  } catch (error) {
    console.error("Error:", error);
  }
}

const PORT = process.env.APP_PORT || 3000;

main().then(() => {
  //start the server (on port 3000 by default)
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  //connect the socket to communicate and exchange data between server and client
  const io = require("socket.io")(server, {
    cors: {
      origin: `http://localhost:${clientPort}`,
    },
  });

  //backend socket API definitions
  io.on("connection", async (socket) => {
    //logs a new connection to the console
    console.log("connected socket id ", socket.id);

    //sends top 100 score data to the client
    socket.emit("rankingSocket", await top100Ranking());

    //recieves a new score data from the client and then
    //sends back the new saved score object back to the sender client
    //the top 100 score data also gets resent to all other clients
    //who are currently connected to get the most updated top 100 score
    //in real time
    socket.on("addingScore", async (scoreData: NewScore) => {
      const savedData = await saveScore(scoreData);
      socket.emit("savedScore", savedData);
      io.emit("rankingSocket", await top100Ranking());
    });

    //recieve the score id from the client and send back
    //the rank of the particular score
    socket.on("getRank", async (score_id: number) => {
      const rank = await getRank(score_id);
      socket.emit("rankCallBack", rank);
    });

    //logs a message to the console if a client disconnected
    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });
});
