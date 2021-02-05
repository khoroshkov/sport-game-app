import React from "react";
import TimerIcon from "../../img/icons/chronometer.svg";

export default function MainLogo() {
  return (
    <div className="main-logo-container">
      <span>game</span>
      <div className="main-logo-img-cont rotate">
        <img src={TimerIcon} alt="timer icon" />
      </div>

      <span>time</span>
    </div>
  );
}
