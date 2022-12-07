import React from "react"
import { Button } from "../../"

const ButtonDefault = (props) => (
  <div>
    <Button
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        text='Button Primary'
        {...props}
    />{" "}
    <Button
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        text='Button Secondary'
        variant='secondary'
        {...props}
    />{" "}
    <Button
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        text='Button Link'
        variant='link'
        {...props}
    />
    <Button
        disabled
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        text='Button Disabled'
        {...props}
    />
  </div>
)

export default ButtonDefault
