import React, { useState } from 'react'

import Passphrase from '../_passphrase'

const PassphraseTips = (props) => {
  const [input, setInput] = useState('')

  const handleChange = (e) => setInput(e.target.value)

  return (
    <>
      <div>
        <Passphrase
            label="Pass an array of strings to the tips prop"
            onChange={handleChange}
            tips={['And the info icon will appear.', 'Each string will be displayed as its own tip']}
            value={input}
            {...props}
        />
        <Passphrase
            label="Omit the prop to hide the icon"
            onChange={handleChange}
            value={input}
            {...props}
        />
        <Passphrase
            label="Only show tips at small screen size"
            onChange={handleChange}
            showTipsBelow="xs"
            tips={['Make the password longer', 'Type more things', 'Use something else']}
            value={input}
            {...props}
        />
        <Passphrase
            label="Only show tips at medium screen size"
            onChange={handleChange}
            showTipsBelow="md"
            tips={['Make the password longer', 'Type more things', 'Use something else']}
            value={input}
            {...props}
        />
        <Passphrase
            label="Only show tips at large screen size"
            onChange={handleChange}
            showTipsBelow="lg"
            tips={['Make the password longer', 'Type more things', 'Use something else']}
            value={input}
            {...props}
        />
      </div>
    </>
  )
}

export default PassphraseTips
