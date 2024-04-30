import { db } from "../database";
import { NewScore } from "../types";

export async function findAllScoreByUsername(username: string) {
  return await db
    .selectFrom("score")
    .where("username", "=", username)
    .selectAll()
    .executeTakeFirst();
}

export async function createScore(score: NewScore) {
  return await db
    .insertInto("score")
    .values(score)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteScore(score_id: number) {
  return await db
    .deleteFrom("score")
    .where("score_id", "=", score_id)
    .returningAll()
    .executeTakeFirst();
}
