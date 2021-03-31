import React, { useState } from 'react'
import { Passphrase } from '../../'

const PassphraseDefault = (props) => {
  const [input, setInput] = useState('')

  const handleChange = (e) => setInput(e.target.value)
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
            onChange={handleChange}
            tips={['Use a bunch of letters', 'Make it less bad', 'Try typing in a bunch of letters to make it really long, kind of like how long this tip is']}
            value={input}
            {...props}
        />
      </div>
      <div>
        <Passphrase
            confirmation
            onChange={handleChange}
            tips={['Use a bunch of letters', 'Make it less bad', 'Try typing in a bunch of letters to make it really long, kind of like how long this tip is']}
            value={input}
            {...props}
        />
      </div>
    </>
  )
}

export default PassphraseDefault
