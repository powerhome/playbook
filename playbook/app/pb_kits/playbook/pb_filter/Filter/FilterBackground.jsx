/* @flow */

import React, { Node } from 'react'
import { Card } from '../../'
import classnames from 'classnames'
import { globalProps } from '../../utilities/globalProps.js'

type FilterBackgroundProps = {
  background: boolean,
  className: string,
  children: Node,
}
const FilterBackground = (props: FilterBackgroundProps) => {
  const { background = true, className, children } = props

  return (
    <div className={classnames(`pb_filter_kit ${className}`, globalProps(props))}>
      <Choose>
        <When condition={background}>
          <Card padding="none">{children}</Card>
        </When>
        <Otherwise>{children}</Otherwise>
      </Choose>
    </div>
  )
}

export default FilterBackground
