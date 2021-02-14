import React from "react";
import styles from "./Location.module.css";

export default function Location({ location }) {
  return (
    <div className={styles.locationContainer}>
      <span>{location}</span>
    </div>
  );
}
