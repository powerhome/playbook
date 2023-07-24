import React, {useState} from "react"
import { Button } from "../../"

const ButtonReaction = (props) => {

const [highlightActive, setHighlightActive] =useState(false)

return (
  <div>
    <Button
        count={5}
        icon="😍"
        tabIndex={0}
        variant="reaction"
        {...props}
    />
    <Button
        count={153}
        highlight = {highlightActive}
        icon="&#127881;"
        marginLeft='lg'
        onClick={()=> setHighlightActive(!highlightActive)}
        tabIndex={0}
        variant="reaction"
        {...props}
    />
    <Button
        marginLeft='lg'
        tabIndex={0}
        variant="reaction"
        {...props}
    />

    </div>
)
}

export default ButtonReaction