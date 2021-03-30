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
            tips={['Use a bunch of letters', 'Make it less bad']}
            value={input}
            {...props}
        />
      </div>
    </>
  )
}

export default PassphraseDefault
