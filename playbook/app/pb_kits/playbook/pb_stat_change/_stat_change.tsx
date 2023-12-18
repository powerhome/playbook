import React from 'react'
import classnames from 'classnames'

import { buildCss, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Icon from '../pb_icon/_icon'

const statusMap: {neutral: 'neutral', decrease: 'negative' ,increase: 'positive'} = {
  increase: 'positive',
  decrease: 'negative',
  neutral: 'neutral',
}

const iconMap = {
  increase: 'arrow-up',
  decrease: 'arrow-down',
}

type StatChangeProps = {
  change?: 'increase' | 'decrease' | 'neutral',
  className?: string,
  icon?: string,
  htmlOptions?: {[key: string]: string | number | boolean | Function},
  id?: string,
  value?: string | number,
}

const StatChange = (props: StatChangeProps): React.ReactElement => {
  const { 
    change = 'neutral', 
    className, 
    htmlOptions = {},
    icon, 
    id, 
    value 
  } = props

  const status = statusMap[change as keyof typeof statusMap]
  let returnedIcon = iconMap[change as keyof typeof iconMap]
  if (icon) {
    returnedIcon = icon
  }

  const htmlProps = buildHtmlProps(htmlOptions)

  return (
    <>
      {value &&
        <div
            className={classnames(
              buildCss('pb_stat_change_kit', status),
              globalProps(props),
              className
              )}
            id={id}
            {...htmlProps}
        >
          <Body status={status}>
            {returnedIcon &&
              <>
                <Icon
                    fixed_width
                    icon={returnedIcon}
                />
                {' '}
              </>
            }
            {`${value}%`}
          </Body>
        </div>
      }
    </>
  )
}

export default StatChange
