import { all, fork } from "redux-saga/effects";
import { leaguesWatcher } from "./leagues/actions";
import { teamsWatcher } from "./teams/actions";
import { gamesWatcher } from "./games/actions";

export default function* rootSaga() {
  yield all([fork(leaguesWatcher), fork(teamsWatcher), fork(gamesWatcher)]);
}
