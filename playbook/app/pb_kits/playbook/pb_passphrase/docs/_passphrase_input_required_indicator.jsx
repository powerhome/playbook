import React, { useState } from 'react'

import Passphrase from '../_passphrase'

const PassphraseInputDefault = (props) => {
  const [passphrase, setPassphrase] = useState('')
  const handleOnChangePassphrase = (e) => {
    setPassphrase(e.target ? e.target.value : e)
  }

  return (
      <Passphrase
          id="passphrase_required_indicator"
          label="Passphrase"
          name="passphrase"
          onChange={handleOnChangePassphrase}
          requiredIndicator
          value={passphrase}
          {...props}
      />
  )
}

export default PassphraseInputDefault
