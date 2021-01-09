import React from 'react'
import { Icon } from '../../'

const IconAnimate = (props) => {
  return (
    <div>
      <p>
        <Icon
            fixedWidth
            icon="spinner"
            size="2x"
            spin
            {...props}
        />
        {' '}
        <span>{'Spin'}</span>
      </p>
      <br />
      <p>
        <Icon
            fixedWidth
            icon="spinner"
            pulse
            size="2x"
            {...props}
        />
        {' '}
        <span>{'Pulse'}</span>
      </p>
    </div>
  )
}

export default IconAnimate
