import React from "react"
import StepMeter from "./StepMeter"

import { object, select } from "@storybook/addon-knobs"

export default function StepMeterStory(stories) {
  stories.add("StepMeter",
    () => {
      let props = {
        type: select("Type", ["complex", "simple"], "complex"),
        steps: object(
          "steps",
          [
            { id: 1, name: 'Apply', state: 'done'},
            { id: 2, name: 'Screen', state: 'done'},
            { id: 3, name: 'Interview', state: 'started'},
            { id: 4, name: 'Offer', state: 'none'},
            { id: 5, name: 'Hired', state: 'none'},
          ]
        )
      }
      return <StepMeter {...props}/>
    }
  )
}
