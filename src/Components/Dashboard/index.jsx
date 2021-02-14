import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useSessionStorage from "../../hooks/useSessionStorage";

import Loader from "react-loader-spinner";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";

import MainLogo from "../MainLogo";
import ChoiceTitle from "./ChoiceTitle";
import MainSlider from "../MainSlider";

import types from "../../redux/types";
import {
  getTeamsList,
  getLeaguesList,
  getTeamsShedule,
} from "../../services/api";
import getLeagueId from "../../helpers/getLeagueId";
import getTeamId from "../../helpers/getTeamId";
import getGameIndex from "../../helpers/getGameIndex";
import errorHandler from "../../helpers/errorHandler";

import "react-notifications-component/dist/theme.css";
import styles from "./Dasboard.module.css";

export default function Dashboard({ match, location }) {
  const dispatch = useDispatch();
  const leagues = useSelector((state) => state?.leagues?.data?.leagues);
  const teams = useSelector((state) => state?.teams?.data?.teams);
  const currentGame = useSelector((state) => state?.games?.current);
  const games = useSelector((state) => state?.games?.data?.game_alert);
  const loading = useSelector((state) => state?.games?.loading);
  const errorMessages = useSelector((state) => state?.games?.error);

  // const history = useHistory();
  const teamRef = useRef();

  const [allGames, setAllGames] = useState(games);
  const [teamsList, setTeamsList] = useState(teams);
  const [currentGameIndex, setCurrentGameIndex] = useState(currentGame);
  const [team, setTeam] = useState("");
  const [teamNickname, setTeamNickname] = useState("");
  const [league, setLeague] = useState("");

  //** CUSTOM HOOK FOR SAVING TEAM's and LEAGUE's NAMES and IDs TO SESSION STORAGE *//
  const [savedTeamId, setSavedTeamId] = useSessionStorage("teams-id", "");
  const [savedLeagueId, setSavedLeagueId] = useSessionStorage("leagues-id", "");
  const [savedTeamName, setSavedTeamName] = useSessionStorage("team-name", "");
  const [savedLeagueName, setSavedLeagueName] = useSessionStorage(
    "league-name",
    ""
  );
  const [savedTeamList, setSavedTeamList] = useSessionStorage(
    "teams-list",
    teams || []
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

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCompleted, setLoadedCompleted] = useState(false);

  /** UPDATE ALL GAMES, TEAMS and CURRENT GAME ID in SESSION STORAGE AFTER API COMPLETED */

  useEffect(() => {
    if (currentGame && games && teams) {
      setSavedAllGames(games);
      setSavedCurrentGameId(currentGame);
      setSavedTeamList(teams);
      setTeamsList(teams);
      setCurrentGameIndex(currentGame);
    }
  }, [league, currentGame, games, teams, currentGame]);

  //** PARSE URL PARAMS and API FUNCTION AFTRE LINK SHARED */
  useEffect(() => {
    if (match.params.id && !savedTeamId && !savedLeagueId) {
      setIsLoaded(true);
      getLeaguesList().then((res) => {
        const leagueId = getLeagueId(res, match.params.league);
        setDefaultLeagueValue(leagueId);
        setLeague(leagueId);
        setSavedLeagueId(leagueId);
        loadImage(leagueId);
        setSavedLeagueName(match.params.league);
        //** hardcoded number for NBA league available */
        if (leagueId === "28") {
          dispatch({
            type: types.GET_TEAMS_START,
          });
          getTeamsList().then((res) => {
            if (!res) {
              errorHandler(
                "Server error",
                "There is a network error. Please, try again later",
                "danger"
              );
            }
            const teamId = getTeamId(res, match.params.team);
            dispatch({
              type: types.GET_GAMES_START,
              payload: teamId,
            });

            setTeamsList(res);
            setDefaultTeamValue(teamId);
            setSavedTeamId(teamId);
            setTeamNickname(match.params.team);
            setTeam(match.params.team);
            getTeamsShedule(teamId)
              .then((res) => {
                if (!res) {
                  errorHandler(
                    "Server error",
                    "There is a network error. Please, try again later",
                    "danger"
                  );
                }
                const gameId = getGameIndex(res, match.params.id);
                setCurrentGameIndex(gameId);
                setAllGames(res);
              })
              .catch((error) => console.log(error))
              .finally(() => {
                setIsLoaded(false);
                setLoadedCompleted(true);
              });
          });
        }
      });
    } else {
      // console.log("link NOT SHARED");
    }
  }, []);

  //** refresh page function and get info from sessionStorage *//-- NOT WORKING FOR NOW!!!!
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
      // console.log("NOT full url");
      // history.push("/");
    }
  }, []);

  //** CHANGE BACKGROUND FUNCTION */
  function loadImage(imgName) {
    if (imgName) {
      let image = imgName.replace(/['"«»]/g, "");
      import(`../../assets/img/backgrounds/${image}.jpg`)
        .then((image) => setBackground(image.default))
        .catch((error) => console.log("Error", error));
    }
  }

  //** CHANGE BACKGROUND IMAGE DEPENDS ON SELECTED LEAGUE  */
  useEffect(() => {
    if (league !== "") {
      loadImage(league);
    } else {
      loadImage(defaultBackground);
    }
  }, [league]);

  //** LEAGUE SELECTION FUNCTION */
  function handleLeagueChange(e) {
    const selectedLeagueName = leagues?.find(
      (league) => league.league_id === e.target.value
    );
    //** temporary hardcoded value for NBA league available */
    if (e.target.value === "28") {
      dispatch({
        type: types.GET_TEAMS_START,
      });
    } else {
      errorHandler(
        "Ooops....",
        "This league is currently unavailable but we're working hard. Please try again later",
        "info"
      );

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

  //** TEAM SELECTION FUNCTION */

  function handleTeamsChange(e) {
    const selectedTeam = (teams || savedTeamList)?.find(
      (team) => team.team_id === e.target.value
    );

    dispatch({
      type: types.GET_GAMES_START,
      payload: selectedTeam.team_id,
    });

    setTeam(selectedTeam.team_name);
    setTeamNickname(selectedTeam.team_nickname);
    setSavedTeamId(selectedTeam.team_id);
    setSavedTeamName(selectedTeam.team_name);
    setDefaultTeamValue(selectedTeam.team_id);

    if (errorMessages) {
      errorHandler("Server Error", errorMessages, "danger");
    }
  }

  //** RENDER SLIDER IF TEAMS and GAMES INFO COMPLETED */
  let isChoiceMade = !!currentGame || loadedCompleted;

  return (
    <>
      <ReactNotification />

      <div className={`${styles.container} ${styles.mainContainer}`}>
        <div className={styles.mainBgImg}>
          <img src={background} alt="background sport" />
        </div>
        <div className={styles.containerAdv}>
          <span>Advertasing block left</span>
        </div>
        <div className={styles.homeContainer}>
          <MainLogo />

          {isLoaded && (
            <Loader
              type="TailSpin"
              color="#ff3366"
              height={200}
              width={200}
              timeout={3000}
              className={styles.loader}
            />
          )}

          <div className={styles.selectContainer}>
            <div className={styles.select}>
              <span className={styles.selectOptionsTitle}>League</span>
              <select
                onChange={handleLeagueChange}
                value={defaultLeagueValue}
                className={styles.leagueSelect}
              >
                <option default value="select" disabled>
                  Select
                </option>
                {leagues?.map((league) => (
                  <option
                    value={league.league_id}
                    key={league.league_id}
                    className={styles.optionsLeagueItem}
                  >
                    {league.league_name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.select}>
              <span className={styles.selectOptionsTitle}>Team</span>
              <select
                onChange={handleTeamsChange}
                value={defaultTeamValue}
                className={styles.teamSelect}
                ref={teamRef}
              >
                <option default value="select" disabled>
                  Select
                </option>
                {(teams || teamsList)?.map((team) => (
                  <option
                    value={team.team_id}
                    key={team.team_id}
                    className={styles.optionsItem}
                  >
                    {team.team_name} {team.team_nickname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isChoiceMade ? (
            <MainSlider
              league={savedLeagueName}
              teamNickname={teamNickname}
              team={team || savedTeamName}
              slides={games || allGames}
              currentGameIndex={currentGame || currentGameIndex}
              isLoading={loading}
            />
          ) : (
            <ChoiceTitle />
          )}
        </div>
        <div className={styles.containerAdv}>
          <span>Advertasing block right</span>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.containerAdvBottom}>
          <span>Bottom advertasing block</span>
        </div>
      </div>
    </>
  );
}
