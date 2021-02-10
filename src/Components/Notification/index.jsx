import React from "react";
// import ReactNotificationsComponent from "react-notifications-component";
// import { store } from "react-notifications-component";
// import { useSelector } from "react-redux";

export default function Notification({ message }) {
  // const error = useSelector((state) => state?.games?.error);

  // if (!message) {
  //   return null;
  // } else {
  //   store.addNotification({
  //     title: "Server Error",
  //     message: message,
  //     type: "danger",
  //     insert: "top",
  //     container: "top-right",
  //     animationIn: ["animate__animated", "animate__fadeIn"],
  //     animationOut: ["animate__animated", "animate__fadeOut"],
  //     dismiss: {
  //       duration: 4000,
  //       onScreen: true,
  //     },
  //   });
  // }

  return (
    <div className="notification-cont">
      {/* <ReactNotificationsComponent /> */}
      <p>{message}</p>
    </div>
  );
}
