import React from "react"
import { render, screen } from "../utilities/test-utils"

import { Button, Tooltip } from ".."

const 
  text = "this is a text",
  placement = "top",
  triggerText = "hover me",
  zIndex = "10"

test("renders the component", async () => {
  render(
    <Tooltip 
        data={{ testid: "primary-test" }}
        placement={placement} 
        text={text} 
        zIndex={zIndex}>
        <Button  
            text={triggerText} />
    </Tooltip>
  )
  const kit = screen.getByTestId('primary-test')
  expect(kit).toBeInTheDocument()
  expect(kit).toHaveClass('pb_tooltip_kit')
});
