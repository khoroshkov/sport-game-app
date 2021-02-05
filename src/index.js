import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import rootSaga from "./redux/rootSaga";
import { store, persistor } from "./redux/store";
import App from "./App.jsx";
import "./index.css";

store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={"loading"} persistor={persistor}> */}
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);
