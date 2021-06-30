import React, { useState } from 'react'

import Passphrase from '../../pb_passphrase/_passphrase'

const PassphraseInputProps = (props) => {
  const [input, setInput] = useState('')

  const handleChange = (e) => setInput(e.target.value)

  return (
    <>
      <div>
        <Passphrase
            inputProps={{
              name: 'my-disabled-field',
              id: 'my-value-id',
              disabled: true,
            }}
            label="Pass props directly to input kit"
            onChange={handleChange}
            value={input}
            {...props}
        />
        <Passphrase
            inputProps={{
              children: (
                <input
                    onChange={handleChange}
                    type="password"
                    value={input}
                />),
            }}
            label="Custom input"
            onChange={handleChange}
            value={input}
            {...props}
        />
        <Passphrase
            inputProps={{ name: 'my-value-name', id: 'my-value-id' }}
            label="Set name and ID for use in form libraries"
            onChange={handleChange}
            value={input}
            {...props}
        />
        <Passphrase
            confirmation
            inputProps={{ name: 'my-value-confirmation-name', id: 'my-value-confirmation-id' }}
            onChange={handleChange}
            value={input}
            {...props}
        />
      </div>
    </>
  )
}

export default PassphraseInputProps
