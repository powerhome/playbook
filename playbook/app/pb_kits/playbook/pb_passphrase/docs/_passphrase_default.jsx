import React, { useState } from 'react'
import { Passphrase } from '../../'

const PassphraseDefault = (props) => {
  const [input, setInput] = useState('')

  const handleChange = (e) => setInput(e.target.value)

  const [strength, setStrength] = useState(0)
  const handleStrengthChange = (str) => setStrength(str)
  return (
    <>
      <div>
        <Passphrase
            onChange={handleChange}
            value={input}
            {...props}
        />
      </div>
      <div>
        <Passphrase
            marginBottom="xs"
            onChange={handleChange}
            tips={['Use a bunch of letters', 'Make it less bad', 'Try typing in a bunch of letters to make it really long, kind of like how long this tip is']}
            value={input}
            {...props}
        />
      </div>
      <div>
        <Passphrase
            confirmation
            inputProps={{ name: 'TEST' }}
            onChange={handleChange}
            tips={['Use a bunch of letters', 'Make it less bad', 'Try typing in a bunch of letters to make it really long, kind of like how long this tip is']}
            value={input}
            {...props}
        />
      </div>
      <div>
        <Passphrase
            inputProps={{ name: 'TEST' }}
            onChange={handleChange}
            strengthChanged={handleStrengthChange}
            tips={['Use a bunch of letters', 'Make it less bad', 'Try typing in a bunch of letters to make it really long, kind of like how long this tip is']}
            value={input}
            {...props}
        />
        <span>{`Current strength is ${strength}`}</span>
      </div>
      <div>
        <Passphrase
            common={input.includes('password')}
            onChange={handleChange}
            value={input}
            {...props}
        />
      </div>
      <div>
        <Passphrase
            onChange={handleChange}
            showTipsBelow="md"
            tips={['Write more words', 'Please, more']}
            value={input}
            {...props}
        />
      </div>
    </>
  )
}

export default PassphraseDefault
