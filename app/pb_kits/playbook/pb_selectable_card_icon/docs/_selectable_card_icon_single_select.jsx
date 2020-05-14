import React, { useState } from 'react'
import { SelectableCardIcon } from '../../'

const SelectableCardIconSingleSelect = () => {
  const [selectedFormat, toggleFormat] = useState(null)

  return (
    <div className="pb--doc-demo-row">
      <SelectableCardIcon
          bodyText="Cassette"
          checked={selectedFormat === 'Cassette'}
          icon="cassette-tape"
          inputId={5}
          onChange={() => toggleFormat('Cassette')}
          titleText="Title"
          value="Cassette"
      />
      <SelectableCardIcon
          bodyText="CD"
          checked={selectedFormat === 'CD'}
          icon="compact-disc"
          inputId={6}
          onChange={() => toggleFormat('CD')}
          titleText="Title"
          value="CD"
      />
      <SelectableCardIcon
          bodyText="Vinyl"
          checked={selectedFormat === 'Vinyl'}
          icon="record-vinyl"
          inputId={7}
          onChange={() => toggleFormat('Vinyl')}
          titleText="Title"
          value="Vinyl"
      />
    </div>
  )
}

export default SelectableCardIconSingleSelect
