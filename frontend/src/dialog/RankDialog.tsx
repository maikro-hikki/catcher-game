import { useQuery } from "@tanstack/react-query";
import { fetchRank } from "../service/FetchService";

type RankDialogProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
};

const RankDialog = ({ dialogRef, toggleDialog }: RankDialogProps) => {
  const rankQuery = useQuery({
    queryFn: () => fetchRank(),
    queryKey: ["ranks"],
  });

  if (rankQuery.isLoading) {
    return <h1 className="text-gray-950 text-lg mt-20">loading...</h1>;
  }

  if (rankQuery.isError) {
    console.log("postQuery error");
    return <pre className="text-gray-950 text-lg mt-20">Error</pre>;
  }

  return (
    <dialog ref={dialogRef}>
      <div>Leaderboard</div>
      <section>
        {rankQuery.data?.data.map((score, index) => (
          <li
            key={score.score_id}
            className="flex flex-col gap-y-6 mb-5 text-lg"
          >
            <p>
              {index + 1}. {score.username} - {score.score}
            </p>
          </li>
        ))}
      </section>
      <div onClick={toggleDialog}>close</div>
    </dialog>
  );
};

export default RankDialog;
