import { sql } from "kysely";
import { db } from "../database";
import { NewScore } from "../types";

// export async function findAllScoreByUsername(username: string) {
//   return await db
//     .selectFrom("score")
//     .where("username", "=", username)
//     .selectAll()
//     .executeTakeFirst();
// }

export async function top100Score() {
  return await db
    .selectFrom("score")
    .selectAll()
    .orderBy("score", "desc")
    .limit(100)
    .execute();
}

export async function createScore(score: NewScore) {
  return await db
    .insertInto("score")
    .values(score)
    .returningAll()
    .executeTakeFirstOrThrow();
}

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

// export async function deleteScore(score_id: number) {
//   return await db
//     .deleteFrom("score")
//     .where("score_id", "=", score_id)
//     .returningAll()
//     .executeTakeFirst();
// }
