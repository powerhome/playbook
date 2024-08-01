import React from "react"
import Icon from "../_icon"

const IconDefault = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
      <Icon
          color="primary"
          fixedWidth
          icon="user"
          paddingBottom="sm"
          size="2x"
          {...props}
      />
      <Icon
          color="data_4"
          fixedWidth
          icon="recycle"
          paddingBottom="sm"
          size="2x"
          {...props}
      />
      <Icon
          color="product_5_background"
          fixedWidth
          icon="product-roofing"
          size="2x"
          {...props}
      />
    </div>
  )
}

export default IconDefault
