import React from "react";

export default function Notification({ message }) {
  return (
    <div className="notification-cont">
      <p>{message}</p>
    </div>
  );
}
