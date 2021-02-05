import { combineReducers } from "redux";
import leagues from "./leagues/reducer";
import teams from "./teams/reducer";
import games from "./games/reducer";

export default combineReducers({ leagues, teams, games });
