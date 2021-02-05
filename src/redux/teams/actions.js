import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../services/API";
import types from "../types";

function* getTeams() {
  try {
    const { status, data } = yield call(api.teams.getTeams);
    if (status < 200 || status >= 300) throw new Error("Something went wrong");
    yield put({ type: types.GET_TEAMS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_TEAMS_ERROR });
    if (error?.response?.status === 401) return;
    console.log("error", "Something went wrong");
  }
}

export function* teamsWatcher() {
  yield takeLatest(types.GET_TEAMS_START, getTeams);
}
