import { UseQueryResult } from "@tanstack/react-query";
import { RankResponseType } from "../service/FetchService";

type RankDialogProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  toggleDialog: () => void;
  query: UseQueryResult<RankResponseType, Error>;
};

const RankDialog = ({ dialogRef, toggleDialog, query }: RankDialogProps) => {
  return (
    <dialog ref={dialogRef}>
      <div>Leaderboard</div>
      <section>
        {query.data?.data.map((score, index) => (
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
