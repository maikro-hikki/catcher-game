import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import { Score } from "../App";
import { NavLink } from "react-router-dom";
import Leaderboard from "../component/leaberboard/Leaderboard";

type ScoreInput = {
  username: string;
  score: number;
};

const Ranking = () => {
  // const { register, handleSubmit } = useForm<ScoreInput>();

  // const handleLogin = (form: ScoreInput) => {
  //   socket.emit("addingScore", form);
  // };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="h-[1050px] w-screen max-w-[1900px] flex flex-col flex-wrap relative">
        <div className="w-full flex justify-between">
          <div className="flex items-center">
            <img
              className="md:h-28 h-10 w-auto object-contain"
              src="src/assets/CATCH-GAME.png"
              alt="game title"
            ></img>
          </div>
          <div className="bg-blue-950 border-8 rounded-3xl border-blue-600 font-bold md:text-6xl text-xl md:px-10 md:py-6 px-7 py-4 shadow-2xl">
            <div className="aspect-w-1 aspect-h-1">
              <div className="aspect-content">Leaderboard</div>
            </div>
          </div>
          <div className="my-auto mr-4">
            <NavLink to="/">
              <div className="bg-green-900 hover:bg-green-700 text-2xl border-green-600 border-4 rounded-3xl px-3 py-2 shadow-2xl">
                🏠︎
              </div>
            </NavLink>
          </div>
        </div>
        <Leaderboard />
      </div>
    </div>
  );
};

export default Ranking;

{
  /* <div className="bg-white text-blue-950 mx-auto rounded-lg border dark:border-gray-700 shadow-lg w-64 h-64 mt-40">
      {/* <section className=""> 
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
      {/* </section> 
    </div> */
}
