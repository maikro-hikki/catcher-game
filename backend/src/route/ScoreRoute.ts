import { Router } from "express";
import { addScore, test, top100Ranking } from "../controller/ScoreController";

const ScoreRoute: Router = Router();

ScoreRoute.route("/add-score").post(addScore);
ScoreRoute.route("/ranking").get(top100Ranking);

ScoreRoute.route("/test").post(test);

export default ScoreRoute;
