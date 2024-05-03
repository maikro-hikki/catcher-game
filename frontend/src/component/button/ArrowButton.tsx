// import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// type ButtonProp = {
//   direction: string;
//   setBoatPosition: React.Dispatch<React.SetStateAction<number>>;
//   elementWidth: number | undefined;
//   imageWidth: number | undefined;
// };

// const ArrowButton = ({
// direction,
// setBoatPosition,
// elementWidth,
// imageWidth,
// }: // props
// ButtonProp) => {
// const intervalRef = useRef<number | undefined>();
// const navigate = useNavigate();
// const [isMouseDown, setIsMouseDown] = useState(false);

// const handleMouseDown = () => {
//   console.log("1 ", isMouseDown);
//   if (isMouseDown) return;
//   setIsMouseDown(true);
//   console.log("2 ", isMouseDown);
//   const distance = 5; // Change this value to adjust the distance
//   if (direction === "🢀") {
//     console.log("left elem=== ", elementWidth);
//     console.log("left img=== ", imageWidth);
//     intervalRef.current = window.setInterval(() => {
//       setBoatPosition((prevBoatPosition) =>
//         prevBoatPosition - distance >= 0 ? prevBoatPosition - distance : 0
//       );
//     }, 10); // Change this interval duration as desired
//   } else {
//     console.log("right elem=== ", elementWidth);
//     console.log("right img=== ", imageWidth);
//     if (!elementWidth || !imageWidth) {
//       elementWidth = 1;
//       imageWidth = 1;
//       navigate("/");
//     }
//     const maxPosition = elementWidth - imageWidth; // Change this value to the maximum position
//     intervalRef.current = window.setInterval(() => {
//       setBoatPosition((prevBoatPosition) =>
//         prevBoatPosition + distance <= maxPosition
//           ? prevBoatPosition + distance
//           : maxPosition
//       );
//     }, 10); // Change this interval duration as desired
//   }
// };

// const handleMouseUp = () => {
//   console.log("3 ", isMouseDown);
//   setIsMouseDown(false);
//   clearInterval(intervalRef.current);
//   console.log("4 ", isMouseDown);
// };

// return (
//   <button
//     onMouseDown={handleMouseDown}
//     onMouseUp={handleMouseUp}
//     onTouchStart={handleMouseDown}
//     onTouchEnd={handleMouseUp}
//     className="bg-purple-800 active:bg-purple-600 border-purple-500 md:w-32 w-10 md:h-32 h-10 rounded-full md:text-8xl text-lg md:p-2 my-auto md:mx-10 mx-2 border-4"
//   >
//     {direction}
//   </button>
// );
// };

// export default ArrowButton;

// console.log("1 down ", isMouseDownPressed);
//     console.log("1 up ", isMouseUpPressed);
// console.log("2 down ", isMouseDownPressed);
// console.log("2 up ", isMouseUpPressed);
