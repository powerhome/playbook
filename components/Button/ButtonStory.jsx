import React from "react"
import classnames from 'classnames'
import { Button } from "react-bootstrap"
import Icon from "../Icon/Icon"
import { text, select } from "@storybook/addon-knobs"



export default function ButtonStory(stories) {
  stories.add("Solid Buttons",
    () => {
      let props = {
        className: text("className", "btn-default"),
        text: text("text", "Click Me"),
        type: select("type", ["anchor", "button", "submit", ""], "button"),
        cap: select("cap",["left", "right", "top", "bottom","none"],"none"),
      }

      const cap = `cap-${props.cap}`


      return (
        <div className="container my-5">
          <div className="row">
            <div className="col-sm-2">
              <Button {...props} className={classnames(cap,props.className)}>Default</Button>
            </div>
            <div className="col-sm-2">
              <Button className="btn-primary" type="button">Power Royal</Button>
            </div>
            <div className="col-sm-2">
              <Button className="btn-success" type="button">Power Green</Button>
            </div>
            <div className="col-sm-2">
              <Button className="btn-danger" type="button">Power Red</Button>
            </div>
            <div className="col-sm-2">
              <Button className="btn-link" type="button">Link Button</Button>
            </div>
          </div>
        </div>
      )
    }
  )

  stories.add("Ghost Buttons",
    () => {
      const props = {
        className: text("className", "btn-ghost-power-royal"),
      }

      const cap = `cap-${props.cap}`

      return (
        <div className="row">
          <div className="col-sm-3">
            <Button {...props}>
            Power Royal
            </Button>
          </div>
          <div className="col-sm-3">
            <Button className="btn-ghost-power-green">
              Power Green
            </Button>
          </div>
          <div className="col-sm-3">
            <Button className="btn-ghost-power-red">
            Power Red
            </Button>
          </div>
        </div>
      )
    }
  )



  stories.add("Card Toggle Buttons",
    () => {
      const props = {
        className: text("className", "btn-card-toggle"),
        type: select("type", ["anchor", "button", "submit", ""], "button")
      }

      return (
          <Button {...props}>
            <Icon name="chevron-down" />
          </Button>
      )
    }
  )


}
