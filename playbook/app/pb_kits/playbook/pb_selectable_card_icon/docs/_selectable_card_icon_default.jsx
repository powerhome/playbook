import React, { useState } from 'react'
import { SelectableCardIcon } from '../../'

const SelectableCardIconDefault = (props) => {
  const [selected, setSelected] = useState(true)
  const [unselected, setUnselected] = useState(false)

  return (
    <div className="pb--doc-demo-row">
      <SelectableCardIcon
          bodyText="Export"
          checked={selected}
          icon="chart-line"
          inputId={1}
          onChange={() => setSelected(!selected)}
          titleText="Quarterly Report"
          {...props}
      />
      <SelectableCardIcon
          bodyText="Export"
          checked={unselected}
          icon="chart-pie"
          inputId={2}
          onChange={() => setUnselected(!unselected)}
          titleText="Market Share"
          {...props}
      />
      <SelectableCardIcon
          bodyText="Export"
          disabled
          icon="analytics"
          inputId={3}
          titleText="Comprehensive"
          {...props}
      />
    </div>
  )
}

export default SelectableCardIconDefault
