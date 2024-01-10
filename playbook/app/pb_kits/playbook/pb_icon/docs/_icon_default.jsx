import React from 'react'

import BetaIcon from '../../pb_beta_icon/_beta_icon'
import Icon from '../_icon'


const IconDefault = (props) => {
  return (
    <div>
      <Icon
          fixedWidth
          icon="user"
          {...props}
      />
      <BetaIcon
          fixedWidth
          icon="pen"
          {...props}
      />
    </div>
  )
}

export default IconDefault
