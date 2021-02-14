export default function getTeamId(teams, name) {
  if (!teams) return;
  const teamId = teams.find((team) => team.team_url_name === name);
  return teamId.team_id;
}
