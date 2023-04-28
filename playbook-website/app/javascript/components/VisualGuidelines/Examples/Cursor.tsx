import React from "react"
import { Card, Caption, FlexItem, Flex, Body } from 'playbook-ui'
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
      marginTop="md"
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

          <Body text="Hover over any card below to display its cursor." marginBottom="sm" />

          <Flex gap="xxs" wrap>
            {CURSOR.map(function (cursor, i) {
              return <Card borderRadius="none" padding="xs" cursor={cursor} key={i}>
                {cursor}
              </Card>
            })}
          </Flex>
          </Card.Body>
      </FlexItem>
    </Card>
  </>
  )

  export default Cursor