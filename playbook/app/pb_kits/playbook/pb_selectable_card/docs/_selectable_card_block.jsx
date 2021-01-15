import React, { useState } from 'react'
import { Body, SelectableCard, Title } from '../../'

const SelectableCardBlock = (props) => {
  const [block, setBlock] = useState(true)
  const [tag, setTag] = useState(false)

  const handleSelect = (event) => {
    setBlock(event.target.checked)
  }

  const handleTag = (event) => {
    setTag(event.target.checked)
  }

  return (
    <div className="pb--doc-demo-row">
      <SelectableCard
          checked={block}
          inputId="block"
          name="block"
          onChange={handleSelect}
          value="block"
          {...props}
      >
        <Title
            size={4}
            text="Block"
            {...props}
        />
        <Body
            tag="span"
            {...props}
        >
          {'This uses block'}
        </Body>
      </SelectableCard>

      <SelectableCard
          checked={tag}
          inputId="tag"
          name="tag"
          onChange={handleTag}
          text="This passes text through the tag"
          value="tag"
          {...props}
      />
    </div>
  )
}

export default SelectableCardBlock
