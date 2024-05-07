import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Database {
  score: ScoreTable;
}

export interface ScoreTable {
  score_id: Generated<number>;
  username: string;
  score: number;
}

export type Score = Selectable<ScoreTable>;
export type NewScore = Insertable<ScoreTable>;
export type ScoreUpdate = Updateable<ScoreTable>;
