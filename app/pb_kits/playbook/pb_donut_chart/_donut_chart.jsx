/* @flow */

import React from 'react'

type DonutChartProps = {
  className?: String,
  data?: String,
  id?: String,
}

const DonutChart = ({
  className,
  data,
  id,
}: DonutChartProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`id: ${id}`}</p>
  </div>
)

export default DonutChart
