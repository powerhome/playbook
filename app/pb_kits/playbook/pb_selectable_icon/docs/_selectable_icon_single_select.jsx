import React, { useState } from 'react'
import { SelectableIcon } from '../../'

const SelectableIconSingleSelect = () => {
  const [ selectedFormat, toggleFormat ] = useState(null)

  return (

    <div className="pb--doc-demo-row">
      <SelectableIcon
          checked={selectedFormat === 'Cassette'}
          icon="cassette-tape"
          inputId={13}
          multi={false}
          name="music-format"
          onChange={() => toggleFormat('Cassette')}
          text="Cassette"
          value="Cassette"
      />

      <SelectableIcon
          checked={selectedFormat === 'CD'}
          icon="compact-disc"
          inputId={14}
          multi={false}
          name="music-format"
          onChange={() => toggleFormat('CD')}
          text="CD"
          value="CD"
      />

      <SelectableIcon
          checked={selectedFormat === 'Vinyl'}
          icon="record-vinyl"
          inputId={15}
          multi={false}
          name="music-format"
          onChange={() => toggleFormat('Vinyl')}
          text="Vinyl"
          value="Vinyl"
      />
    </div>
  )
}

export default SelectableIconSingleSelect
