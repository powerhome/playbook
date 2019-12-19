import React from 'react'
import { Icon } from '../../'

const IconAnimate = () => {
  return (
    <div>
      <p>
        <Icon
            fixedWidth
            icon="spinner"
            size="2x"
            spin
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
        />
        {' '}
        <span>{'Pulse'}</span>
      </p>
    </div>
  )
}

export default IconAnimate
