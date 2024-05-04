import {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEventHandler,
} from "react";
import { useNavigate } from "react-router-dom";
import { KeyboardEvent } from "react";
import FallingObject from "./FallingObject";

const GameArea = () => {
  const [boatPosition, setBoatPosition] = useState(1);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState<number | undefined>(0);
  const boatRef = useRef<HTMLImageElement>(null);
  const [boatWidth, setBoatWidth] = useState<number | undefined>(0);
  const intervalRef = useRef<number | undefined>();
  const navigate = useNavigate();
  const [isMouseDown, setIsMouseDown] = useState(false);
  // const [isKeyDown, setIsKeyDown] = useState(false);
  // const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered");
    const handleResize = () => {
      const element = elementRef.current;
      const boat = boatRef.current;
      // console.log("elementRef", element);
      // console.log("imageRef", image);

      if (!element || !boat) return;
      const elementWidth = element.getBoundingClientRect().width;
      const boatWidth = boat.getBoundingClientRect().width;
      // console.log("1. elementWidth", element.getBoundingClientRect().width);
      // console.log("1. imgWidth", image.getBoundingClientRect().width);
      setElementWidth(elementWidth);
      setBoatWidth(boatWidth);
      // console.log("2. elementWidth", elementWidth);
      // console.log("2. imgWidth", imgWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseDown = (direction: string) => {
    console.log("inside handleMouseDown");
    if (isMouseDown) return;
    setIsMouseDown(true);
    const distance = 5; // Change this value to adjust the distance
    if (direction === "left") {
      // console.log("left elem=== ", elementWidth);
      // console.log("left img=== ", imageWidth);
      intervalRef.current = window.setInterval(() => {
        setBoatPosition((prevBoatPosition) =>
          prevBoatPosition - distance >= 0 ? prevBoatPosition - distance : 0
        );
      }, 10); // Change this interval duration as desired
    } else {
      console.log("right elem=== ", elementWidth);
      console.log("right img=== ", boatWidth);
      if (!elementWidth || !boatWidth) {
        // console.log("messed");
        // setElementWidth(1);
        // setBoatWidth(1);
        navigate("/");
      }
      const maxPosition = (elementWidth as number) - (boatWidth as number); // Change this value to the maximum position
      intervalRef.current = window.setInterval(() => {
        setBoatPosition((prevBoatPosition) =>
          prevBoatPosition + distance <= maxPosition
            ? prevBoatPosition + distance
            : maxPosition
        );
      }, 10); // Change this interval duration as desired
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    clearInterval(intervalRef.current);
  };

  const handleBoatLoad = () => {
    const imgWidth = boatRef.current?.getBoundingClientRect().width;
    console.log("imgWidth", imgWidth);
    setBoatWidth(imgWidth);
  };

  // const handleKeyDown = useCallback(
  //   (direction: string) => {
  //     console.log("inside handleMouseDown");
  //     if (isKeyDown) return;
  //     setIsMouseDown(true);
  //     const distance = 5; // Change this value to adjust the distance
  //     if (direction === "left") {
  //       // console.log("left elem=== ", elementWidth);
  //       // console.log("left img=== ", imageWidth);
  //       intervalRef.current = window.setInterval(() => {
  //         setBoatPosition((prevBoatPosition) =>
  //           prevBoatPosition - distance >= 0 ? prevBoatPosition - distance : 0
  //         );
  //       }, 10); // Change this interval duration as desired
  //     } else {
  //       console.log("right elem=== ", elementWidth);
  //       console.log("right img=== ", imageWidth);
  //       if (!elementWidth || !imageWidth) {
  //         // console.log("messed");
  //         setElementWidth(1);
  //         setImageWidth(1);
  //         navigate("/");
  //       }
  //       const maxPosition = (elementWidth as number) - (imageWidth as number); // Change this value to the maximum position
  //       intervalRef.current = window.setInterval(() => {
  //         setBoatPosition((prevBoatPosition) =>
  //           prevBoatPosition + distance <= maxPosition
  //             ? prevBoatPosition + distance
  //             : maxPosition
  //         );
  //       }, 10); // Change this interval duration as desired
  //     }
  //   },
  //   [elementWidth, imageWidth, isKeyDown, navigate]
  // );

  // useEffect(() => {
  //   const handleEvent = (event: globalThis.KeyboardEvent) => {
  //     console.log("Clicked Key: ", event.key);
  //     if (event.key === "ArrowRight") {
  //       console.log("right 1: ", event.key);
  //       handleKeyDown("right");
  //     }
  //     if (event.key === "ArrowLeft") {
  //       console.log("left 1: ", event.key);
  //       handleKeyDown("left");
  //     }
  //   };

  //   window.addEventListener("keydown", (e) => {
  //     handleEvent(e);
  //   });

  //   return () => {
  //     window.removeEventListener("keydown", (e) => {
  //       handleEvent(e);
  //     });
  //   };
  // }, [handleKeyDown]);
  // const [element, setElement] = useState<{ positionTop: number; positionLeft: number } | null>(null);

  const [elements, setElements] = useState<
    { positionTop: number; positionLeft: number; fileName: string }[]
  >([]);
  const [timer, setTimer] = useState<number | null>(null);

  const handleItemCreate = () => {
    if (!timer) {
      setTimer(
        window.setInterval(() => {
          // set position of the falling element
          const newPositionTop = 0;
          const newPositionLeft = Math.floor(
            Math.random() * ((elementWidth as number) - 200)
          );

          //set the image of falling element
          const rng: number = Math.floor(Math.random() * 6) + 1; //random number from 1 to 6
          let name: string = "";
          switch (rng) {
            case 1:
              name = "p1.png";
              break;
            case 2:
              name = "p2.png";
              break;
            case 3:
              name = "p3.png";
              break;
            case 4:
              name = "p4.png";
              break;
            case 5:
              name = "e1.png";
              break;
            case 6:
              name = "e2.png";
              break;
            default:
              name = "p1.png";
          }

          const newElement = {
            positionTop: newPositionTop,
            positionLeft: newPositionLeft,
            fileName: name,
          };
          setElements((prevElements) => [...prevElements, newElement]);
        }, 1000) // Generate an element every 1000 milliseconds (1 second)
      );

      setTimeout(() => {
        if (timer) {
          clearInterval(timer);
        }
        setTimer(null);
      }, 10000); // Clear the interval after 60 seconds
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (timer) {
        clearInterval(timer);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  return (
    <div className="md:h-40 h-20 flex-1 flex justify-between">
      <button
        onMouseDown={() => handleMouseDown("left")}
        onMouseUp={handleMouseUp}
        onTouchStart={() => handleMouseDown("left")}
        onTouchEnd={handleMouseUp}
        onMouseMove={handleMouseUp}
        className="bg-purple-800 active:bg-purple-600 border-purple-500 md:w-32 w-10 md:h-32 h-10 rounded-full md:text-8xl text-lg md:p-2 mt-auto md:mx-10 mx-2 border-4"
      >
        🢀
      </button>
      <div className="flex-1 flex flex-col relative" ref={elementRef}>
        {elements.map((element, index) => (
          <div
            key={index}
            style={{
              width: "128px",
              height: "144px",
              position: "absolute",
              top: `${element.positionTop}px`,
              // top: 0,
              left: `${element.positionLeft}px`,
              animationName: "falling-animation",
              animationDuration: "3s",
              animationTimingFunction: "linear",
              animationFillMode: "forwards",
            }}
            // className="md:h-36 h-10 md:w-32 w-9"
          >
            <img
              className="h-full w-full"
              src={`src/assets/${element.fileName}`}
              alt="test"
            />
          </div>
        ))}
        <img
          style={{ marginLeft: `${boatPosition}px` }}
          className="md:h-36 h-10 w-32 relative mt-auto"
          src="src/assets/boat.png"
          alt="boat"
          ref={boatRef}
          onLoad={handleBoatLoad}
        ></img>
      </div>
      <div className="flex flex-col">
        <button
          onMouseDown={() => handleMouseDown("right")}
          onMouseUp={handleMouseUp}
          onTouchStart={() => handleMouseDown("right")}
          onTouchEnd={handleMouseUp}
          onMouseMove={handleMouseUp}
          className="bg-purple-800 active:bg-purple-600 border-purple-500 md:w-32 w-10 md:h-32 h-10 rounded-full md:text-8xl text-lg md:p-2 mt-auto md:mx-10 mx-2 border-4"
        >
          🢂
        </button>
        <button onClick={handleItemCreate} className="bg-black">
          Toggle Rendering
        </button>
      </div>
      {/* CSS Keyframes */}
      <style>{`
        @keyframes falling-animation {
          from {
            top: 0;
          }
          to {
            top: 90%; /* Adjust this value to control how far the element falls */
          }
        }
      `}</style>
    </div>
  );
};

export default GameArea;
