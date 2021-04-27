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
    if (confirmation) return

    setResult(calculator(passphrase))
    const str = result.score

    const noPassphrase = passphrase.length <= 0
    const commonPassphrase = common || isPwned
    const weakPassphrase = passphrase.length < minLength || str < averageThreshold
    const averagePassphrase = str < strongThreshold
    const strongPassphrase = str >= strongThreshold

    if (noPassphrase) {
      setPercent('0')
      setVariant('negative')
      setText('\u00A0') //nbsp to keep height constant
    } else if (commonPassphrase) {
      setPercent('25')
      setVariant('negative')
      setText('This passphrase is too common')
    } else if (weakPassphrase) {
      setPercent('25')
      setVariant('negative')
      setText('Too weak')
    } else if (averagePassphrase){
      setPercent('50')
      setVariant('warning')
      setText('Almost there, keep going!')
    } else if (strongPassphrase) {
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
