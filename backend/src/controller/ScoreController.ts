import { createScore, scoreRank, top100Score } from "../repository/ScoreRepo";
import { NewScore } from "../types";

//returns the top 100 scores in the database
export async function top100Ranking() {
  const top100 = await top100Score();
  return top100;
}

//returns the rank of a specific score in the database
export async function getRank(score_id: number) {
  const rank = await scoreRank(score_id);
  return rank;
}

//save a new score entry to the database and returns the saved score
export async function saveScore(score: NewScore) {
  const savedScore = await createScore(score);
  return savedScore;
}
