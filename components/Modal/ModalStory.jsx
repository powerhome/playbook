import React from "react"
import { Modal } from "react-bootstrap"

import { select, boolean } from "@storybook/addon-knobs"

export default function ModalStory(stories) {
  stories.add("Modal",
    () => {
      const props = {
        dialogClassName: select("dialogClassName", [null, 'full'], 'medium'),
        show: boolean("show", false)
      }
      return (
        <Modal {...props} >
          <Modal.Header>
            <Modal.Title>{'Modal Title'}</Modal.Title>
            {'Header'}
          </Modal.Header>
          <Modal.Body>
            {'Body'}
          </Modal.Body>
          <Modal.Footer>
            {'Footer'}
          </Modal.Footer>
        </Modal>
      )
    }
  )
}
