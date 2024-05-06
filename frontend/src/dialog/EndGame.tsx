import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

type UsernameInput = {
  username: string;
};

type Props = {
  score: number;
};

type ScoreInput = {
  username: string;
  score: number;
};

const EndGame = ({ score }: Props) => {
  const { register, handleSubmit } = useForm<UsernameInput>();
  const navigate = useNavigate();

  const handleLogin = (form: UsernameInput) => {
    const scoreInput: ScoreInput = { username: form.username, score: score };
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      socket.emit("addingScore", scoreInput);
    });
    navigate("/ranking");
  };
  return (
    <>
      <div>You Scored {score} points</div>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-10"
      >
        <input
          className="bg-red-950 rounded-lg px-4 text-center"
          type="text"
          placeholder="Username"
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
