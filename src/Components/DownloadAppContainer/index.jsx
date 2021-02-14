import React from "react";
import AppleLogo from "../../assets/img/icons/apple.png";
import AndroidLogo from "../../assets/img/icons/android.png";

import styles from "./DownloadAppContainer.module.css";

export default function DownloadAppContainer() {
  return (
    <div className={styles.downloadAppCont}>
      <a
        href="https://www.apple.com/"
        target="_blank"
        rel="noreferrer"
        className={styles.downloadApp}
      >
        <img src={AppleLogo} alt="apple icon" />
      </a>
      <a
        href="https://www.android.com/"
        target="_blank"
        rel="noreferrer"
        className={styles.downloadApp}
      >
        <img src={AndroidLogo} alt="android icon" />
      </a>
    </div>
  );
}
