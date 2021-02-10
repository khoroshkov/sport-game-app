import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import MainLogo from "../MainLogo";
// import Zoom from "react-reveal/Zoom";
import ChoiceTitle from "../ChoiceTitle";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import useSessionStorage from "../../hooks/useSessionStorage";
import MainSlider from "../MainSlider";
// import Notification from "../Notification";
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

  // const gameId = useParams();
  const history = useHistory();

  const teamRef = useRef();

  const [allGames, setAllGames] = useState(games);
  const [teamsList, setTeamsList] = useState(teams);
  const [currentGameIndex, setCurrentGameIndex] = useState(currentGame);
  const [team, setTeam] = useState("");
  const [league, setLeague] = useState("");

  //** custom hooks for saving Teams's and League's names and ids to Session storage **//
  const [savedTeamId, setSavedTeamId] = useSessionStorage("teams-id", "");
  const [savedLeagueId, setSavedLeagueId] = useSessionStorage("leagues-id", "");
  const [savedTeamName, setSavedTeamName] = useSessionStorage("team-name", "");
  const [savedLeagueName, setSavedLeagueName] = useSessionStorage(
    "league-name",
    ""
  );
  const [savedTeamList, setSavedTeamList] = useSessionStorage(
    "teams-list",
    teams
  );
  const [savedCurrentGameId, setSavedCurrentGameId] = useSessionStorage(
    "current-game-id",
    ""
  );
  const [savedAllGames, setSavedAllGames] = useSessionStorage("all-games", []);

  const [defaultTeamValue, setDefaultTeamValue] = useState(
    savedTeamId ? savedTeamId : "select"
  );
  const [defaultLeagueValue, setDefaultLeagueValue] = useState(
    savedLeagueId ? savedLeagueId : "select"
  );

  const defaultBackground = league ? league : "basic";

  const [background, setBackground] = useState(() =>
    loadImage(defaultBackground)
  );

  /** Update all games and current game id in Session Storage after API completed **/
  useEffect(() => {
    if (currentGame && games && teams) {
      setSavedAllGames(games);
      setSavedCurrentGameId(currentGame);
      setSavedTeamList(teams);
      setTeamsList(teams);
      console.log("teams", teams);
      setCurrentGameIndex(currentGame);
    }
  }, [league, currentGame, games, teams, currentGame]);

  //** refresh page function and get info from sessionStorage **//-- NOT WORKING FOR NOW!!!!
  useEffect(() => {
    if (
      savedTeamId &&
      savedLeagueId &&
      savedTeamName &&
      savedLeagueName &&
      savedCurrentGameId &&
      savedAllGames
    ) {
      console.log("full url");
      setAllGames(savedAllGames);
      setDefaultTeamValue(savedTeamId);
      setDefaultLeagueValue(savedLeagueId);
      setTeamsList(savedTeamList);
      setCurrentGameIndex(savedCurrentGameId);
    } else {
      console.log("NOT full url");
      history.push("/");
    }
  }, []);

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
    const selectedLeagueName = leagues?.find(
      (league) => league.league_id === e.target.value
    );

    //API fetch for teams list
    if (e.target.value === "28") {
      dispatch({
        type: types.GET_TEAMS_START,
      });
    } else {
      store.addNotification({
        title: "Ooops....",
        message:
          "This league is currently unavailable but we're working hard. Please try again later",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      setDefaultTeamValue("select");
    }

    setLeague(e.target.value);
    setSavedLeagueId(e.target.value);
    setSavedLeagueName(selectedLeagueName.league_name);
    setTeamsList(teams);
    setSavedTeamList(teams);
    setDefaultLeagueValue(e.target.value);
    loadImage(e.target.value);

    teamRef.current.value = "select";
  }

  function handleTeamsChange(e) {
    const selectedTeam = (teams || savedTeamList)?.find(
      (team) => team.team_id === e.target.value
    );

    dispatch({
      type: types.GET_GAMES_START,
      payload: selectedTeam.team_id,
    });

    setTeam(selectedTeam.team_name);
    setSavedTeamId(selectedTeam.team_id);
    setSavedTeamName(selectedTeam.team_name);
    setDefaultTeamValue(selectedTeam.team_id);
    // history.replace(`/${e.target.value}/games/${currentGameIndex}`);

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
  }

  // let isChoiceMade = !!currentGame;
  let isChoiceMade = !!currentGame;

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
                {(teams || teamsList)?.map((team) => (
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
              team={team || savedTeamName}
              slides={games || allGames}
              currentGameIndex={currentGame || currentGameIndex}
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
