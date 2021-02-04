import React, {useState} from 'react'
import { Body, SelectableCard, Title } from '../..'

const SelectableCardError = (props) => {
      const [football, setFootball] = useState(false)
      const [basketball, setBasketball] = useState(false)
      const [baseball, setBaseball] = useState(false)

  return (
    <div>
      <Title
          dark
          size={3}
          text="What sports do you like?"
      />
      <br />
      <SelectableCard
          {...props}
          checked={football}
          dark
          error
          inputId="football"
          name="football"
          onChange={() => setFootball(!football)}
          value="football"
          variant="displayInput"
      >
        <Body dark>{'Football'}</Body>
      </SelectableCard>

      <SelectableCard
          {...props}
          checked={basketball}
          dark
          error
          inputId="basketball"
          name="basketball"
          onChange={() => setBasketball(!basketball)}
          value="basketball"
          variant="displayInput"
      >
        <Body dark>{'Basketball'}</Body>
      </SelectableCard>

      <SelectableCard
          {...props}
          checked={baseball}
          dark
          error
          inputId="baseball"
          name="baseball"
          onChange={() => setBaseball(!baseball)}
          value="baseball"
          variant="displayInput"
      >
        <Body dark>{'Baseball'}</Body>
      </SelectableCard>
    </div>
  )
}
export default SelectableCardError
