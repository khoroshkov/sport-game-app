import React from "react";
import moment from "moment-timezone";

import dateFormat from "../../helpers/dateFormat";

import GameInProgress from "./GameInProgress";
import EndedGames from "./EndedGames";
import CountDownTimer from "./CountDownTimer";

import styles from "./GameResult.module.css";

export default function GameResult({ date, result }) {
  const gameDate = moment(dateFormat(date)).tz("America/New_York");
  const todayDate = moment(new Date()).tz("America/New_York");

  // END GAME TIME = EVENT_START + 4 hours
  const gameEndTime = moment(dateFormat(date))
    .tz("America/New_York")
    .add(4, "h");

  const timeFormat = "M/DD/YYYY, hh:mm:ss a";
  const isGameInProgress = todayDate > gameDate && todayDate < gameEndTime;

  const isGameEnded = todayDate > gameEndTime;

  return (
    <div className={styles.resultContainer}>
      {isGameInProgress && <GameInProgress />}
      {isGameEnded ? (
        <EndedGames result={result} />
      ) : (
        !isGameInProgress && (
          <CountDownTimer timeTillDate={gameDate} timeFormat={timeFormat} />
        )
      )}
    </div>
  );
}
