import axios from "axios";

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
