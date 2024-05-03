import {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEventHandler,
} from "react";
import { useNavigate } from "react-router-dom";
import { KeyboardEvent } from "react";

const BoatDirection = () => {
  const [boatPosition, setBoatPosition] = useState(1);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState<number | undefined>(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageWidth, setImageWidth] = useState<number | undefined>(0);
  const intervalRef = useRef<number | undefined>();
  const navigate = useNavigate();
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered");
    const handleResize = () => {
      const element = elementRef.current;
      const image = imageRef.current;
      //   console.log("elementRef", element);
      //   console.log("imageRef", image);

      if (!element || !image) return;
      const elementWidth = element.getBoundingClientRect().width;
      const imgWidth = image.getBoundingClientRect().width;
      console.log("1. elementWidth", element.getBoundingClientRect().width);
      console.log("1. imgWidth", image.getBoundingClientRect().width);
      setElementWidth(elementWidth);
      setImageWidth(imgWidth);
      console.log("2. elementWidth", elementWidth);
      console.log("2. imgWidth", imgWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseDown = (direction: string) => () => {
    if (isMouseDown) return;
    setIsMouseDown(true);
    const distance = 5; // Change this value to adjust the distance
    if (direction === "left") {
      //   console.log("left elem=== ", elementWidth);
      //   console.log("left img=== ", imageWidth);
      intervalRef.current = window.setInterval(() => {
        setBoatPosition((prevBoatPosition) =>
          prevBoatPosition - distance >= 0 ? prevBoatPosition - distance : 0
        );
      }, 10); // Change this interval duration as desired
    } else {
      //   console.log("right elem=== ", elementWidth);
      //   console.log("right img=== ", imageWidth);
      if (!elementWidth || !imageWidth) {
        setElementWidth(1);
        setImageWidth(1);
        navigate("/");
      }
      const maxPosition = (elementWidth as number) - (imageWidth as number); // Change this value to the maximum position
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

  const handleImageLoad = () => {
    const imgWidth = imageRef.current?.getBoundingClientRect().width;
    console.log("imgWidth", imgWidth);
    setImageWidth(imgWidth);
  };

  //   useEffect(() => {
  //     const handleEvent = (event: globalThis.KeyboardEvent) => {
  //       console.log("Clicked Key: ", event.key);
  //       if (event.key === "ArrowRight") {
  //         handleMouseDown("right");
  //       }
  //       if (event.key === "ArrowLeft") {
  //         handleMouseDown("left");
  //       }
  //     };

  //     window.addEventListener("keydown", (e) => {
  //       handleEvent(e);
  //     });

  //     return () => {
  //       window.removeEventListener("keydown", (e) => {
  //         handleEvent(e);
  //       });
  //     };
  //   }, [handleMouseDown]);

  return (
    <div className="md:h-40 h-20 flex justify-between">
      <button
        onMouseDown={handleMouseDown("left")}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown("left")}
        onTouchEnd={handleMouseUp}
        onMouseMove={handleMouseUp}
        className="bg-purple-800 active:bg-purple-600 border-purple-500 md:w-32 w-10 md:h-32 h-10 rounded-full md:text-8xl text-lg md:p-2 my-auto md:mx-10 mx-2 border-4"
      >
        🢀
      </button>
      <div className="flex-1 flex flex-col justify-center" ref={elementRef}>
        <div style={{ marginLeft: `${boatPosition}px` }}>
          <img
            className="md:h-36 h-10 w-auto object-contain relative"
            src="src/assets/boat.png"
            alt="boat"
            ref={imageRef}
            onLoad={handleImageLoad}
          ></img>
        </div>
      </div>
      <button
        onMouseDown={handleMouseDown("right")}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown("right")}
        onTouchEnd={handleMouseUp}
        onMouseMove={handleMouseUp}
        className="bg-purple-800 active:bg-purple-600 border-purple-500 md:w-32 w-10 md:h-32 h-10 rounded-full md:text-8xl text-lg md:p-2 my-auto md:mx-10 mx-2 border-4"
      >
        🢂
      </button>
    </div>
  );
};

export default BoatDirection;
