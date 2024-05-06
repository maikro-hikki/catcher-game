import { useContext } from "react";
import { ScoreContextType, ScoreContext } from "./ScoreContext";

export const useScore = (): ScoreContextType => useContext(ScoreContext);
