import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import StartGame from "../../dialog/StartGame";
import EndGame from "../../dialog/EndGame";

type FallingItem = {
  name: string;
  score: number;
};

const gameDurationSeconds = 60; //how long game should last in seconds
const gameDurationMilliseconds = 60000; //how long game should last in milliseconds
const gameEnd = 0; //the game ending number

const GameArea = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const [gameOngoing, setGameOngoing] = useState(false);
  const [gameTimer, setGameTimer] = useState(gameDurationSeconds);
  const [isKeyDown, setIsKeyDown] = useState(false);
  const [score, setScore] = useState(0);
  const [boatPosition, setBoatPosition] = useState(1);
  const [boatWidth, setBoatWidth] = useState<number | undefined>(0);
  const [boatHeight, setBoatHeight] = useState<number | undefined>(0);
  const [elementWidth, setElementWidth] = useState<number | undefined>(0);
  const [elementHeight, setElementHeight] = useState<number | undefined>(0);
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

  //initial setup for values of dimensions boat and game area which is used
  //by methods for different calculations, such as collision detection
  useEffect(() => {
    const handleResize = () => {
      if (elementWidth && elementHeight && boatWidth && boatHeight) {
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

  //opens a modal when the component first renders to get the player ready
  //to start the game
  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (dialogNode) {
      setDialogContent(
        <StartGame myDialog={dialogNode} setGameOngoing={setGameOngoing} />
      );
      dialogNode.showModal();
    }

    return () => {
      if (dialogNode) {
        dialogNode.close();
      }
    };
  }, []);

  //opens a modal when the game ends to promt the user to put their name
  //to store the score data into the database
  useEffect(() => {
    const dialogNode = dialogRef.current;

    if (!dialogNode) {
      return;
    }

    if (gameTimer < 1 && dialogNode) {
      setDialogContent(<EndGame score={score} />);
      dialogNode.showModal();
    }
  }, [gameTimer, score]);

  //logic for moving the boat when the mouse is clicked on a specific direction button
  const handleMouseDown = (direction: string) => {
    if (isMouseDown) return;
    setIsMouseDown(true);
    setIsKeyDown(true);
    const distance = 5; // Change this value to adjust the boat distance
    if (direction === "left") {
      intervalRef.current = window.setInterval(() => {
        if (gameTimer > gameEnd) {
          setBoatPosition((prevBoatPosition) =>
            prevBoatPosition - distance >= 0 ? prevBoatPosition - distance : 0
          );
        }
      }, 10); // Change this value for how quickly you want to move the specified distance
    } else {
      if (!elementWidth || !boatWidth) {
        navigate("/");
      }
      const maxPosition = (elementWidth as number) - (boatWidth as number);
      intervalRef.current = window.setInterval(() => {
        if (gameTimer > gameEnd) {
          setBoatPosition((prevBoatPosition) =>
            prevBoatPosition + distance <= maxPosition
              ? prevBoatPosition + distance
              : maxPosition
          );
        }
      }, 10); // Change this value for how quickly you want to move the specified distance
    }
  };

  //logic for cleaning up after the handlMouseDown method
  const handleMouseUp = () => {
    setIsMouseDown(false);
    setIsKeyDown(false);
    clearInterval(intervalRef.current);
  };

  //logic for moving the boat when the arrow key is clicked on the keyboard on a specific direction
  const handleKeyDown = useCallback(
    (direction: string) => {
      if (isKeyDown) return;
      setIsMouseDown(true);
      setIsKeyDown(true);
      const distance = 5; // Change this value to adjust the boat distance
      if (direction === "left") {
        intervalRef.current = window.setInterval(() => {
          setBoatPosition((prevBoatPosition) =>
            prevBoatPosition - distance >= 0 ? prevBoatPosition - distance : 0
          );
        }, 10); // Change this value for how quickly you want to move the specified distance
      } else {
        if (!elementWidth || !boatWidth) {
          navigate("/");
        }
        const maxPosition = (elementWidth as number) - (boatWidth as number);
        intervalRef.current = window.setInterval(() => {
          setBoatPosition((prevBoatPosition) =>
            prevBoatPosition + distance <= maxPosition
              ? prevBoatPosition + distance
              : maxPosition
          );
        }, 10); // Change this value for how quickly you want to move the specified distance
      }
    },
    [boatWidth, elementWidth, isKeyDown, navigate]
  );

  //logic for cleaning up after the handlKeyDown method
  const handleKeyUp = () => {
    setIsKeyDown(false);
    setIsMouseDown(false);
    clearInterval(intervalRef.current);
  };

  //logic to detect keyboard inputs, specifically for left and right arrow keys
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

  //randonly generates falling items every second over the course of 1 min
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
            const rng: number = Math.floor(Math.random() * 6) + 1;
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
            if (gameTimer > gameEnd) {
              setGameTimer((prevTimer) => prevTimer - 1);
            }
          }, 1000) // generate an element every 1000 milliseconds (1 second)
        );

        setTimeout(() => {
          if (timer) {
            clearInterval(timer);
          }
          setTimer(null);
          if (gameTimer > gameEnd) {
            setGameTimer((prevTimer) => prevTimer - 1);
          }
        }, gameDurationMilliseconds); // how long should the game last
      }
    };
    if (gameOngoing && gameTimer > gameEnd) {
      handleItemCreate();
    }
  }, [elementWidth, gameOngoing, gameTimer, timer]);

  //clears out all falling items from the field when the game time is finished
  useEffect(() => {
    if (gameTimer <= gameEnd) {
      setElements([]);
    }
  }, [gameTimer]);

  // Function to update the positions of the falling elements
  const updateElementPositions = (gameTime: number) => {
    setElements((prevElements) =>
      prevElements.map((element) => {
        if (gameTime > gameEnd) {
          const updatedTop = element.positionTop + 2;
          return { ...element, positionTop: updatedTop };
        } else {
          return { ...element };
        }
      })
    );
  };

  // logic to continuously update the element positions
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateElementPositions(gameTimer);
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, [gameTimer]);

  //logic to detect collision between the boat/bottom screen edge and the falling items
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
              // remove the element if it reaches the bottom edge of the container
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
            // remove the element if it touches the boat
            setScore((prevScore) => prevScore + element.fallingItem.score);
            return false;
          }

          return true;
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

  //clear up the interval instance for the timer
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
            ref={(ref) => {
              if (ref) {
                setBoatWidth(ref.getBoundingClientRect().width);
                setBoatHeight(ref.getBoundingClientRect().height);
              }
            }}
          ></img>
        </div>
        <div className="flex flex-col justify-between align pt-10">
          <div className="mx-auto">
            <div className="bg-red-700 text-center md:w-32 w-16 flex flex-col md:text-3xl text-lg rounded-2xl border-4 border-red-400">
              <div>Score</div>
              <div>{score}</div>
            </div>
          </div>
          <div className="mx-auto">
            <div className="bg-red-700 text-center md:w-32 w-16 flex flex-col md:text-3xl text-lg rounded-2xl border-4 border-red-400">
              <div>Timer</div>
              <div>{gameTimer}</div>
            </div>
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
      <dialog
        ref={dialogRef}
        className="rounded-3xl backdrop:bg-black backdrop:opacity-60"
      >
        <div className="flex flex-col justify-between text-center md:gap-10 gap-6 text-yellow-300 bg-red-900 rounded-3xl border-4 border-red-600 backdrop:bg-black backdrop:opacity-65 md:text-6xl text-4xl md:px-10 md:py-6 px-7 py-4">
          {dialogContent}
        </div>
      </dialog>
    </>
  );
};

export default GameArea;
