import React from 'react'
import { Icon } from 'playbook-ui'

const config = {
  icon: (
    <svg viewBox="0 -256 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="matrix(1,0,0,-1,53.152542,1217.0847)">
          <path d="m 384,64 q 0,26 -19,45 -19,19 -45,19 -26,0 -45,-19 -19,-19 -19,-45 0,-26 19,-45 19,-19 45,-19 26,0 45,19 19,19 19,45 z m 644,420 -682,-682 q -37,-37 -90,-37 -52,0 -91,37 L 59,-90 Q 21,-54 21,0 21,53 59,91 L 740,772 Q 779,674 854.5,598.5 930,523 1028,484 z m 634,435 q 0,-39 -23,-106 Q 1592,679 1474.5,595.5 1357,512 1216,512 1031,512 899.5,643.5 768,775 768,960 q 0,185 131.5,316.5 131.5,131.5 316.5,131.5 58,0 121.5,-16.5 63.5,-16.5 107.5,-46.5 16,-11 16,-28 0,-17 -16,-28 L 1152,1120 V 896 l 193,-107 q 5,3 79,48.5 74,45.5 135.5,81 61.5,35.5 70.5,35.5 15,0 23.5,-10 8.5,-10 8.5,-25 z" />
      </g>
    </svg>
  ),
}

const IconCustom = (props) => {
  return (
    <React.Fragment>
      <p>
        <Icon
            icon={config.icon}
            {...props}
        />
      </p>
      <p>
        <Icon
            icon={config.icon}
            rotation={90}
            size="2x"
            {...props}
        />
      </p>
      <p>
        <Icon
            icon={config.icon}
            size="3x"
            spin
            {...props}
        />
      </p>
      <p>
        <Icon
            icon={config.icon}
            size="5x"
            {...props}
        />
      </p>
      <p>
        <Icon
            flip="horizontal"
            icon={config.icon}
            size="5x"
            {...props}
        />
      </p>
    </React.Fragment>
  )
}

export default IconCustom
