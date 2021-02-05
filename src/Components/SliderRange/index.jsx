import React from "react";
import ReactSlider from "react-slider";

//** unused component **/

export default function SliderRange() {
  return (
    <ReactSlider
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    />
  );
}
