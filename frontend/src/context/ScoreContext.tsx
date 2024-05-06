import React, { createContext, useEffect, useState } from "react";
import { Score } from "../component/leaberboard/Leaderboard";
import { useNavigate } from "react-router-dom";

type Props = { children: React.ReactNode };

export type ScoreResponse = {
  score_id: number;
  username: string;
  score: number;
};

export type ScoreContextType = {
  scoreProfile: Score | null;
  saveCurrentScore: (scoreResponse: ScoreResponse) => void;
  removeData: () => void;
};

export const ScoreContext = createContext<ScoreContextType>(
  {} as ScoreContextType
);

export const ScoreProvider = ({ children }: Props) => {
  const [scoreProfile, setScoreProfile] = useState<Score | null>(null);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const username = localStorage.getItem("username");
  //     const scoreString = localStorage.getItem("score");
  //     const score_idString = localStorage.getItem("score_id");

  //     if (username && scoreString && score_idString) {
  //       const scoreObj = {
  //         username: username,
  //         score_id: parseInt(score_idString, 10),
  //         score: parseInt(scoreString, 10),
  //       };
  //       setScoreProfile(scoreObj);
  //     }
  //     setIsReady(true);
  //   }, []);

  const saveCurrentScore = (scoreResponse: ScoreResponse) => {
    console.log("entered saveCurrentScore");
    try {
      if (!scoreResponse) return;

      const scoreObj = {
        username: scoreResponse.username,
        score_id: scoreResponse.score_id,
        score: scoreResponse.score,
      };

      //   localStorage.setItem("username", scoreResponse.username);
      //   localStorage.setItem("score", scoreResponse.score.toString());
      //   localStorage.setItem("score_id", scoreResponse.score_id.toString());

      setScoreProfile(scoreObj!);
    } catch (err) {
      console.error(err);
      console.log("saveCurrentScore error");
    }
  };

  const removeData = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("score");
    localStorage.removeItem("score_id");
    setScoreProfile(null);
    navigate("/ranking");
  };

  return (
    <ScoreContext.Provider
      value={{
        scoreProfile,
        saveCurrentScore,
        removeData,
      }}
    >
      {/* {isReady ? children : null} */}
      {children}
    </ScoreContext.Provider>
  );
};
