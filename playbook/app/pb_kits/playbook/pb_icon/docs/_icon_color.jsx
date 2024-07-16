import React from "react"
import Icon from "../_icon"

const IconDefault = (props) => {
  return (
    <div>
      <Icon
          color="primary"
          fixedWidth
          icon="user"
          {...props}
      />
      <Icon
          color="#FF0000"
          fixedWidth
          icon="user"
          {...props}
      />
      <Icon
          color="success"
          fixedWidth
          icon="vial"
          {...props}
      />
      <Icon
          color="#FF0000"
          fixedWidth
          icon="vial"
          {...props}
      />
    </div>
  )
}

export default IconDefault
