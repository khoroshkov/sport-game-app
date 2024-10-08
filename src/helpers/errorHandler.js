import { store } from "react-notifications-component";

export default function errorHandler(title, message, type) {
  if (!title && !message && !type) return;
  store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 4000,
      onScreen: true,
    },
  });
}
