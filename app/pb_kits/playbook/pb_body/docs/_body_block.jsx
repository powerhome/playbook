import React from 'react'
import { Body } from '../../'

const BodyBlock = (props) => {
  return (
    <div>
      <Body {...props}>
        {'I am a body kit'}
      </Body>
    </div>
  )
}

export default BodyBlock
