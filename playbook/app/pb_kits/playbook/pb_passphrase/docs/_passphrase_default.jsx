import React, { useState } from 'react'
import { Passphrase } from '../../'

const PassphraseDefault = (props) => {
  const [input, setInput] = useState('')

  const handleChange = (e) => setInput(e.target.value)
  return (
    <div>
      <Passphrase
          onChange={handleChange}
          value={input}
          {...props}
      />
    </div>
  )
}

export default PassphraseDefault
