import React, { useState } from 'react'

import Passphrase from '../_passphrase'

const PassphraseBreached = (props) => {
  const [input, setInput] = useState('')

  const handleChange = (e) => setInput(e.target.value)

  return (
    <>
      <div>
        <br />
        <Passphrase
            checkPwned
            onChange={handleChange}
            value={input}
            {...props}
        />
      </div>
    </>
  )
}

export default PassphraseBreached
