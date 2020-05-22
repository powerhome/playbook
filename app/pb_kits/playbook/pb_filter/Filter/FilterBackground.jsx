/* @flow */

import React, { Node } from 'react'
import { Card } from '../../'

type FilterBackgroundProps = {
  background: boolean,
  className: string,
  children: Node,
}
const FilterBackground = ({ background = true, className, children }: FilterBackgroundProps) => (
  <div className={`pb_filter_kit ${className}`}>
    <Choose>
      <When condition={background}>
        <Card padding="none">
          {children}
        </Card>
      </When>
      <Otherwise>
        {children}
      </Otherwise>
    </Choose>
  </div>
)

export default FilterBackground
