import React from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";

import styles from "./TWShare.module.css";

export default function TwitterShare({ url }) {
  const baseURl = "https://joebredley.com";
  const fullUrl = baseURl + url;
  return (
    <TwitterShareButton
      url={fullUrl}
      quote={"Today's big game!!!!"}
      hashtag="#game"
      className={styles.twButton}
      title="share on Twitter"
    >
      <TwitterIcon size={48} />
    </TwitterShareButton>
  );
}
