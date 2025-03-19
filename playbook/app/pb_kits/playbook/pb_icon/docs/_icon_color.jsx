import React from "react"
import Icon from "../_icon"
import Flex from "../../pb_flex/_flex"

const IconDefault = (props) => {
  return (
    <div>
      <Flex marginBottom="sm">
        <Icon
            color="primary"
            fixedWidth
            icon="user"
            size="2x"
            {...props}
        />
        <Icon
            color="data_4"
            fixedWidth
            icon="recycle"
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
      </Flex>

      <Flex>
        <Icon
            color="light"
            fixedWidth
            icon="user"
            size="2x"
            {...props}
        />
        <Icon
            color="lighter"
            fixedWidth
            icon="recycle"
            size="2x"
            {...props}
        />
        <Icon
            color="link"
            fixedWidth
            icon="product-roofing"
            size="2x"
            {...props}
        />
      </Flex>
    </div>
  )
}

export default IconDefault
