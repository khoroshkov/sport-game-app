import React from "react";

export default function ScreenshotButton({ getScreenshot, ScreenshotIcon }) {
  return (
    <button
      className="screenshot-btn"
      onClick={() => getScreenshot()}
      title="save screenshot"
    >
      <img src={ScreenshotIcon} alt="screenshot button icon" />
    </button>
  );
}
