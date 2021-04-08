import React, { useState } from 'react'
import { Body, Passphrase, TextInput } from '../../'

const PassphraseMeterSettings = (props) => {
  const [input, setInput] = useState('')

  const handleChange = (e) => setInput(e.target.value)

  const [strength, setStrength] = useState(0)
  const handleStrengthChange = (str) => setStrength(str)
  return (
    <>
      <div>
        <Body>
          {'These examples will all share the same input value. Type in any of the inputs to see how the strength meter changes in response to different settings.'}
        </Body>
        <br />
        <TextInput
            disabled
            label="Calculated Strength"
            readOnly
            value={strength}
        />

        <Passphrase
            label="Default settings"
            onChange={handleChange}
            onStrengthChange={handleStrengthChange}
            value={input}
            {...props}
        />

        <Passphrase
            label="Min length = 5"
            minLength={5}
            onChange={handleChange}
            value={input}
            {...props}
        />
        <Passphrase
            label="Min length = 30"
            minLength={30}
            onChange={handleChange}
            value={input}
            {...props}
        />

        <Passphrase
            averageThreshold={1}
            label="Average threshold = 1"
            onChange={handleChange}
            value={input}
            {...props}
        />

        <Passphrase
            label="Strong Threshold = 4"
            onChange={handleChange}
            strongThreshold={4}
            value={input}
            {...props}
        />
      </div>
    </>
  )
}

export default PassphraseMeterSettings
