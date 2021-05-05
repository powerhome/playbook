import React, { useState } from 'react'
import { Passphrase } from '../../'

const PassphraseDefault = (props) => {
  const [input, setInput] = useState('')
  const handleChange = (e) => setInput(e.target.value)

  const [confoInput, setConfoInput] = useState('')
  const handleConfoChange = (e) => setConfoInput(e.target.value)

  return (
    <>
      <div>
        <Passphrase
            id="my-passphrase"
            onChange={handleChange}
            value={input}
            {...props}
        />
        <Passphrase
            confirmation
            onChange={handleConfoChange}
            value={confoInput}
            {...props}
        />
        <span>{input === confoInput ? 'They match!' : 'They don\'t match!'}</span>
      </div>
    </>
  )
}

export default PassphraseDefault
