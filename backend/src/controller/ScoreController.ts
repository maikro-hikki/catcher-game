import { Request, Response } from "express";
import { createNewScore, validRScoreInput } from "../service/ScoreService";
import { createScore, scoreRank, top100Score } from "../repository/ScoreRepo";
import { NewScore } from "../types";

export type addScoreRequest = {
  username: string;
  score: string;
};

// export const test = (req: Request, res: Response) => {
//   console.log("test");
//   res.status(200).json({
//     status: "test success",
//     message: "tested successfully",
//   });
// };

// export const top100Ranking = async (req: Request, res: Response) => {
//   const top100 = await top100Score();
//   res.status(200).json({
//     status: "score retrieved",
//     message: "Score added successfully",
//     data: top100,
//   });
// };
export async function top100Ranking() {
  const top100 = await top100Score();
  return top100;
}

export async function getRank(score_id: number) {
  const rank = await scoreRank(score_id);
  return rank;
}

export async function saveScore(score: NewScore) {
  const savedScore = await createScore(score);
  return savedScore;
}

// export const addScore = async (
//   req: Request<{}, {}, addScoreRequest>,
//   res: Response
// ) => {
//   console.log("Inside addScore function");
//   const validInput = validRScoreInput(req.body);
//   if (validInput === "Valid") {
//     try {
//       const formattedResponse = createNewScore(req.body);
//       const addedScore = await createScore(formattedResponse);
//       if (addedScore) {
//         console.log("test");
//         console.log("test2");
//         res.status(200).json({
//           // status: addedScore.score_id,
//           message: "Score added successfully",
//           data: addedScore,
//         });
//       } else {
//         res.status(500).json({ message: "Registration error", data: null });
//       }
//     } catch (error) {
//       res.status(500).json({ message: error.message, data: null });
//     }
//   } else {
//     res.status(400).json({ message: validInput });
//   }
// };
