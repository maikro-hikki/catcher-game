import { NavLink } from "react-router-dom";
import ArrowButton from "../component/button/ArrowButton";
import { useEffect, useRef, useState } from "react";

const Play = () => {
  const [boatPosition, setBoatPosition] = useState(1);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState<number | undefined>(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageWidth, setImageWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      const element = elementRef.current;

      if (!element) return;

      const elementWidth = element.getBoundingClientRect().width;
      setElementWidth(elementWidth);
      console.log("elem = " + elementWidth);
    };

    handleResize(); // Initial calculation on component mount

    window.addEventListener("resize", handleResize);

    const handleImageLoad = () => {
      const image = imageRef.current;
      if (!image) return;
      const imgWidth = image.getBoundingClientRect().width;
      setImageWidth(imgWidth);
      console.log("img = " + imgWidth);
    };

    handleImageLoad();

    window.addEventListener("resize", handleImageLoad);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleImageLoad);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="h-[1050px] w-screen max-w-[1900px] flex flex-col flex-wrap relative">
        <div className="sticky w-full flex justify-between">
          <div>
            <img
              className="md:h-28 h-10 w-auto object-contain"
              src="src/assets/CATCH-GAME.png"
              alt="game title"
            ></img>
          </div>
          <NavLink to="/">
            <div className="bg-green-900 hover:bg-green-700 border-green-600 border-4 rounded-3xl px-7 py-4 shadow-2xl">
              Back to Homepage
            </div>
          </NavLink>
        </div>
        <div className="flex-1 "></div>
        <div className="md:h-40 h-20 flex justify-between">
          <ArrowButton
            boatPosition={boatPosition}
            setBoatPosition={setBoatPosition}
            direction="🢀"
            elementWidth={elementWidth}
            imageWidth={imageWidth}
          />
          <div className="flex-1 flex flex-col justify-center" ref={elementRef}>
            <div style={{ marginLeft: `${boatPosition}px` }}>
              <img
                className="md:h-36 h-10 w-auto object-contain relative"
                src="src/assets/boat.png"
                alt="boat"
                ref={imageRef}
              ></img>
            </div>
          </div>
          <ArrowButton
            boatPosition={boatPosition}
            setBoatPosition={setBoatPosition}
            direction="🢂"
            elementWidth={elementWidth}
            imageWidth={imageWidth}
          />
        </div>
      </div>
    </div>
  );
};

export default Play;
