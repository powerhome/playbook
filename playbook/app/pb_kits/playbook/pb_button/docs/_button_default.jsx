import React from "react"
import { Button } from "../../"

const ButtonDefault = (props) => (
  <div>
    <Button
        hover="product_5_background"
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        text='Button Primary'
        {...props}
    />{" "}
    <Button
        hover="text_lt_light"
        marginRight='lg'
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        text='Button Secondary'
        variant='secondary'
        {...props}
    />{" "}
    <Button
        hover="product_5_background"
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
