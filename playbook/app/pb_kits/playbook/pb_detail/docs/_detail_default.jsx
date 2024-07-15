import React from "react"
import { Detail } from "../.."

const DetailDefault = () => (
  <div>
    <Detail
        data={{
        "pb-popover-kit": true,
        "pb-popover-trigger-element-id": "popover-element",
        "pb-popover-tooltip-id": "tooltip-element",
        "pb-popover-position": "top",
        "pb-popover-offset": "true",
        "pb-popover-close-on-click": "any",
      }}
        id='popover-element'
        text='Hover over me'
    />
    {/* <div id='tooltip-element' className='hide'>
      Tooltip content
    </div> */}
  </div>
)

export default DetailDefault
