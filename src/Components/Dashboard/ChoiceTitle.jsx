import React from "react";
import styles from "./ChoiceTitle.module.css";

export default function ChoiceTitle() {
  return (
    <div className={styles.choiceTitleContainer}>
      <p>Select your league and then your team</p>
    </div>
  );
}
