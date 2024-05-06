import { Outlet, useLocation } from "react-router-dom";
import RankButton from "./component/button/RankButton";
import PlayButton from "./component/button/PlayButton";

function App() {
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <div className="font-mono text-yellow-300 bg-sandbox bg-cover bg-center h-screen">
      <div className="bg-game h-screen bg-no-repeat bg-center">
        {!(currentUrl !== "/") && (
          <div className="flex flex-col justify-center items-center h-screen">
            <img
              className="h-auto w-full max-w-2xl md:mb-24 mb-10"
              src="src/assets/CATCH-GAME.png"
              alt="game title"
            ></img>
            <div className="flex gap-10 flex-wrap justify-center pb-16 mx-10">
              <PlayButton
                bgColour="bg-green-900"
                hoverColour="hover:bg-green-700"
                borderColour="border-green-600"
                text="Play"
              />
              <RankButton
                bgColour="bg-blue-900"
                hoverColour="hover:bg-blue-700"
                borderColour="border-blue-600"
                text="Leaderboard"
              />
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
