import React from "react"
import classnames from 'classnames'
import {select,boolean} from "@storybook/addon-knobs"
import { Modal } from "react-bootstrap"


export default function SideModalStory(stories) {
  stories.add("SideModal",
    () => {

      const props = {

        side: select("side",['left','right'], 'left'),
        sizeOption: select("sizeOption",['xxs','xs','sm','md','lg','xl','full','600','1000'],'xs'),
        collapseSize: select("collapseSize",['xs','sm','md','lg'],'xs'),
        show: boolean("show", true),

      }

      const side = props.side + 'Modal'
      const sizeOption = side +'-'+ props.sizeOption
      const collapseSize = side +'-collapse-'+props.collapseSize

      return   (<Modal {...props}
          className={classnames(side, sizeOption, collapseSize)}

                />)

    }
  )
}
