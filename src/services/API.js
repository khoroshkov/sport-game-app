import axios from "axios";

export async function getTeamsShedule(id) {
  try {
    const response = await axios.get(
      `https://beta.districtapps.com/get_schedule.php?team_id=${id}`
    );
    return response.data.game_alert;
  } catch (error) {
    console.log("Error", error);
  }
}

export async function getTeamsList() {
  try {
    const response = await axios.get(
      "https://beta.districtapps.com/get_teams.php"
    );
    return response.data.teams;
  } catch (error) {
    console.log(error);
  }
}

export async function getLeaguesList() {
  try {
    const response = await axios.get(
      "http://beta.districtapps.com/get_leagues.php"
    );
    return response.data.leagues;
  } catch (error) {
    console.log(error);
  }
}

axios.defaults.baseURL = "https://beta.districtapps.com/";

const api = {
  leagues: {
    getLeagues: () => axios.get("get_leagues.php"),
  },
  teams: {
    getTeams: () => axios.get("get_teams.php"),
  },
  games: {
    getSchedule: (id) => axios.get(`get_schedule.php?team_id=${id}`),
  },
};

export default api;
