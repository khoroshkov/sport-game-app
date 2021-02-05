import React from "react";

export default function TvChannel({ channel }) {
  return (
    <div className="channel-cont">{channel && <span>{channel}</span>}</div>
  );
}
