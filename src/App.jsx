import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
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

  const error = useSelector((state) => state.leagues.error);
  if (error) {
    store.addNotification({
      title: "Ooops....",
      message: error,
      type: "warning",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  }

  return (
    <div className="App">
      {error && (
        <Loader
          type="TailSpin"
          color="#ff3366"
          height={200}
          width={200}
          timeout={5000}
          className="main-page-loader-cont"
        />
      )}
      <ReactNotification />
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
