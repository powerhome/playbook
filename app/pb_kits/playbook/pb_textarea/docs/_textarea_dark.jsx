import React from "react"
import { Textarea } from "../../"

function TextareaDark() {
  return (
    <div>
      <Textarea
          dark
          label="Label"
          rows={4}
      />

      <br />

      <Textarea
          dark
          label="Label"
          placeholder="Placeholder text"
      />

      <br />

      <Textarea
          dark
          label="Label"
          name="comment"
          placeholder="Placeholder text"
          value="Default value text"
      />

    </div>
  )
}

export default TextareaDark
