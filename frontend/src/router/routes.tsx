import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Play from "../pages/Play";
import Ranking from "../pages/Ranking";
import NotFoundPage from "../pages/NotFoundPage";
import { ScoreProvider } from "../context/ScoreContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ScoreProvider>
        <App />
      </ScoreProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { path: "/play", element: <Play /> },
      { path: "/ranking", element: <Ranking /> },
    ],
  },
]);
