import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Score } from "../component/leaberboard/Leaderboard";
import { useScore } from "../context/useScore";

type UsernameInput = {
  username: string;
};

type Props = {
  score: number;
};

export type ScoreInput = {
  username: string;
  score: number;
};

const EndGame = ({ score }: Props) => {
  const { register, handleSubmit } = useForm<UsernameInput>();
  const navigate = useNavigate();
  const { saveCurrentScore } = useScore();
  const serverPort = import.meta.env.VITE_SERVER_PORT || 3000;
  const socket = io(`http://localhost:${serverPort}`);

  const scoreSubmit = (form: UsernameInput) => {
    const scoreInput: ScoreInput = { username: form.username, score: score };
    socket.emit("addingScore", scoreInput);
    socket.on("savedScore", (savedScore: Score) => {
      saveCurrentScore(savedScore);
    });
    navigate("/summary");
  };
  return (
    <>
      <div className="md:text-4xl text-xl">You Scored {score} points</div>
      <form
        onSubmit={handleSubmit(scoreSubmit)}
        className="flex flex-col md:gap-8 gap-6"
      >
        <input
          className="bg-red-950 rounded-lg px-4 text-center md:text-4xl text-xl"
          type="text"
          placeholder="Type in a name"
          {...register("username")}
        ></input>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-red-700 hover:bg-red-600 md:text-4xl text-xl rounded-3xl border-4 border-red-500 px-4"
          >
            Submit Score
          </button>
        </div>
      </form>
    </>
  );
};

export default EndGame;
