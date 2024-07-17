import React from "react"
import Icon from "../_icon"

const IconDefault = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
      <Icon
          color="primary"
          fixedWidth
          icon="user"
          size="2x"
          {...props}
      />
      <Icon
          color="info"
          fixedWidth
          icon="recycle"
          size="2x"
          {...props}
      />
      <Icon
          color="data_4"
          fixedWidth
          icon="frog"
          size="2x"
          {...props}
          />
      <Icon
          color="text_lt_lighter"
          fixedWidth
          icon="vial"
          size="2x"
          {...props}
      />
      <Icon
          color="roofing"
          fixedWidth
          icon="product-roofing"
          size="2x"
          {...props}
      />
    </div>
  )
}

export default IconDefault
