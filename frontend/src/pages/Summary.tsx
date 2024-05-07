import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useScore } from "../context/useScore";
import { NavLink, useNavigate } from "react-router-dom";

const Play = () => {
  const { scoreProfile } = useScore();
  const [scoreRank, setScoreRank] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const serverPort = import.meta.env.VITE_SERVER_PORT || 3000;
    const socket = io(`http://localhost:${serverPort}`);

    if (scoreProfile) {
      socket.emit("getRank", scoreProfile.score_id);
      socket.on("rankCallBack", (rank: { rank: number }) => {
        setScoreRank(rank.rank);
      });
    }

    return () => {
      socket.close();
    };
  }, [scoreProfile]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="h-[1050px] w-screen max-w-[1900px] flex flex-col relative">
        <div className="sticky w-full flex justify-between">
          <div>
            <img
              className="md:h-28 h-12 w-auto object-contain"
              src="src/assets/CATCH-GAME.png"
              alt="game title"
            ></img>
          </div>
          <div className="md:w-32 w-14 md:mx-10 mx-2 flex flex-col justify-center">
            <NavLink to="/" className="mx-auto">
              <div className="bg-green-900 hover:bg-green-700 md:text-2xl border-green-600 border-4 rounded-3xl px-3 py-2 shadow-2xl">
                🏠︎
              </div>
            </NavLink>
          </div>
        </div>
        <div className="my-auto mx-auto flex flex-col md:text-2xl text-lg md:gap-10 gap-6 px-2 md:py-8 py-4 w-11/12 max-w-[1000px] border-4 rounded-3xl bg-blue-900 border-blue-600 items-center">
          <div>Score Summary</div>
          <div className="flex flex-col gap-4 flex-1 w-full h-10 md:text-4xl text-xl">
            <div className="flex justify-center align-middle">
              <div className="min-w-24 flex justify-center  my-auto">
                Username:
                {scoreProfile ? scoreProfile.username : <div>--</div>}
              </div>
            </div>
            <div className="flex justify-center my-auto">
              <div className="min-w-24 flex justify-center my-auto">
                Score:
                {scoreProfile ? scoreProfile.score : <div>---</div>}
              </div>
            </div>
            <div className="flex justify-center my-auto">
              <div className="min-w-24 flex justify-center my-auto">
                Rank: {scoreProfile ? scoreRank : <div>---</div>}
              </div>
            </div>
          </div>
          <button
            className="bg-blue-900 border-4 hover:bg-blue-700 rounded-3xl border-blue-600 md:text-4xl text-xl md:px-6 md:py-3 px-4 py-2 shadow-2xl"
            onClick={() => navigate("/ranking")}
          >
            Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Play;
