import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Drinks from "./pages/drinks/Drinks";
import drinkLoader from "./pages/drinks/DrinkLoader";

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'drinks',
        element: <Drinks />,
        loader: drinkLoader
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  }
]);

export default router;