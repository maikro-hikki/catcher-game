import { NavLink } from "react-router-dom";
import GameArea from "../component/play/GameArea";

const Play = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen  overflow-hidden">
      <div className="h-[1050px] w-screen max-w-[1900px] flex flex-col flex-wrap relative">
        <div className="sticky w-full flex justify-between">
          <div>
            <img
              className="md:h-28 h-12 w-auto object-contain"
              src="src/assets/CATCH-GAME.png"
              alt="game title"
            ></img>
          </div>
          <div className="md:w-32 w-14 md:mx-10 mx-2 flex flex-col justify-center">
            <NavLink to="/" className="mx-auto">
              <div className="bg-green-900 hover:bg-green-700 md:text-2xl border-green-600 border-4 rounded-3xl px-3 py-2 shadow-2xl">
                🏠︎
              </div>
            </NavLink>
          </div>
        </div>
        <GameArea />
      </div>
    </div>
  );
};

export default Play;
