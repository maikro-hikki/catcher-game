import { useRef } from "react";
import RankDialog from "../../dialog/RankDialog";
import { useQuery } from "@tanstack/react-query";
import { fetchRank } from "../../service/FetchService";

type ButtonProp = {
  bgColour: string;
  hoverColour: string;
  borderColour: string;
  text: string;
};

const RankButton = ({
  bgColour,
  hoverColour,
  borderColour,
  text,
}: ButtonProp) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
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

  function toggleDialog() {
    rankQuery.refetch();
    if (!dialogRef.current) {
      return;
    }
    if (dialogRef.current.hasAttribute("open")) {
      dialogRef.current.close();
    } else {
      dialogRef.current.showModal();
    }
  }

  return (
    <>
      <button
        className={`${bgColour} border-4 ${hoverColour} rounded-3xl ${borderColour} font-bold text-6xl px-10 py-6 shadow-2xl`}
        onClick={toggleDialog}
      >
        {text}
      </button>
      <RankDialog
        dialogRef={dialogRef}
        toggleDialog={toggleDialog}
        query={rankQuery}
      />
    </>
  );
};

export default RankButton;
