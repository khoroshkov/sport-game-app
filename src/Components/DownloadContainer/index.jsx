import React from "react";
import AppleLogo from "../../img/icons/apple.png";
import AndroidLogo from "../../img/icons/android.png";

export default function DownloadContainer() {
  return (
    <div className="download-app-cont">
      <a
        href="https://www.apple.com/"
        target="_blank"
        rel="noreferrer"
        className="download-app"
      >
        <img src={AppleLogo} alt="apple icon" />
      </a>
      <a
        href="https://www.android.com/"
        target="_blank"
        rel="noreferrer"
        className="download-app"
      >
        <img src={AndroidLogo} alt="android icon" />
      </a>
    </div>
  );
}
