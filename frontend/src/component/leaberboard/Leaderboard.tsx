import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useScore } from "../../context/useScore";

export interface Score {
  score: number;
  score_id: number;
  username: string;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const { scoreProfile } = useScore();
  const [scoreRank, setScoreRank] = useState<number | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    console.log("loading leaderboard");
    console.log(scoreProfile);

    socket.on("rankingSocket", (scores: Score[]) => {
      setLeaderboard(scores);
    });

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
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-blue-950 h-full flex flex-col pb-6 items-center justify-between rounded-3xl w-screen max-w-[1800px] md:border-[20px] border-8 border-blue-600">
        <div className="flex flex-col justify-around flex-1 w-full h-10 md:text-4xl text-xl">
          <div className="flex justify-center align-middle">
            <div className="min-w-24 flex justify-center  my-auto">
              Summary of:
              {scoreProfile ? scoreProfile.username : <div>--</div>}
            </div>
          </div>
          <div className="flex justify-around">
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
        </div>
        <div className=" flex justify-center items-center w-full">
          <div className="overflow-y-auto w-11/12 md:h-[700px] h-96">
            <table className="border-collapse md:text-2xl text-sm w-full">
              <thead className="sticky top-0">
                <tr>
                  <th className="border border-blue-600 bg-blue-900 py-2 px-4">
                    Rank
                  </th>
                  <th className="border border-blue-600 bg-blue-900 py-2 px-4">
                    Username
                  </th>
                  <th className="border border-blue-600 bg-blue-900 py-2 px-4">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((score, index) => (
                  <tr key={score.score_id}>
                    <td className="border border-blue-600 py-2 px-4 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-blue-600 py-2 px-4 text-center">
                      {score.username}
                    </td>
                    <td className="border border-blue-600 py-2 px-4 text-center">
                      {score.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
