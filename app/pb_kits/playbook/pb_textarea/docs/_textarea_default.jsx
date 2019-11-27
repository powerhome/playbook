import React from "react"
import {Textarea} from "../../"

function TextareaDefault() {
  return (
    <div>
      <Textarea label="Label"/>

      <br/>

      <Textarea label="Label" placeholder="Placeholder text"/>

      <br/>

      <Textarea label="Label" placeholder="Placeholder text" value="Default value text"/>
      
    </div>
  )
}

export default TextareaDefault
