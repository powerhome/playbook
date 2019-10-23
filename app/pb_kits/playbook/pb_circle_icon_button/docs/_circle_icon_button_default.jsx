import React from "react"
import {CircleIconButton} from "../../"

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
