import React from "react"
import {Textarea} from "../../"

function TextareaDark() {
  return (
    <div>
      <Textarea label="Label"rows={4} dark/>

      <br/>

      <Textarea label="Label" placeholder="Placeholder text" dark/>

      <br/>

      <Textarea label="Label" placeholder="Placeholder text" value="Default value text" dark/>
      
    </div>
  )
}

export default TextareaDark
