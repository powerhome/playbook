import React from 'react'

import IconCircle from '../_icon_circle'

const IconCircleEmoji = (props) => {
  return (
    <div>
      <IconCircle
          icon="😁"
          size="sm"
          {...props}
      />
      <br/>
      <IconCircle
          icon="😍"
          size="md"
          variant="red"
          {...props}
      />
      <br/>
      <IconCircle
          icon="🎉"
          size="lg"
          variant="teal"
          {...props}
      />
    </div>
  )
}

export default IconCircleEmoji
