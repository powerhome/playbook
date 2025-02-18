/* eslint-disable no-prototype-builtins */
/* eslint react/prop-types: 0 */

import React from 'react'
import PipelineChart from './react/pipelineChart'
import GridData from './react/gridData'
import CodeSample from './codeSample'

import PipelineChartRaw from "./react/pipelineChart.jsx?raw"
import GridDataRaw from './react/gridData.jsx?raw'


const CardDashboard = () => {
  return (
    <div id="main-dashboard-content">
      <PipelineChart />
      <CodeSample code={PipelineChartRaw} />

      <GridData />
      <CodeSample code={GridDataRaw} />
    </div>
  )
}

export default CardDashboard
