import React from "react"
import Grade from "./Grade"

import { number, text } from "@storybook/addon-knobs"

export default function GradeStory(stories) {
  stories.add("Grade",
    () => {
      let props = {
        grade: number("grade", 8.5, { range: true, min: 0, max: 10, step: 0.5 }),
        starFullAt: number("starFullAt", 10, { range: true, min: 0, max: 10, step: 0.5 }),
        starEmptyAt: number("starEmptyAt", 0, { range: true, min: 0, max: 10, step: 0.5 }),
        label: text("label", "Grade")
      }
      return <Grade {...props}/>
    }
  )
}
