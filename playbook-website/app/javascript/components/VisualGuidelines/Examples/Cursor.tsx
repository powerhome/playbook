import React from "react"
import { Card, Caption, FlexItem, Pill } from 'playbook-ui'
import Example from '../Templates/Example'

const CURSOR = [
  "auto", "default", "none", "contextMenu", "help", "pointer", "progress", "wait", "cell",
  "crosshair", "text", "verticalText", "alias", "copy", "move", "noDrop", "notAllowed", "grab",
  "grabbing", "eResize", "nResize", "neResize", "nwResize", "sResize", "seResize", "swResize", "wResize",
  "ewResize", "nsResize", "neswResize", "nwseResize", "colResize", "rowResize", "allScroll", "zoomIn", "zoomOut",
]

const Cursor = ({ example }: { example: string }) => (
  <>
    <Example
      example={example}
      globalProps={{
        cursor: CURSOR
      }}
      title="Cursor"
    />
    <Card
      padding="none"
      rounded
      shadow="deeper"
    >
      <FlexItem>
        <Card.Body>
          <Caption
            marginBottom="xs"
            text="Visual Guide"
          />
          {CURSOR.map(function (cursor, i) {
            return <Pill text={cursor} cursor={cursor} key={i} />;
          })}
        </Card.Body>
      </FlexItem>
    </Card>
  </>
)

export default Cursor
