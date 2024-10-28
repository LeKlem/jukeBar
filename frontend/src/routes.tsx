import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Drinks from "./pages/drinks/Drinks";

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
        element: <Drinks />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  }
]);

export default router;