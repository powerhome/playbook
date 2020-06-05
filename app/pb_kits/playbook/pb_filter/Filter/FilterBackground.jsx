/* @flow */

import React, { Node } from 'react'
import { Card } from '../../'
import classnames from 'classnames'
import { spacing } from '../../utilities/spacing.js'

type FilterBackgroundProps = {
  background: boolean,
  className: string,
  children: Node,
}
const FilterBackground = (props: FilterBackgroundProps) => {
  const { background = true, className, children } = props

  return (
    <div className={classnames(`pb_filter_kit ${className}`, spacing(props))}>
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
