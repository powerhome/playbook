import React from 'react'

import IconCircle from '../_icon_circle'

const IconCircleEmoji = (props) => {
  return (
    <div>
      <IconCircle
          emoji="😁"
          {...props}
      />
      <br/>
      <IconCircle
          emoji="&#128525;"
          {...props}
      />
      <br/>
      <IconCircle
          emoji="&#x1F389;"
          {...props}
      />
    </div>
  )
}

export default IconCircleEmoji
