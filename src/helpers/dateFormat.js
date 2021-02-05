import moment from "moment";

const region = "America/New_York";
const dateTimeFormat = "YYYY-M-D H:m a";

export default function dateFormat(str) {
  const dateArray = str.split("");

  const timeAmPm = dateArray.slice(Math.max(dateArray.length - 2, 0)).join("");

  const years = dateArray.slice(0, 4).join("");
  const month = dateArray.slice(4, 6).join("");
  const days = dateArray.slice(6, 8).join("");

  const hours = dateArray.slice(8, 10).join("");
  const minutes = dateArray.slice(10, 12).join("");

  // const date = new Date(
  //   `${years}-${month}-${days}:${hours}:${minutes}:${timeAmPm}`
  // ).toISOstring();

  // const date = `${years}-${month}-${days}:${hours}:${minutes}:${timeAmPm}`;

  let date = moment.tz(
    `${years}-${month}-${days}:${hours}:${minutes}:${timeAmPm}`,
    dateTimeFormat,
    region
  );
  return date;
}
