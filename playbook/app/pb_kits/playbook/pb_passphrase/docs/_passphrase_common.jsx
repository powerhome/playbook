import React, { useState, useEffect } from 'react'

import Body from '../../pb_body/_body'
import Passphrase from '../../pb_passphrase/_passphrase'
import Caption from '../../pb_caption/_caption'
import ProgressSimple from '../../pb_progress_simple/_progress_simple'
import zxcvbn from 'zxcvbn'

const PassphraseCommon = (props) => {
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

  const COMMON_PASSPHRASES = ['passphrase', 'apple', 'password', 'p@55w0rd']

  const isCommon = (passphrase) => {
    if (COMMON_PASSPHRASES.includes(passphrase))
      return true
    return false
  }

  useEffect(() => {
    const result = handleStrengthCalculation({ passphrase: input, common: isCommon(input) });
    setCheckStrength({ ...result })
  }, [input])


  return (
    <>
      <div>
        <Body 
            marginBottom='md'
            text={`Try typing any of the following: ${COMMON_PASSPHRASES.join(', ')}`} />
        <Passphrase
            onChange={handleChange}
            value={input}
            {...props}
        />
        {input.length > 0 && (
          <>
            <ProgressSimple
                className={input.length === 0 ? "progress-empty-input" : null}
                percent={checkStrength.percent}
                variant={checkStrength.variant}
            />
            <Caption size='xs'
                text={checkStrength.label} 
            />
          </>
        )}
      </div>
    </>
  )
}

export default PassphraseCommon
