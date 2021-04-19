import { useEffect, useMemo, useState } from 'react'
import zxcvbn from 'zxcvbn'

export default function useZxcvbn(options) {
  const { passphrase = '', common, isPwned, confirmation, averageThreshold, minLength, strongThreshold } = options
  const calculator = useMemo(
    () => confirmation ?  () => ({ score: 0 }) : zxcvbn,
    [confirmation]
  )

  const [percent, setPercent] = useState('0')
  const [variant, setVariant] = useState('negative')
  const [text, setText] = useState('\u00A0') //nbsp to keep height constant
  const [result, setResult] = useState({})

  useEffect(() => {
    if (confirmation) {
      return {}
    }

    setResult(calculator(passphrase))
    const str = result.score

    if (passphrase.length <= 0) {
      setPercent('0')
      setVariant('negative')
      setText('\u00A0') //nbsp to keep height constant
    } else if (common || isPwned) {
      setPercent('25')
      setVariant('negative')
      setText('This passphrase is too common')
    } else if (passphrase.length < minLength || str < averageThreshold) {
      setPercent('25')
      setVariant('negative')
      setText('Too weak')
    } else if (str < strongThreshold){
      setPercent('50')
      setVariant('warning')
      setText('Almost there, keep going!')
    } else if (str >= strongThreshold) {
      setPercent('100')
      setVariant('positive')
      setText('Success! Strong passphrase')
    }
  }, [passphrase, common, isPwned, averageThreshold, minLength, strongThreshold]
  )

  return {
    strength: common || isPwned ? 0 : result.score,
    percent,
    variant,
    text,
  }
}
