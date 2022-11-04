import React, { useState } from 'react'
import { useEffect } from 'react'

import { Caption, Passphrase, ProgressSimple, TextInput} from '../..'
import zxcvbn from 'zxcvbn'

const PassphraseStrengthChange = (props) => {
  const [input, setInput] = useState('')
  const [checkStrength, setCheckStrength] = useState({
    label: '',
    percent: 0,
    score: 0,
    variant: ''
  })

  const handleChange = (e) => setInput(e.target.value)

  const handleStrengthCalculation = (settings) => {
    const {
        passphrase = "",
        common = false,
        isPwned = false,
        averageThreshold = 2,
        minLength = 12,
        strongThreshold = 3,
      } = settings

    const resultByScore = {
      0: {
        variant: 'negative',
        label: '',
        percent: 0,
      },
      1: {
        variant: 'negative',
        label: 'This passphrase is too common',
        percent: 25,
      },
      2: {
        variant: 'negative',
        label: 'Too weak',
        percent: 25,
      },
      3: {
        variant: 'warning',
        label: 'Almost there, keep going!',
        percent: 50,
      },
      4: {
        variant: 'positive',
        label: 'Success! Strong passphrase',
        percent: 100,
      }
    }

    const { score } = zxcvbn(passphrase);

    const noPassphrase = passphrase.length <= 0
    const commonPassphrase = common || isPwned
    const weakPassphrase = passphrase.length < minLength || score < averageThreshold
    const averagePassphrase = score < strongThreshold
    const strongPassphrase = score >= strongThreshold

    if (noPassphrase) {
      return {...resultByScore[0], score}
    } else if (commonPassphrase) {
      return {...resultByScore[1], score}
    } else if (weakPassphrase) {
      return {...resultByScore[2], score}
    } else if (averagePassphrase){
      return {...resultByScore[3], score}
    } else if (strongPassphrase) {
      return {...resultByScore[4], score}
    }
  }

  useEffect(() => {
     const result = handleStrengthCalculation({ passphrase: input })
     setCheckStrength({...result})
    },[input])

  return (
    <>
      <Passphrase
          label="Passphrase"
          onChange={handleChange}
          value={input}
          {...props}
      /> 
      {input.length > 0 && (
        <>
          <ProgressSimple
              percent={checkStrength.percent}
              variant={checkStrength.variant}
          />
          <Caption size='xs'
              text={checkStrength.label} 
          />
        </>
      )}
      <TextInput
          disabled
          label="Passphrase Strength"
          marginTop="xl"
          readOnly
          value={checkStrength.score}
      />
    </>
  )
}

export default PassphraseStrengthChange
