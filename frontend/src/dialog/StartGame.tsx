interface Prop {
  myDialog: HTMLDialogElement;
  setGameOngoing: React.Dispatch<React.SetStateAction<boolean>>;
}

const StartGame = ({ myDialog, setGameOngoing }: Prop) => {
  function toggleDialog() {
    if (!myDialog) {
      return;
    }
    if (myDialog.hasAttribute("open")) {
      setGameOngoing(true);
      myDialog.close();
    }
  }

  return (
    <>
      <div>Start game?</div>
      <button
        onClick={toggleDialog}
        className="bg-red-700 hover:bg-red-600 text-center md:text-4xl text-xl rounded-3xl border-4 border-red-400"
      >
        Start
      </button>
    </>
  );
};

export default StartGame;
