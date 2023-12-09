import React from "react";
import { StaticRouter } from "react-router-dom/server";

export const RouteContext = React.createContext({});

const Router = ({ children, location, context }) => {
  return (
    <RouteContext.Provider value={context}>
      <StaticRouter location={location}>
        {children}
      </StaticRouter>
    </RouteContext.Provider>
  );
};

export default Router;
