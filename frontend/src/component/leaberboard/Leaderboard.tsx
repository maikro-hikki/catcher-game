import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export interface Score {
  score: number;
  score_id: number;
  username: string;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("rankingSocket", (scores: Score[]) => {
      setLeaderboard(scores);
      console.log("cardioooooo");
      console.log(scores);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("rankingSocket");
      socket.close();
    };
  }, []);
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-blue-950 h-full flex items-center justify-center rounded-3xl w-screen max-w-[1800px] md:border-[20px] border-8 border-blue-600">
        <div className=" flex justify-center items-center max-h-[850px] w-full">
          <div className="overflow-y-auto w-11/12 h-[700px]">
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
