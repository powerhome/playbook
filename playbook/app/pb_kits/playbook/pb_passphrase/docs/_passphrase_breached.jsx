import React, { useState, useEffect } from 'react'

import { Caption, Passphrase, ProgressSimple } from '../..'
import zxcvbn from 'zxcvbn'

const PassphraseBreached = (props) => {
  const [input, setInput] = useState('')
  const [isPwned, setIsPwned] = useState(false)
  const [checkStrength, setCheckStrength] = useState({
    label: '',
    percent: 0,
    score: 0,
    variant: ''
  })


  const handleChange = (e) => setInput(e.target.value)

  const checkHaveIBeenPwned = async function (passphrase) {
    const buffer = new TextEncoder('utf-8').encode(passphrase)
    const digest = await crypto.subtle.digest('SHA-1', buffer)
    const hashArray = Array.from(new Uint8Array(digest))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  
    const firstFive = hashHex.slice(0, 5)
    const endOfHash = hashHex.slice(5)
  
    const resp = await fetch(`https://api.pwnedpasswords.com/range/${firstFive}`)
    const text = await resp.text()
  
    const match = text.split('\n').some((line) => {
      //Each line is <sha-1-hash-suffix>:<count of incidents>
      return line.split(':')[0] === endOfHash.toUpperCase()
    })
    return match
  }

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

  useEffect(
    () => {
      const delay = 400
      const result = handleStrengthCalculation({ passphrase: input, isPwned: isPwned });
    
      setCheckStrength({ ...result })

      // only check the API for passphrases above the minimum size
      if (input.length < 5) {
        setIsPwned(false)
        return
      }

      const handler = setTimeout(() => {
        checkHaveIBeenPwned(input)
          .then((pwned) => setIsPwned(pwned))
          .catch(() => setIsPwned(false))
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    },
    [input, isPwned]
  )

  return (
    <>
      <div>
        <br />
        <Passphrase
            onChange={handleChange}
            value={input}
            {...props}
        />
        {checkStrength.percent > 0 ? 
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
        : null}
      </div>
    </>
  )
}

export default PassphraseBreached
