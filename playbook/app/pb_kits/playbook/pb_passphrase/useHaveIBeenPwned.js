
import  { useEffect, useState } from 'react'

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

/**
 * If the input hasn't changed in <delay> ms,
 * hit the haveibeenpwned api and check if the given passphrase is compromised
 */
export default function useHaveIBeenPwned(passphrase, minLength, delay = 400) {
  const [isPwned, setIsPwned] = useState(false)

  useEffect(
    () => {
      // only check the API for passphrases above the minimum size
      if (passphrase.length < minLength) {
        setIsPwned(false)
        return
      }

      const handler = setTimeout(() => {
        checkHaveIBeenPwned(passphrase)
          .then((pwned) => setIsPwned(pwned))
          .catch(() => setIsPwned(false))
      }, delay)

      return () => {
        clearTimeout(handler)
      }
    },
    [passphrase]
  )

  return isPwned
}
