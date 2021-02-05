import React from "react";

export const routes = {
  root: {
    path: "/",
    component: React.lazy(() =>
      import("../Components/Dashboard" /* webpackChunkName: "Home" */)
    ),
  },
  teams: {
    path: `/:team/games/:id`,
    component: React.lazy(() =>
      import("../Components/MainSlider" /*webpackChunkName: "Teams"*/)
    ),
  },
};
