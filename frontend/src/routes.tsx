import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Drinks from "./pages/drinks/Drinks";
import drinkLoader from "./pages/drinks/DrinkLoader";
import EventDetails from "./pages/events/components/eventDetails/EventDetails";
import { EventLoader, EventsLoader } from "./pages/events/components/EventLoader";
import BuyDrinks from "./pages/events/components/eventBuyDrinks/BuyDrinks";
import GraphOne from "./pages/graphs/pages/GraphOne.tsx";
import GraphTwo from "./pages/graphs/pages/GraphTwo.tsx";
import { GraphsLoader } from "./pages/graphs/components/GraphsLoader.tsx";
import SwithGraphs from "./pages/graphs/pages/SwitchGraphs.tsx";

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
    path: 'admin',
    element: <Home />
  },
  {
    path: 'graphs',
    element: <SwithGraphs  />,
    loader : GraphsLoader
  },
  {
    path: 'graphOne',
    element: <GraphOne  />,
    loader : GraphsLoader
  },
  {
    path: 'graphTwo',
    element: <GraphTwo  />,
    loader : GraphsLoader
  }
  
]);

export default router;