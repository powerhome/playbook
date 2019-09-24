import React from "react"
import RangeSlider from "../_range_slider.jsx"

const RangeSliderDefault = () => {
  return (
    <div>
      <RangeSlider id={123} />

      <br /><br />

      <RangeSlider
          className="ml-5"
          data={{ a: 123, b: 321}}
          max={200}
          min={10}
          onChange={e => console.log("on change triggered!")}
          step={10}
      />
    </div>
  )
}

export default RangeSliderDefault;
