import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run,
  };
};

export const store = configureStore();
export const persistor = persistStore(store);
