import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment-timezone";
import { mapNumber, describeArc } from "../../helpers/timerFunctions";

import styles from "./CountDownTimer.module.css";

export default function CountDownTimer({ timeTillDate, timeFormat }) {
  const [timer, setTimer] = useState({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });

  const tempTimeDiff = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      // let then = moment(timeTillDate).tz("America/New_York");
      let then = timeTillDate;
      let now = moment.tz("America/New_York");
      let countdown = moment(then - now);

      //remaining time in milliseconds
      // let remainingTime = parseInt(countdown.format("x"));

      // ** old variant with days up to 30-31 only **//
      // let days = parseInt(countdown.format("DD"));

      let days = parseInt(then.diff(now, "days"));
      let hours = parseInt(countdown.format("H"));
      let minutes = countdown.format("mm");
      let seconds = countdown.format("ss");

      //** using my functions - strange behaviour **/
      // let { days, hours, minutes, seconds } = convertMs(remainingTime);

      setTimer({
        days,
        hours: hours - tempTimeDiff,
        minutes,
        seconds,
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeTillDate]);

  let { days, hours, minutes, seconds } = timer;

  if (!seconds) {
    return null;
  }
  //** FUNCTIONS FOR DRAWING CIRCLES AROUND TIMERS */

  // let daysRadius = mapNumber(days, 60, 0, 0, 360);
  // let hoursRadius = mapNumber(hours, 24, 0, 0, 360);
  // let minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
  // let secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

  // const SVGCircle = ({ radius }) => (
  //   <svg className={styles.countdownSvg}>
  //     <path
  //       fill="none"
  //       stroke="#ff0241"
  //       strokeWidth="3"
  //       d={describeArc(50, 50, 48, 0, radius)}
  //     />
  //   </svg>
  // );

  return (
    <>
      <div className={styles.countdownWrapper}>
        {days !== 0 && (
          <div className={styles.countdowItem}>
            {/* <SVGCircle radius={daysRadius} /> */}
            <span className={styles.countdowItemNumber}>{days}</span>
            <span className={styles.countdowItemDesc}>
              {days === 1 ? "day" : "days"}
            </span>
          </div>
        )}
        {hours !== 0 && hours > 0 && (
          <div className={styles.countdowItem}>
            {/* <SVGCircle radius={hoursRadius} /> */}
            <span className={styles.countdowItemNumber}>{hours}</span>
            <span className={styles.countdowItemDesc}>
              {hours === 1 ? "hour" : "hours"}
            </span>
          </div>
        )}
        {minutes && (
          <div className={styles.countdowItem}>
            {/* <SVGCircle radius={minutesRadius} /> */}
            <span className={styles.countdowItemNumber}>{minutes}</span>
            <span className={styles.countdowItemDesc}>
              {minutes === 1 ? "minute" : "minutes"}
            </span>
          </div>
        )}
        {seconds && (
          <div className={styles.countdowItem}>
            {/* <SVGCircle radius={secondsRadius} /> */}
            <span className={styles.countdowItemNumber}>{seconds}</span>
            <span className={styles.countdowItemDesc}>seconds</span>
          </div>
        )}
      </div>
    </>
  );
}
