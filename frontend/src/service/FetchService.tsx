type ScoreList = {
  score_id: number;
  username: string;
  score: number;
};

export type RankResponseType = {
  status: string;
  message: string;
  data: ScoreList[];
};

const api = "http://localhost:3000/api/v1";

export const fetchRank = async (): Promise<RankResponseType> => {
  const response = await fetch(api + "/ranking");
  if (!response.ok) {
    throw new Error("failed to fetch ranks");
  }
  console.log("fetch ranks success");
  return response.json();
};
