import React, { createContext, useState } from "react";
import { Score } from "../component/leaberboard/Leaderboard";

type Props = { children: React.ReactNode };

export type ScoreResponse = {
  score_id: number;
  username: string;
  score: number;
};

export type ScoreContextType = {
  scoreProfile: Score | null;
  saveCurrentScore: (scoreResponse: ScoreResponse) => void;
};

export const ScoreContext = createContext<ScoreContextType>(
  {} as ScoreContextType
);

export const ScoreProvider = ({ children }: Props) => {
  const [scoreProfile, setScoreProfile] = useState<Score | null>(null);

  const saveCurrentScore = (scoreResponse: ScoreResponse) => {
    try {
      if (!scoreResponse) return;

      const scoreObj = {
        username: scoreResponse.username,
        score_id: scoreResponse.score_id,
        score: scoreResponse.score,
      };

      setScoreProfile(scoreObj!);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScoreContext.Provider
      value={{
        scoreProfile,
        saveCurrentScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
