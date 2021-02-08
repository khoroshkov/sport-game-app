import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
import MainLogo from "../MainLogo";
// import Zoom from "react-reveal/Zoom";
import ChoiceTitle from "../ChoiceTitle";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import useSessionStorage from "../../hooks/useSessionStorage";
import MainSlider from "../MainSlider";
import Notification from "../Notification";
import DownloadContainer from "../DownloadContainer";
import types from "../../redux/types";
import getIndex from "../../helpers/getIndex";
import "react-notifications-component/dist/theme.css";

export default function Dashboard({ match, location }) {
  const dispatch = useDispatch();
  const leagues = useSelector((state) => state?.leagues?.data?.leagues);
  const teams = useSelector((state) => state?.teams?.data?.teams);
  const currentGame = useSelector((state) => state?.games?.current);
  const games = useSelector((state) => state?.games?.data?.game_alert);
  const loading = useSelector((state) => state?.games?.loading);
  const errorMessages = useSelector((state) => state?.games?.error);

  console.log("errorMessages", errorMessages);

  // console.log("leagues", leagues);
  // console.log("teams", teams);
  // console.log("currentGame", currentGame);
  // console.log("games", games);

  // console.log("currentGame - DASHBOARD", currentGame);

  // const gameId = useParams();
  // const history = useHistory();

  const teamRef = useRef();

  const [allTeams, setAllTeams] = useState([]);
  const [teamsList, setTeamsList] = useState([]);
  const [isLoading, setIsloading] = useState(null);
  const [team, setTeam] = useState("");
  const [league, setLeague] = useState("");

  const [savedTeam, setSavedTeam] = useSessionStorage("teams-id", "");
  const [savedLeague, setSavedLeague] = useSessionStorage("leagues-id", "");

  // const teamName = sessionStorage.getItem("team-name");

  const [defaultTeamValue, setDefaultTeamValue] = useState(
    savedTeam ? savedTeam : "select"
  );
  const [defaultLeagueValue, setDefaultLeagueValue] = useState(
    savedLeague ? savedLeague : "select"
  );

  const defaultBackground = league ? league : "basic";

  const [background, setBackground] = useState(() =>
    loadImage(defaultBackground)
  );

  const [currentGameIndex, setCurrentGameIndex] = useState(currentGame);

  // refresh page function and get info from sessionStorage -- NOT WORKING NOW!!!!
  // useEffect(() => {
  //   const storedData = JSON.parse(sessionStorage.getItem("game-data"));
  //   const storedTeamsList = JSON.parse(
  //     sessionStorage.getItem("teams-list-data")
  //   );
  //   const selectedTeam = sessionStorage.getItem("game-time-app-teams-id");
  //   const selectedLeague = sessionStorage.getItem("game-time-app-leagues-id");
  //   const teamName = sessionStorage.getItem("team-name");
  //   const currentGameId = sessionStorage.getItem("current-game-id");
  //   console.log("selectedTeam", selectedTeam);

  //   if (selectedTeam) {
  //     setAllTeams(storedData);
  //     setTeamsList(storedTeamsList);
  //     setDefaultTeamValue(selectedTeam);
  //     setDefaultLeagueValue(selectedLeague);
  //     setTeam(teamName);
  //     setLeague(selectedLeague);
  //     setCurrentGameIndex(currentGameId);
  //   }
  // }, []);

  // set info to session storage
  // useEffect(() => {
  //   sessionStorage.setItem("game-data", JSON.stringify(allTeams));
  //   sessionStorage.setItem("teams-list-data", JSON.stringify(teamsList));
  //   sessionStorage.setItem("team-name", team);
  //   sessionStorage.setItem("current-game-id", currentGameIndex);
  // }, [allTeams, team, currentGameIndex, teamsList]);

  // change background function
  function loadImage(imgName) {
    if (imgName) {
      let image = imgName.replace(/['"«»]/g, "");
      import(`../../img/backgrounds/${image}.jpg`)
        .then((image) => setBackground(image.default))
        .catch((error) => console.log("Error", error));
    }
  }

  // change background image depends on league selection
  useEffect(() => {
    if (league !== "") {
      loadImage(league);
    } else {
      loadImage(defaultBackground);
    }
  }, [league]);

  function handleLeagueChange(e) {
    //API fetch for teams list
    if (e.target.value === "28") {
      dispatch({
        type: types.GET_TEAMS_START,
      });
    }

    setLeague(e.target.value);
    setSavedLeague(e.target.value);
    setDefaultLeagueValue(e.target.value);
    loadImage(e.target.value);

    teamRef.current.value = "select";
  }

  function handleTeamsChange(e) {
    const selectedTeam = teams?.find((team) => team.team_id === e.target.value);

    //API fetch games info
    setIsloading(loading);
    dispatch({
      type: types.GET_GAMES_START,
      payload: selectedTeam.team_id,
    });

    setAllTeams(games);
    setCurrentGameIndex(getIndex(allTeams));

    setTeam(selectedTeam.team_name);
    // console.log("selectedTeam.team_name", selectedTeam.team_name);
    // console.log("CurrentGameIndex - DASHBOARD", currentGameIndex);
    setSavedTeam(selectedTeam.team_id);
    setDefaultTeamValue(selectedTeam.team_id);
    // history.replace(`/${e.target.value}/games/${currentGameIndex}`);
  }

  // let isChoiceMade = !!leagues && !!games;
  let isChoiceMade = !!currentGame;

  if (errorMessages) {
    store.addNotification({
      title: "Server Error",
      message: errorMessages,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: true,
      },
    });
  }

  return (
    <>
      <div className="container main-container">
        <div className="main-bg-img">
          <img src={background} alt="background sport" />
        </div>
        <div className="container-adv">
          <span>Advertasing block left</span>
        </div>
        <div className="home-container">
          <MainLogo />

          <div className="select-container">
            <div className="select">
              <span className="select-options-title">League</span>
              <select
                onChange={handleLeagueChange}
                value={defaultLeagueValue}
                className="league-select"
              >
                <option default value="select" disabled>
                  Select
                </option>
                {leagues?.map((league) => (
                  <option
                    value={league.league_id}
                    key={league.league_id}
                    // defaultValue={defaultLeagueValue}
                    className="options-league-item"
                  >
                    {league.league_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="select">
              <span className="select-options-title">Team</span>
              <select
                onChange={handleTeamsChange}
                // defaultValue={defaultTeamValue}
                value={defaultTeamValue}
                className="team-select"
                ref={teamRef}
              >
                <option default value="select" disabled>
                  Select
                </option>
                {teams?.map((team) => (
                  <option
                    // defaultValue={defaultTeamValue}
                    value={team.team_id}
                    key={team.team_id}
                    className="options-item"
                  >
                    {team.team_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ReactNotification />
          {/* {errorMessages && <Notification message={errorMessages} />} */}

          {isChoiceMade ? (
            <MainSlider
              team={team}
              slides={games}
              currentGameIndex={currentGame}
              isLoading={loading}
            />
          ) : (
            <ChoiceTitle />
          )}
        </div>
        <div className="container-adv">
          <span>Advertasing block right</span>
        </div>
      </div>
      <div className="container bottom-container">
        <div className="container-adv-bottom">
          <span>Bottom advertasing block</span>
        </div>
        <DownloadContainer />
      </div>
    </>
  );
}
