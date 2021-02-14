import React from "react";

export const routes = {
  root: {
    path: "/",
    component: React.lazy(() =>
      import("../components/Dashboard" /* webpackChunkName: "Home" */)
    ),
  },
  teams: {
    path: `/:league/:team/games/:id`,
    component: React.lazy(() =>
      import("../components/MainSlider" /*webpackChunkName: "Teams"*/)
    ),
  },
};
