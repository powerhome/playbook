import React, { useState } from 'react'
import { Body, SelectableCard, Title } from 'playbook-ui'

const SelectableCardError = (props) => {
  const [football, setFootball] = useState(false)
  const [basketball, setBasketball] = useState(false)
  const [baseball, setBaseball] = useState(false)

  return (
    <div>
      <Title
          {...props}
          size={3}
          text="What sports do you like?"
      />
      <br />
      <SelectableCard
          {...props}
          checked={football}
          error
          inputId="football"
          name="football"
          onChange={() => setFootball(!football)}
          value="football"
          variant="displayInput"
      >
        <Body {...props}>{'Football'}</Body>
      </SelectableCard>

      <SelectableCard
          {...props}
          checked={basketball}
          error
          inputId="basketball"
          name="basketball"
          onChange={() => setBasketball(!basketball)}
          value="basketball"
          variant="displayInput"
      >
        <Body {...props}>{'Basketball'}</Body>
      </SelectableCard>

      <SelectableCard
          {...props}
          checked={baseball}
          error
          inputId="baseball"
          name="baseball"
          onChange={() => setBaseball(!baseball)}
          value="baseball"
          variant="displayInput"
      >
        <Body {...props}>{'Baseball'}</Body>
      </SelectableCard>
    </div>
  )
}
export default SelectableCardError
