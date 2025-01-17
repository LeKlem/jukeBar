import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Drinks from "./pages/drinks/Drinks";
import drinkLoader from "./pages/drinks/DrinkLoader";
import EventDetails from "./pages/events/components/eventDetails/EventDetails";
import { EventLoader, EventsLoader } from "./pages/events/components/EventLoader";
import BuyDrinks from "./pages/events/components/eventBuyDrinks/BuyDrinks";
import { GraphOneLoader } from "./pages/graphs/components/GraphOneLoader.tsx"
import { GraphTwoLoader } from "./pages/graphs/components/GraphTwoLoader.tsx"

import Graph from "./pages/graphs/pages/Graphs.tsx";
import GraphTwo from "./pages/graphs/pages/GraphTwo.tsx";

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        loader: EventsLoader
      },
      {
        path: 'drinks',
        element: <Drinks />,
        loader: drinkLoader
      },
      {
        path: 'events',
        children: [
          {
            path: 'pair/:eventId',
            element: <EventDetails/>,
            loader: EventLoader,
          },
          {
            path: 'manage/:eventId',
            element: <BuyDrinks/>,
            loader: EventLoader,
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'graphs',
    element: <Graph  />,
    loader : GraphOneLoader
  },
  {
    path: 'graphTwo',
    element: <GraphTwo  />,
    loader : GraphTwoLoader
  }
]);

export default router;