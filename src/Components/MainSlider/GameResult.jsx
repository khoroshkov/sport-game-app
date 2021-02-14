import React from "react";
import moment from "moment-timezone";

import dateFormat from "../../helpers/dateFormat";

import EndedGames from "./EndedGames";
import CountDownTimer from "./CountDownTimer";

import styles from "./GameResult.module.css";

export default function GameResult({ date, result }) {
  const gameDate = moment(dateFormat(date)).tz("America/New_York");
  const todayDate = new Date();
  // const todayDate = moment.tz(new Date(), "America/New_York");
  // console.log("todayDate", todayDate);

  const timeFormat = "M/DD/YYYY, hh:mm:ss a";

  const isGameEnded = todayDate > gameDate;

  return (
    <div className={styles.resultContainer}>
      {isGameEnded ? (
        <EndedGames result={result} />
      ) : (
        <CountDownTimer timeTillDate={gameDate} timeFormat={timeFormat} />
      )}
    </div>
  );
}
