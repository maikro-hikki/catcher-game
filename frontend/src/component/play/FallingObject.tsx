import { useState } from "react";

const FallingObject = () => {
  const [elements, setElements] = useState<
    { content: string; position: number }[]
  >([]);

  return (
    <img
      style={{
        position: "sticky",
        top: `${positionTop}px`,
        left: `${positionLeft}px`,
      }}
      className="md:h-36 h-10 w-32"
      src="src/assets/e1.png"
      alt="test"
    ></img>
  );
};

export default FallingObject;
