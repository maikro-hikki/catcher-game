import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="font-mono text-yellow-300 bg-sandbox bg-cover bg-center h-screen">
      <div className="bg-game h-screen bg-no-repeat bg-center">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="h-[1050px] w-screen max-w-[1900px] flex flex-col relative">
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
            <div className="my-auto mx-auto flex flex-col md:text-6xl text-2xl md:gap-10 gap-6 px-2 md:py-8 py-4 w-11/12 max-w-[1000px] border-4 rounded-3xl bg-blue-900 border-blue-600 items-center">
              <div>Page Not Found</div>
              <NavLink to="/">
                <button className="bg-blue-900 border-4 hover:bg-blue-700 rounded-3xl border-blue-600 md:text-4xl text-xl md:px-6 md:py-3 px-4 py-2 shadow-2xl">
                  Back to Homepage
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
