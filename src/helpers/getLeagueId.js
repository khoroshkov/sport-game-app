export default function getLeagueId(leagues, name) {
  if (!leagues) return;
  const leagueId = leagues?.find(
    (league) => league.league_name === name.toUpperCase()
  );
  return leagueId.league_id;
}
