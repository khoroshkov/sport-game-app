import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import { routes } from "../../services/routes";
import types from "../../redux/types";
import errorHandler from "../../helpers/errorHandler";

// import DownloadAppContainer from "../DownloadAppContainer";

import styles from "./app.module.css";

function App() {
  const isLoading = useSelector((state) => state?.leagues.loading);

  //** GET INITIAL LEAGUES LIST */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: types.GET_LEAGUES_START,
    });
  }, [dispatch]);

  //** temp effect - get teams list | no need in future (will work in Dashboard component and depends on league selection) */
  useEffect(() => {
    dispatch({
      type: types.GET_TEAMS_START,
    });
  }, [dispatch]);

  const error = useSelector((state) => state.leagues.error);
  if (error) {
    errorHandler("Ooops....", error, "warning");
  }

  return (
    <div className={styles.app}>
      {isLoading && (
        <Loader
          type="TailSpin"
          color="#ff3366"
          height={200}
          width={200}
          timeout={3000}
          className={styles.loader}
        />
      )}
      <ReactNotification />
      <Router>
        <Suspense
          fallback={
            <Loader
              type="TailSpin"
              color="#ff3366"
              height={200}
              width={200}
              timeout={5000}
              className={styles.loader}
            />
          }
        >
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
      {/* <DownloadAppContainer /> */}
    </div>
  );
}

export default App;
