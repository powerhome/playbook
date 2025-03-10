import React from "react"
import Button from "../../pb_button/_button"

const ButtonHover = (props) => (
  <div>
    <div>
      <Button
          hover={{ shadow: "deep" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Shadow Deep'
          {...props}
      />{" "}
      <Button
          hover={{ shadow: "deeper" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Shadow Deeper'
          variant='secondary'
          {...props}
      />{" "}
      <Button
          hover={{ shadow: "deepest" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Shadow Deepest'
          variant='link'
          {...props}
      />
    </div>
  </div>
)

export default ButtonHover
