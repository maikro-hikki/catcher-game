import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import { Score } from "../App";

type ScoreInput = {
  username: string;
  score: number;
};

const socket = io("http://localhost:3000");

const Ranking = () => {
  const [lead, setLead] = useState<Score[]>([]);
  const { register, handleSubmit } = useForm<ScoreInput>();

  const handleLogin = (form: ScoreInput) => {
    socket.emit("addingScore", form);
  };

  useEffect(() => {
    socket.on("rankingSocket", (scores: Score[]) => {
      setLead(scores);
      console.log("cardioooooo");
      console.log(scores);
    });
    socket.on("test", (data: string) => {
      console.log("test");
      console.log(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("topScores");
    };
  }, []);

  return (
    <div className="bg-white text-blue-950 mx-auto rounded-lg border dark:border-gray-700 shadow-lg w-64 h-64 mt-40">
      {/* <section className=""> */}
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
        ></input>
        <input
          className="dark:bg-gray-700 bg-white"
          type="number"
          placeholder="Password"
          {...register("score")}
        ></input>
        <button type="submit" className="text=gray-950 dark:text-white">
          Login
        </button>
      </form>
      <div>
        {lead.map((score, index) => (
          <div key={index}>
            {score.username}: {score.score}
          </div>
        ))}
      </div>
      {/* </section> */}
    </div>
  );
};

export default Ranking;
