import { Router } from "express";
import { addScore, test } from "../controller/ScoreController";

const ScoreRoute: Router = Router();

ScoreRoute.route("/add-score").post(addScore);

ScoreRoute.route("/test").post(test);

export default ScoreRoute;
