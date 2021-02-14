import React from "react";
import TimerIcon from "../../assets/img/icons/chronometer.svg";

import styles from "./MainLogo.module.css";

export default function MainLogo() {
  return (
    <div className={styles.logoContainer}>
      <span>Downkount</span>
      <div className={`${styles.logoImgCont} ${styles.rotate}`}>
        <img src={TimerIcon} alt="timer icon" />
      </div>
      <span>com</span>
    </div>
  );
}
