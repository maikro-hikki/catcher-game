import { Request, Response } from "express";
import { createNewScore, validRScoreInput } from "../service/ScoreService";
import { createScore, top100Score } from "../repository/ScoreRepo";

export type addScoreRequest = {
  username: string;
  score: string;
};

export const test = (req: Request, res: Response) => {
  console.log("test");
  res.status(200).json({
    status: "test success",
    message: "tested successfully",
  });
};

export const top100Ranking = async (req: Request, res: Response) => {
  const top100 = await top100Score();
  console.log("top100");
  res.status(200).json({
    status: "score retrieved",
    message: "Score added successfully",
    data: top100,
  });
};

export const addScore = async (
  req: Request<{}, {}, addScoreRequest>,
  res: Response
) => {
  console.log("Inside addScore function");
  const validInput = validRScoreInput(req.body);
  if (validInput === "Valid") {
    try {
      const formattedResponse = createNewScore(req.body);
      const addedScore = await createScore(formattedResponse);
      if (addedScore) {
        res.status(200).json({
          status: addedScore.score_id,
          message: "Score added successfully",
          data: addedScore,
        });
      } else {
        res.status(500).json({ message: "Registration error" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server registration error" });
    }
  } else {
    res.status(400).json({ message: validInput });
  }
};
