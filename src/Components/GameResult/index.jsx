import React from "react";
import EndedGames from "../EndedGames";
import dateFormat from "../../helpers/dateFormat";
import CountDownTimer from "../CountDownTimer";
import moment from "moment-timezone";

export default function GameResult({ date, result }) {
  const gameDate = moment(dateFormat(date)).tz("America/New_York");
  const todayDate = new Date();
  // const todayDate = moment.tz(new Date(), "America/New_York");
  // console.log("todayDate", todayDate);

  const timeFormat = "M/DD/YYYY, hh:mm:ss a";

  const isGameEnded = todayDate > gameDate;

  return (
    <div className="result-container">
      {isGameEnded ? (
        <EndedGames result={result} />
      ) : (
        <CountDownTimer timeTillDate={gameDate} timeFormat={timeFormat} />
      )}
    </div>
  );
}
