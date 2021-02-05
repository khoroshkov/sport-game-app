import React from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";

export default function TwitterShare({ url }) {
  const baseURl = "https://joebredley.com";
  const fullUrl = baseURl + url;
  return (
    <TwitterShareButton
      url={fullUrl}
      quote={"Today's big game!!!!"}
      hashtag="#game"
      className="twitter-button"
      title="share on Twitter"
    >
      <TwitterIcon size={48} />
    </TwitterShareButton>
  );
}
