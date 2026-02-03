import Home from "./pages/Home";
import Index from "./pages/Index";
import FortunePage from "./pages/FortunePage";
import NotFound from "./pages/NotFound";

export const routers = [
    {
      path: "/",
      name: 'home',
      element: <Home />,
    },
    {
      path: "/greeting",
      name: 'greeting',
      element: <Index />,
    },
    {
      path: "/fortune",
      name: 'fortune',
      element: <FortunePage />,
    },
    /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
    {
      path: "*",
      name: '404',
      element: <NotFound />,
    },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;