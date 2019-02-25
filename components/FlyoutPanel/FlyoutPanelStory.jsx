import React from "react"
import FlyoutPanel from "./FlyoutPanel"
import { Modal } from "react-bootstrap"

import { withInfo } from '@storybook/addon-info'
import { select, text, boolean } from "@storybook/addon-knobs"

export default function AvatarStory(stories) {
  stories.add(
    "FlyoutPanel",
    withInfo("Panel that flies from the left or right side")(() => {
      let props = {
        position: select("position", ["left", "right"]),
        show: boolean("show", true),
      }
      return (
        <Modal dialogClassName="full" show={true}>
          <FlyoutPanel {...props}>
            <h1>Content</h1>
            <input />
          </FlyoutPanel>
          <Modal.Header>
            <Modal.Title>{'Modal Title'}</Modal.Title>
            {'Header'}
          </Modal.Header>
          <Modal.Body>
            <h1>Modal Content</h1>
          </Modal.Body>
          <Modal.Footer>
            {'Footer'}
          </Modal.Footer>
        </Modal>
      )
    })
  )
}
