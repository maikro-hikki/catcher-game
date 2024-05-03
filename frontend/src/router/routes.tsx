import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Play from "../pages/Play";
import Ranking from "../pages/Ranking";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/play", element: <Play /> },
      { path: "/ranking", element: <Ranking /> },
    ],
  },
]);
