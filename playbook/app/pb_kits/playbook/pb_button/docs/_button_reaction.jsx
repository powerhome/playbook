import React from "react"
import { Button } from "../../"

const ButtonReaction = (props) => (
  <div>
    <Button
        count={5}
        icon="😍"
        tabIndex={0}
        variant="reaction"
        {...props}
    />
    <Button
        icon="&#127881;"
        marginLeft='lg'
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

export default ButtonReaction