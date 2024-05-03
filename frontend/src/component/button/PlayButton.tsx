import { useNavigate } from "react-router-dom";

type ButtonProp = {
  bgColour: string;
  hoverColour: string;
  borderColour: string;
  text: string;
};

const PlayButton = ({
  bgColour,
  hoverColour,
  borderColour,
  text,
}: ButtonProp) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/play");
  }
  return (
    <button
      className={`${bgColour} border-4 ${hoverColour} rounded-3xl ${borderColour} font-bold md:text-6xl text-4xl md:px-10 md:py-6 px-7 py-4 shadow-2xl`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default PlayButton;
