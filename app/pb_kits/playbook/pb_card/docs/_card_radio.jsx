import React, { useState } from 'react'
import { Card, Radio } from '../../'

const CardRadio = () => {
  const [choice, setChoice] = useState("1")

  const handleOnChange = (e) => {
    setChoice(e.target.value)
  }

  const handleOnClick = (e) => {
    if (choice === e.target.value) setChoice(false)
  }

  return (
    <div>
      <Card selected={choice === "1"}>
        <Radio>
          <input
            checked={choice === "1"}
            name="custom1"
            onChange={handleOnChange}
            onClick={handleOnClick}
            type="radio"
            value="1"
          />
        </Radio>
      </Card>

      <br></br>

      <Card selected={choice === "2"}>
        <Radio>
          <input
            checked={choice === "2"}
            name="custom2"
            onChange={handleOnChange}
            onClick={handleOnClick}
            type="radio"
            value="2"
          />
        </Radio>
      </Card>
    </div>
  )
}

export default CardRadio
