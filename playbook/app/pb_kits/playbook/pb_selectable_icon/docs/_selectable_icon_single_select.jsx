import React, { useState } from 'react'

import SelectableIcon from '../_selectable_icon'

const SelectableIconSingleSelect = ({ dark }) => {
  const [ selectedFormat, toggleFormat ] = useState(null)

  return (

    <div className="pb--doc-demo-row">
      <SelectableIcon
          checked={selectedFormat === 'Cassette'}
          dark={dark}
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
          dark={dark}
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
          dark={dark}
          icon="album-collection"
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
