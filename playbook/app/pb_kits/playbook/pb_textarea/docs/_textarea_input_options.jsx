import React, { useState } from "react"

import Textarea from "../_textarea"

const TextareaInputOptions = (props) => {
  const [value1, setValue1] = useState("")
  const [value2, setValue2] = useState("")
  const [value3, setValue3] = useState("")
  const [value4, setValue4] = useState("")

  return (
    <div>
      <Textarea
          id="container-id"
          label="ID on Container"
          name="comment"
          onChange={(e) => setValue1(e.target.value)}
          rows={4}
          value={value1}
          {...props}
      />

      <br />

      <Textarea
          inputOptions={{ id: "textarea-id" }}
          label="ID on Textarea via inputOptions"
          name="comment"
          onChange={(e) => setValue2(e.target.value)}
          rows={4}
          value={value2}
          {...props}
      />

      <br />

      <Textarea
          id="container-id-2"
          inputOptions={{ id: "textarea-id-2" }}
          label="Both Container and Textarea IDs"
          name="comment"
          onChange={(e) => setValue3(e.target.value)}
          rows={4}
          value={value3}
          {...props}
      />

      <br />

      <Textarea
          inputOptions={{
          "aria-label": "Enter description",
          "aria-describedby": "help-text",
          data: { controller: "textarea", action: "focus->handleFocus" },
          id: "description-textarea"
        }}
          label="Data and ARIA Attributes"
          name="description"
          onChange={(e) => setValue4(e.target.value)}
          rows={4}
          value={value4}
          {...props}
      />
    </div>
  )
}

export default TextareaInputOptions
