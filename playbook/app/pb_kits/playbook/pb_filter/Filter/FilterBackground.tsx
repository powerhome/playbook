import React from 'react'
import classnames from 'classnames'

import { buildHtmlProps } from '../../utilities/props'
import { GlobalProps, globalProps } from '../../utilities/globalProps'

import Card from '../../pb_card/_card'

export type FilterBackgroundProps = {
  background?: boolean,
  className?: string,
  children?: React.ReactChild[] | React.ReactChild,
  dark?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
} & GlobalProps

const FilterBackground = (props: FilterBackgroundProps): React.ReactElement => {
  const { background = true, className, children, dark, htmlOptions = {} } = props
  const htmlProps = buildHtmlProps(htmlOptions)

  return (
    <div
        {...htmlProps}
        className={classnames(`pb_filter_kit ${className}`, globalProps(props))}
    >
      { background ? 
          <Card
              dark={dark}
              padding="none"
          >
            {children}
          </Card> : 
          <>
            {children}
          </>
      }
    </div>
  )
}

export default FilterBackground
