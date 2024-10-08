import { call, put, takeLatest } from "redux-saga/effects";
// import api from "../../services/api";
import types from "../types";

//** temp 1 available league array*/
const tempLeague = {
  leagues: [
    {
      league_name: "NBA",
      league_id: "28",
    },
  ],
};

//** temp function put league to redux store */
function* getLeagues() {
  yield put({ type: types.GET_LEAGUES_SUCCESS, payload: tempLeague });
}

//** API FUNCTION GET LEAGUES LIST - FULLY WORKING VERSION | NO NEED CURRENTLY */

// function* getLeagues() {
//   try {
//     const { status, data } = yield call(api.leagues.getLeagues);
//     if (status < 200 || status >= 300) throw new Error("Something went wrong");
//     if (!data.leagues.length) {
//       yield put({
//         type: types.GET_LEAGUES_ERROR,
//         payload:
//           "It's seems that service is currently unavailable. Try again later",
//       });
//     }
//     yield put({ type: types.GET_LEAGUES_SUCCESS, payload: data });
//   } catch (error) {
//     yield put({
//       type: types.GET_LEAGUES_ERROR,
//       payload:
//         "It's seems that service is currently unavailable. Try again later",
//     });
//     if (error?.response?.status === 401) return;
//     console.log("error", "Something went wrong");
//   }
// }

export function* leaguesWatcher() {
  yield takeLatest(types.GET_LEAGUES_START, getLeagues);
}
