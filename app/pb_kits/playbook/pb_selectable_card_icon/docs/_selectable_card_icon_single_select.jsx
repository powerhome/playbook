import React, { useState } from 'react'
import { SelectableCardIcon } from '../../'

const SelectableCardIconSingleSelect = () => {
  const [selectedFormat, toggleFormat] = useState(null)

  return (
    <div className="pb--doc-demo-row">
      <SelectableCardIcon
          checked={selectedFormat === 'Cassette'}
          icon="cassette-tape"
          inputId={7}
          onChange={() => toggleFormat('Cassette')}
          titleText="Cassette"
          value="Cassette"
      />
      <SelectableCardIcon
          checked={selectedFormat === 'CD'}
          icon="compact-disc"
          inputId={8}
          onChange={() => toggleFormat('CD')}
          titleText="CD"
          value="CD"
      />
      <SelectableCardIcon
          checked={selectedFormat === 'Vinyl'}
          icon="album-collection"
          inputId={9}
          onChange={() => toggleFormat('Vinyl')}
          titleText="Vinyl"
          value="Vinyl"
      />
    </div>
  )
}

export default SelectableCardIconSingleSelect
