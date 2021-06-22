/* @flow */

import React, { Node } from 'react'
import classnames from 'classnames'

import { globalProps } from '../../utilities/globalProps.js'

import Card from '../../pb_card/_card'

type FilterBackgroundProps = {
  background: boolean,
  className: string,
  children: Node,
  dark: boolean,
}

const FilterBackground = (props: FilterBackgroundProps) => {
  const { background = true, className, children, dark } = props

  return (
    <div className={classnames(`pb_filter_kit ${className}`, globalProps(props))}>
      <Choose>
        <When condition={background}>
          <Card
              dark={dark}
              padding="none"
          >
            {children}
          </Card>
        </When>
        <Otherwise>{children}</Otherwise>
      </Choose>
    </div>
  )
}

export default FilterBackground
