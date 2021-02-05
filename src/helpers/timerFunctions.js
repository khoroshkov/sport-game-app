export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  let angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export function describeArc(x, y, radius, startAngle, endAngle) {
  let start = polarToCartesian(x, y, radius, endAngle);
  let end = polarToCartesian(x, y, radius, startAngle);

  let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  let d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

export function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}

//** unused fuction for converting ms into days, hours, minutes, seconds **/
export function convertMs(duration) {
  let remain = duration;

  let days = Math.floor(remain / (1000 * 60 * 60 * 24));
  remain = remain % (1000 * 60 * 60 * 24);

  let hours = Math.floor(remain / (1000 * 60 * 60));
  remain = remain % (1000 * 60 * 60);

  let minutes = Math.floor(remain / (1000 * 60));
  remain = remain % (1000 * 60);

  let seconds = Math.floor(remain / 1000);
  remain = remain % 1000;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
