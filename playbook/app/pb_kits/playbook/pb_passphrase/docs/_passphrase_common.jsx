import React, { useState } from 'react'
import { Body, Passphrase } from '../../'

const PassphraseCommon = (props) => {
  const [input, setInput] = useState('')

  const handleChange = (e) => setInput(e.target.value)

  const COMMON_PASSPHRASES = ['passphrase', 'apple', 'password', 'p@55w0rd']

  const commonCheck = (passphrase) => {
    if (COMMON_PASSPHRASES.includes(passphrase))
      return true
    return false
  }

  return (
    <>
      <div>
        <Body text={`Try typing any of the following: ${COMMON_PASSPHRASES.join(' ')}`} />
        <br />
        <Passphrase
            common={commonCheck(input)}
            onChange={handleChange}
            value={input}
            {...props}
        />
      </div>
    </>
  )
}

export default PassphraseCommon
