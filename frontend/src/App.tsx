import RankButton from "./component/button/RankButton";
import SimpleButton from "./component/button/SimpleButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-mono text-yellow-300 bg-sandbox bg-cover bg-center h-screen">
        <div className="h-full mx-auto flex flex-col justify-center items-center">
          <div className="">
            <img
              className="h-96 w-auto mb-24"
              src="src/assets/CATCH-GAME.png"
              alt="game title"
            ></img>
          </div>
          <div className="flex justify-between gap-32 pb-16">
            <SimpleButton
              bgColour="bg-green-900"
              hoverColour="hover:bg-green-700"
              borderColour="border-green-600"
              text="Play"
            />
            <RankButton
              bgColour="bg-blue-900"
              hoverColour="hover:bg-blue-700"
              borderColour="border-blue-600"
              text="Ranking"
            />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
