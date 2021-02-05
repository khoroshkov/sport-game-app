import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
// import HelmetMetaData from "./Components/HelmetMetaData";
import { routes } from "./services/routes";
import types from "./redux/types";

function App() {
  // GET LEAGUES LIST
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: types.GET_LEAGUES_START,
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Suspense fallback={null}>
          {/* <HelmetMetaData></HelmetMetaData> */}
          <Switch>
            <Route
              exact
              path={routes.root.path}
              component={routes.root.component}
            />
            <Route
              exact
              path={routes.teams.path}
              component={routes.root.component}
            />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
