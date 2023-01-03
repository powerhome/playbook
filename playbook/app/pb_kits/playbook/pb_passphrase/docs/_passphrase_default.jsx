import React, { useState } from 'react'

import Passphrase from '../_passphrase'

const PassphraseDefault = (props) => {
  const [input, setInput] = useState('')
  const handleChange = (e) => setInput(e.target.value)

  return (
    <Passphrase
        id="my-passphrase"
        onChange={handleChange}
        value={input}
        {...props}
    />
  )
}

export default PassphraseDefault
