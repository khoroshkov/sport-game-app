import React from "react";
import styles from "./ScreenshotButton.module.css";
import ScreenshotIcon from "../../../assets/img/icons/screenshot-icon.svg";

export default function ScreenshotButton({ getScreenshot }) {
  return (
    <button
      className={styles.screenshotBtn}
      onClick={() => getScreenshot()}
      title="save screenshot"
    >
      <img src={ScreenshotIcon} alt="screenshot button icon" />
    </button>
  );
}
