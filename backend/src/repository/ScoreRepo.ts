import { db } from "../database";
import { NewScore } from "../types";

//returns the top 100 score data in the table
//first the table is ordered by score in descending order
//then the first 100 entries are returned
// SELECT *
// FROM score
// ORDER BY score DESC
// LIMIT 100;
export async function top100Score() {
  return await db
    .selectFrom("score")
    .selectAll()
    .orderBy("score", "desc")
    .limit(100)
    .execute();
}

//add a new score to the database and return the saved score
// INSERT INTO score
// VALUES (<value1>, <value2>, <value3>, ...)
// RETURNING *
export async function createScore(score: NewScore) {
  return await db
    .insertInto("score")
    .values(score)
    .returningAll()
    .executeTakeFirstOrThrow();
}

//takes in a score id as input and returns the rank for the score id
//first the score entry with the relevant score id is found
//then all the score entries that have an equal or higher score than the
//score of the score entry found previously is counted and the number count
//is aliased as "rank" and then returned
// SELECT COUNT(*) AS rank
// FROM scores
// WHERE score > (
//   SELECT score
//   FROM scores
//   WHERE scoreId = <your_scoreId>
// )
export async function scoreRank(score_id: number) {
  const subquery = await db
    .selectFrom("score")
    .select("score")
    .where("score.score_id", "=", score_id)
    .executeTakeFirstOrThrow();

  const rank = await db
    .selectFrom("score")
    .select(({ fn }) => [fn.count("score.score_id").as("rank")])
    .where("score", ">=", subquery.score)
    .executeTakeFirstOrThrow();

  return rank;
}
