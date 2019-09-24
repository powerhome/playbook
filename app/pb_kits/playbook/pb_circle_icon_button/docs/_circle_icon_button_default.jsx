import React from "react"
import CircleIconButton from "../_circle_icon_button.jsx"

const CircleIconButtonDefault = () => (
    <div>
      <CircleIconButton icon="plus"
                        link="https://www.google.com"
      />
      <br/>
      <br/>
      <CircleIconButton
                        icon="pen"
                        variant="secondary"
                        link="https://www.google.com"
      />
    </div>
  )

export default CircleIconButtonDefault;
