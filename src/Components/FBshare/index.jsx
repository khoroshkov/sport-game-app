import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";

export default function FBshare({ url }) {
  const baseURl = "https://joebredley.com";
  const fullUrl = baseURl + url;
  return (
    <FacebookShareButton
      url={fullUrl}
      quote={"Today's big game!!!!"}
      hashtag="#game"
      className="fb-button"
      title="share on Facebook"
    >
      <FacebookIcon size={48} />
    </FacebookShareButton>
  );
}
