type ButtonProp = {
  bgColour: string;
  hoverColour: string;
  borderColour: string;
  text: string;
};

const SimpleButton = ({
  bgColour,
  hoverColour,
  borderColour,
  text,
}: ButtonProp) => {
  return (
    <button
      className={`${bgColour} border-4 ${hoverColour} rounded-3xl ${borderColour} font-bold text-6xl px-10 py-6 shadow-2xl`}
    >
      {text}
    </button>
  );
};

export default SimpleButton;
