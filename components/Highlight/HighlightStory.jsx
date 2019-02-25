import React from "react"
import Highlight from "./Highlight"
import { select, } from "@storybook/addon-knobs"
import classnames from 'classnames'

export default function HighlightStory(stories) {
  stories.add("Highlight",
    () => {
      let props = {
        side: select("side",['left','right','top','bottom'], 'left'),
        color: select('color',['power-navy','power-red','power-blue','power-gold','power-green','power-navy-darker','power-royal'],'power-blue'),
      }

        const highlightSide = `highlight-${props.side}`
        const highlightColor = `highlight-${props.color}`


      return <Highlight {...props} className={classnames(highlightSide,highlightColor)}/>

    }
  )
}
