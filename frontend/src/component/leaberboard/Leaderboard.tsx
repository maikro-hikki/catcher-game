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
    const serverPort = import.meta.env.VITE_SERVER_PORT || 3000;
    const socket = io(`http://localhost:${serverPort}`);

    socket.on("rankingSocket", (scores: Score[]) => {
      setLeaderboard(scores);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-blue-950 h-full flex items-center rounded-3xl w-screen max-w-[1800px] md:border-[20px] border-8 border-blue-600">
        <div className=" flex justify-center items-center w-full">
          <div className="overflow-y-auto w-11/12 md:h-[700px] h-96">
            <table className="border-collapse md:text-4xl text-lg w-full">
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
