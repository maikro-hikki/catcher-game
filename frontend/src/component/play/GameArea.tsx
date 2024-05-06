import {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEventHandler,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { KeyboardEvent } from "react";
import FallingObject from "./FallingObject";
import StartGame from "../../dialog/StartGame";
import EndGame from "../../dialog/EndGame";

type FallingItem = {
  name: string;
  score: number;
};

const GameArea = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const [gameOngoing, setGameOngoing] = useState(false);
  const [gameTimer, setGameTimer] = useState(0);
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [score, setScore] = useState(0);
  const [boatPosition, setBoatPosition] = useState(1);
  const [boatWidth, setBoatWidth] = useState<number | undefined>(0);
  const [boatHeight, setBoatHeight] = useState<number | undefined>(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState<number | undefined>(0);
  const [elementHeight, setElementHeight] = useState<number | undefined>(0);
  const boatRef = useRef<HTMLImageElement>(null);
  const fallingRef = useRef<HTMLDivElement>(null);
  const [fallingItemHeight, setFallingItemHeight] = useState<number | null>(
    null
  );
  const [fallingItemWidth, setFallingItemWidth] = useState<number | null>(null);
  const intervalRef = useRef<number | undefined>();
  const navigate = useNavigate();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [boatTopPosition, setBoatTopPosition] = useState(1);
  const [elements, setElements] = useState<
    {
      positionTop: number;
      positionLeft: number;
      fallingItem: FallingItem;
    }[]
  >([]);
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      // const element = elementRef.current;
      // const boat = boatRef.current;

      if (elementWidth && elementHeight && boatWidth && boatHeight) {
        // const elementWidth = element.getBoundingClientRect().width;
        // const elementHeight = element.getBoundingClientRect().height;
        // const boatWidth = boat.getBoundingClientRect().width;
        // const boatHeight = boat.getBoundingClientRect().height;
        setElementWidth(elementWidth);
        setElementHeight(elementHeight);
        setBoatWidth(boatWidth);
        setBoatHeight(boatHeight);
        setBoatTopPosition(elementHeight - boatHeight);
      } else {
        return;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [elementHeight, boatWidth, boatHeight, elementWidth]);

  // function toggleDialog() {
  //   if (!dialogRef.current) {
  //     return;
  //   }
  //   if (dialogRef.current.hasAttribute("open")) {
  //     setGameOngoing(true);
  //     dialogRef.current.close();
  //   }
  // }

  // useEffect(() => {
  //   const myDialog = document.getElementById("myDialog") as HTMLDialogElement;
  //   if (myDialog) {
  //     setDialogContent(
  //       <StartGame myDialog={myDialog} setGameOngoing={setGameOngoing} />
  //     );
  //     myDialog.showModal();
  //   }

  //   return () => {
  //     if (myDialog) {
  //       myDialog.close();
  //       setDialogContent(null);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (!dialogNode) {
      return;
    }

    if (gameTimer > 9 && dialogNode) {
      dialogNode.showModal();
    }
  }, [gameTimer]);

  const handleMouseDown = (direction: string) => {
    if (isMouseDown) return;
    setIsMouseDown(true);
    setIsKeyDown(true);
    const distance = 5; // Change this value to adjust the distance
    if (direction === "left") {
      intervalRef.current = window.setInterval(() => {
        if (gameTimer <= 10) {
          setBoatPosition((prevBoatPosition) =>
            prevBoatPosition - distance >= 0 ? prevBoatPosition - distance : 0
          );
        }
      }, 10); // Change this interval duration as desired
    } else {
      if (!elementWidth || !boatWidth) {
        navigate("/");
      }
      const maxPosition = (elementWidth as number) - (boatWidth as number); // Change this value to the maximum position
      intervalRef.current = window.setInterval(() => {
        if (gameTimer <= 10) {
          setBoatPosition((prevBoatPosition) =>
            prevBoatPosition + distance <= maxPosition
              ? prevBoatPosition + distance
              : maxPosition
          );
        }
      }, 10); // Change this interval duration as desired
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setIsKeyDown(false);
    clearInterval(intervalRef.current);
  };

  // const handleBoatLoad = () => {
  //   const imgWidth = boatRef.current?.getBoundingClientRect().width;
  //   const imgHeight = boatRef.current?.getBoundingClientRect().height;
  //   setBoatWidth(imgWidth);
  //   setBoatWidth(imgHeight);
  // };

  const handleKeyDown = useCallback(
    (direction: string) => {
      console.log("inside handleMouseDown");
      if (isKeyDown) return;
      setIsMouseDown(true);
      setIsKeyDown(true);
      const distance = 5; // Change this value to adjust the distance
      if (direction === "left") {
        console.log("left elem=== ", elementWidth);
        console.log("left img=== ", boatWidth);
        intervalRef.current = window.setInterval(() => {
          setBoatPosition((prevBoatPosition) =>
            prevBoatPosition - distance >= 0 ? prevBoatPosition - distance : 0
          );
        }, 10); // Change this interval duration as desired
      } else {
        console.log("right elem=== ", elementWidth);
        console.log("right img=== ", boatWidth);
        if (!elementWidth || !boatWidth) {
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
    },
    [boatWidth, elementWidth, isKeyDown, navigate]
  );

  const handleKeyUp = () => {
    setIsKeyDown(false);
    setIsMouseDown(false);
    clearInterval(intervalRef.current);
  };

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

  useEffect(() => {
    const handleKeyEvent = (
      event: globalThis.KeyboardEvent,
      action: string
    ) => {
      if (event.key === "ArrowRight") {
        if (action === "keydown") {
          handleKeyDown("right");
        } else {
          handleKeyUp();
        }
      }
      if (event.key === "ArrowLeft") {
        if (action === "keydown") {
          handleKeyDown("left");
        } else {
          handleKeyUp();
        }
      }
    };

    const handleKeyDownEvent = (event: globalThis.KeyboardEvent) => {
      handleKeyEvent(event, "keydown");
    };

    const handleKeyUpEvent = (event: globalThis.KeyboardEvent) => {
      handleKeyEvent(event, "keyup");
    };

    window.addEventListener("keydown", handleKeyDownEvent);
    window.addEventListener("keyup", handleKeyUpEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDownEvent);
      window.removeEventListener("keyup", handleKeyUpEvent);
    };
  }, [handleKeyDown]);

  // const [element, setElement] = useState<{ positionTop: number; positionLeft: number } | null>(null);

  // const handleItemCreate = () => {
  //   if (!timer) {
  //     setTimer(
  //       window.setInterval(() => {
  //         // set position of the falling element
  //         const initialPositionTop = 0;
  //         let initialPositionLeft: number = 0;
  //         if (elementWidth) {
  //           if (elementWidth < 1000) {
  //             initialPositionLeft = Math.floor(
  //               Math.random() * ((elementWidth as number) - 66)
  //             );
  //           } else {
  //             initialPositionLeft = Math.floor(
  //               Math.random() * ((elementWidth as number) - 150)
  //             );
  //           }
  //         }

  //         //set the image of falling element
  //         const rng: number = Math.floor(Math.random() * 6) + 1; //random number from 1 to 6
  //         let item: FallingItem = { name: "", score: 0 };
  //         switch (rng) {
  //           case 1:
  //             item = { name: "p1.png", score: 50 };
  //             break;
  //           case 2:
  //             item = { name: "p2.png", score: 50 };
  //             break;
  //           case 3:
  //             item = { name: "p3.png", score: 50 };
  //             break;
  //           case 4:
  //             item = { name: "p4.png", score: 50 };
  //             break;
  //           case 5:
  //             item = { name: "e1.png", score: -100 };
  //             break;
  //           case 6:
  //             item = { name: "e2.png", score: -100 };
  //             break;
  //           default:
  //             item = { name: "p1.png", score: 50 };
  //         }

  //         const newElement = {
  //           positionTop: initialPositionTop,
  //           positionLeft: initialPositionLeft,
  //           fallingItem: item,
  //         };

  //         setElements((prevElements) => [...prevElements, newElement]);
  //       }, 1000) // Generate an element every 1000 milliseconds (1 second)
  //     );

  //     setTimeout(() => {
  //       if (timer) {
  //         clearInterval(timer);
  //       }
  //       setTimer(null);
  //     }, 10000); // How long should the game last
  //   }
  //   console.log("end of gamestart: ", gameOngoing);
  //   setGameOngoing(false);
  // };

  useEffect(() => {
    const handleItemCreate = () => {
      if (!timer) {
        setTimer(
          window.setInterval(() => {
            // set position of the falling element
            const initialPositionTop = 0;
            let initialPositionLeft: number = 0;
            if (elementWidth) {
              if (elementWidth < 1000) {
                initialPositionLeft = Math.floor(
                  Math.random() * ((elementWidth as number) - 66)
                );
              } else {
                initialPositionLeft = Math.floor(
                  Math.random() * ((elementWidth as number) - 150)
                );
              }
            }

            //set the image of falling element
            const rng: number = Math.floor(Math.random() * 6) + 1; //random number from 1 to 6
            let item: FallingItem = { name: "", score: 0 };
            switch (rng) {
              case 1:
                item = { name: "p1.png", score: 50 };
                break;
              case 2:
                item = { name: "p2.png", score: 50 };
                break;
              case 3:
                item = { name: "p3.png", score: 50 };
                break;
              case 4:
                item = { name: "p4.png", score: 50 };
                break;
              case 5:
                item = { name: "e1.png", score: -100 };
                break;
              case 6:
                item = { name: "e2.png", score: -100 };
                break;
              default:
                item = { name: "p1.png", score: 50 };
            }

            const newElement = {
              positionTop: initialPositionTop,
              positionLeft: initialPositionLeft,
              fallingItem: item,
            };

            setElements((prevElements) => [...prevElements, newElement]);
            setGameTimer((prevTimer) => prevTimer + 1);
          }, 1000) // Generate an element every 1000 milliseconds (1 second)
        );

        setTimeout(() => {
          if (timer) {
            clearInterval(timer);
          }
          setTimer(null);
          // console.log("before game lenth setting", gameOngoing);
          // setGameOngoing(false);
          setGameTimer((prevTimer) => prevTimer + 1);
        }, 10000); // How long should the game last
      }
      // setGameOngoing(false);
    };
    // console.log("not recalling handleItemCreate", gameOngoing);
    if (gameOngoing && gameTimer < 10) {
      console.log("called handleItemCreate");
      handleItemCreate();
    }
  }, [elementWidth, gameOngoing, gameTimer, timer]);

  // Function to update the positions of the falling elements
  const updateElementPositions = (gameTime: number) => {
    setElements((prevElements) =>
      prevElements.map((element) => {
        // if (element.positionTop >= 700) {
        //   return { ...element };
        // }
        if (gameTime < 10) {
          const updatedTop = element.positionTop + 2;
          return { ...element, positionTop: updatedTop };
        } else {
          return { ...element };
        }
      })
    );
  };

  // Use useEffect to continuously update the element positions
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateElementPositions(gameTimer);
    }, 10); // Adjust the interval duration as needed

    return () => {
      clearInterval(intervalId);
    };
  }, [gameTimer]);

  useEffect(() => {
    const checkCollisions = () => {
      const fallingItemRef = fallingRef.current;

      if (
        fallingItemRef &&
        fallingItemHeight === null &&
        fallingItemWidth === null
      ) {
        setFallingItemHeight(fallingItemRef.getBoundingClientRect().height);
        setFallingItemWidth(fallingItemRef.getBoundingClientRect().width);
      }

      setElements((prevElements) => {
        const updatedElements = prevElements.filter((element) => {
          const elementRect = {
            top: element.positionTop,
            left: element.positionLeft,
            width: fallingItemWidth,
            height: fallingItemHeight,
          };

          if (elementHeight) {
            if (elementRect.top >= elementHeight) {
              // Exclude the element from the updated array
              return false;
            }
          }

          if (
            boatHeight &&
            boatWidth &&
            elementRect.width &&
            elementRect.height &&
            elementRect.left + elementRect.width >= boatPosition &&
            elementRect.left <= boatPosition + boatWidth &&
            elementRect.top + elementRect.height >= boatTopPosition &&
            elementRect.top <= boatTopPosition + boatHeight
          ) {
            // Exclude the element from the updated array
            setScore((prevScore) => prevScore + element.fallingItem.score);
            return false;
          }

          return true; // Keep the element in the array
        });

        return updatedElements;
      });
    };

    const intervalId = setInterval(checkCollisions, 5); // Adjust the interval duration as needed

    return () => {
      clearInterval(intervalId);
    };
  }, [
    boatHeight,
    boatPosition,
    boatTopPosition,
    boatWidth,
    elementHeight,
    elements,
    fallingItemHeight,
    fallingItemWidth,
  ]);

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
    <>
      <div className="md:h-40 h-20 flex-1 flex justify-between">
        <button
          onMouseDown={() => handleMouseDown("left")}
          onMouseUp={handleMouseUp}
          onTouchStart={() => handleMouseDown("left")}
          onTouchEnd={handleMouseUp}
          onMouseMove={handleMouseUp}
          className="bg-purple-800 active:bg-purple-600 border-purple-500 md:w-32 w-14 md:h-32 h-14 rounded-full md:text-8xl text-lg md:p-2 mt-auto md:mx-10 mx-2 border-4"
        >
          🢀
        </button>
        <div
          className="flex-1 flex flex-col relative"
          // ref={elementRef}
          ref={(ref) => {
            if (ref) {
              setElementWidth(ref.getBoundingClientRect().width);
              setElementHeight(ref.getBoundingClientRect().height);
            }
          }}
        >
          {elements.map((element, index) => (
            <div
              ref={fallingRef}
              key={index}
              style={{
                top: `${element.positionTop}px`,
                left: `${element.positionLeft}px`,
              }}
              className="md:h-36 h-16 md:w-32 w-14 absolute"
            >
              <img
                className="h-full w-full"
                src={`src/assets/${element.fallingItem.name}`}
                alt="test"
              />
            </div>
          ))}
          <img
            style={{ left: `${boatPosition}px`, top: `${boatTopPosition}px` }}
            className="md:h-36 h-20 md:w-32 w-18 absolute"
            src="src/assets/boat.png"
            alt="boat"
            // ref={boatRef}
            ref={(ref) => {
              if (ref) {
                setBoatWidth(ref.getBoundingClientRect().width);
                setBoatHeight(ref.getBoundingClientRect().height);
              }
            }}
            // onLoad={handleBoatLoad}
          ></img>
        </div>
        <div className="flex flex-col justify-between">
          <div className="bg-red-700 text-center md:text-3xl text-lg rounded-3xl border-4 border-red-400">
            Score: {score}
          </div>
          <div className="bg-red-700 text-center md:text-3xl text-lg rounded-3xl border-4 border-red-400">
            Timer: {gameTimer}
          </div>
          {!gameOngoing ? (
            <button
              onClick={() => setGameOngoing(true)}
              className="bg-red-700 hover:bg-red-600 text-center md:text-3xl text-lg rounded-3xl border-4 border-red-400"
            >
              Start
            </button>
          ) : null}
          <button
            onMouseDown={() => handleMouseDown("right")}
            onMouseUp={handleMouseUp}
            onTouchStart={() => handleMouseDown("right")}
            onTouchEnd={handleMouseUp}
            onMouseMove={handleMouseUp}
            className="bg-purple-800 active:bg-purple-600 border-purple-500 md:w-32 w-14 md:h-32 h-14 rounded-full md:text-8xl text-lg md:p-2 md:mx-10 mx-2 border-4"
          >
            🢂
          </button>
        </div>
      </div>
      <dialog ref={dialogRef} className="rounded-3xl">
        <div className="flex flex-col justify-between text-center md:gap-10 gap-6 text-yellow-300 bg-red-900 rounded-3xl border-4 border-red-600 backdrop:bg-black backdrop:opacity-65 md:text-6xl text-4xl md:px-10 md:py-6 px-7 py-4">
          <EndGame score={score} />
        </div>
      </dialog>
    </>
  );
};

export default GameArea;
