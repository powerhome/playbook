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
          inputId={7}
          onChange={() => toggleFormat('Cassette')}
          titleText="Title"
          value="Cassette"
      />
      <SelectableCardIcon
          bodyText="CD"
          checked={selectedFormat === 'CD'}
          icon="compact-disc"
          inputId={8}
          onChange={() => toggleFormat('CD')}
          titleText="Title"
          value="CD"
      />
      <SelectableCardIcon
          bodyText="Vinyl"
          checked={selectedFormat === 'Vinyl'}
          icon="album-collection"
          inputId={9}
          onChange={() => toggleFormat('Vinyl')}
          titleText="Title"
          value="Vinyl"
      />
    </div>
  )
}

export default SelectableCardIconSingleSelect
