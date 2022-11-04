import React, { useState } from 'react'

import Passphrase from '../_passphrase'

const PassphraseConfirmation = (props) => {
  const [input, setInput] = useState('')
  const [confirmationInput, setConfirmationInput] = useState('')
  

  const handleChange = (e) => {
    console.log(e.target.id);
    e.target.id !== "confirmation"
      ? setInput(e.target.value)
      : setConfirmationInput(e.target.value);
  }

  return (
    <>
      <div>
        <Passphrase
            confirmation
            confirmationValue={confirmationInput}
            onChange={handleChange}
            value={input}
            {...props}
            id="my-passphrase"
        />
      </div>
    </>
  )
}

export default PassphraseConfirmation
