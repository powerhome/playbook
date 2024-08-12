import React from "react"
import { Button } from "playbook-ui"

const ButtonDefault = (props) => (
  <div>
    <Button
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        text='Button Primary'
        {...props}
    />{" "}
    <Button
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        text='Button Secondary'
        variant='secondary'
        {...props}
    />{" "}
    <Button
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        text='Button Link'
        variant='link'
        {...props}
    />
    <Button
        disabled
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        text='Button Disabled'
        {...props}
    />
  </div>
)

export default ButtonDefault
