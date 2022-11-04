import React, { useState } from 'react'

import {Body, Passphrase} from '../..'

const PassphraseConfirmation = (props) => {
  const [input, setInput] = useState('')
  const [confirmationInput, setConfirmationInput] = useState('')
  
  const handleChange = (e) => setInput(e.target.value)
  const handleConfirmationChange = (e) => setConfirmationInput(e.target.value)    
  
  return (
    <>
      <div>
        <Passphrase
            confirmation
            onChange={handleChange}
            value={input}
            {...props}
        />
        <Passphrase
            onChange={handleConfirmationChange}
            value={confirmationInput}
            {...props}
        />
        {input && confirmationInput && (
          <Body
              text={
                input === confirmationInput ? "They match!" : "They don't match!"
              }
              {...props}
          />
        )}
      </div>
    </>
  );
}

export default PassphraseConfirmation
