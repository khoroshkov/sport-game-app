import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../services/API";
import types from "../types";
import getIndex from "../../helpers/getIndex";

function* getSchedule({ payload }) {
  try {
    const { status, data } = yield call(api.games.getSchedule, payload);
    if (status < 200 || status >= 300) throw new Error("Something went wrong");
    const gameIndex = yield call(getIndex, data.game_alert);
    yield put({ type: types.GET_GAMES_SUCCESS, payload: data });
    if (gameIndex === -1) {
      yield put({
        type: types.GET_GAMES_ERROR,
        payload:
          "Something went wrong. There's an issue on our end and we can't show this team schedule. Please try again later",
      });
    } else {
      yield put({ type: types.GET_CURRENT_GAME, payload: gameIndex });
    }
  } catch (error) {
    yield put({ type: types.GET_GAMES_ERROR, payload: error });
    if (error?.response?.status === 401) return;
    console.log("error", "Something went wrong");
  }
}

export function* gamesWatcher() {
  yield takeLatest(types.GET_GAMES_START, getSchedule);
}
