import React from "react"
import { Icon } from "../../"

function IconRotate() {
  return (
    <div>
      <Icon
          fixedWidth
          icon="user"
          rotation={90}
          size="2x"
      />
      <Icon
          fixedWidth
          icon="user"
          rotation={180}
          size="2x"
      />
      <Icon
          fixedWidth
          icon="user"
          rotation={270}
          size="2x"
      />
    </div>
  )
}

export default IconRotate
