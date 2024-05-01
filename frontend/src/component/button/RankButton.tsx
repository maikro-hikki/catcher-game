import { useRef } from "react";
import RankDialog from "../../dialog/RankDialog";

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

  function toggleDialog() {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  return (
    <>
      <button
        className={`${bgColour} border-4 ${hoverColour} rounded-3xl ${borderColour} font-bold text-6xl px-10 py-6 shadow-2xl`}
        onClick={toggleDialog}
      >
        {text}
      </button>
      <RankDialog dialogRef={dialogRef} toggleDialog={toggleDialog} />
    </>
  );
};

export default RankButton;
