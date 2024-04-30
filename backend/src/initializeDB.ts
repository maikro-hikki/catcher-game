import { db } from "./database";
import { createScore } from "./repository/ScoreRepo";
import { NewScore } from "./types";

export async function dropAllTable() {
  await db.schema.dropTable("score").ifExists().execute();
}

export async function createTable() {
  await db.schema
    .createTable("score")
    .addColumn("score_id", "serial", (cb) => cb.primaryKey())
    .addColumn("username", "varchar", (cb) => cb.notNull())
    .addColumn("score", "integer", (cb) => cb.notNull())
    .ifNotExists()
    .execute();
}

export async function dummyScore() {
  try {
    const newScore: NewScore = {
      username: "user1",
      score: 500,
    };

    const createdPerson = await createScore(newScore);
  } catch (error) {
    console.error("Error creating person:", error);
    console.error("Error stack trace:", error.stack);
  } finally {
    // Close the database connection when done
    // await db.destroy();
  }
}
