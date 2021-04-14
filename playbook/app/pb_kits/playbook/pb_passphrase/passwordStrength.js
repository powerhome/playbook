import zxcvbn from 'zxcvbn'

export const zxcvbnPasswordScore = (options) => {
  const {
    calculate = zxcvbn,
    averageThreshold = 2,
    strongThreshold = 3,
    minLength = 12,
  } = options

  return {
    minLength,
    averageThreshold,
    strongThreshold,
    checkHaveIBeenPwned: async function (passphrase) {
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
    },
    test: function (password = '', common = false) {
      const feedbackValues = (str) => {
        let percent, variant, text

        if (password.length <= 0) {
          percent = '0'
          variant = 'negative'
          text = '\u00A0' //nbsp to keep form from jumping when typing beings
        } else if (common) {
          percent = '25'
          variant = 'negative'
          text = 'This passphrase is too common'
        } else if (password.length < this.minLength || str < this.averageThreshold) {
          percent = '25'
          variant = 'negative'
          text = 'Too weak'
        } else if (str < this.strongThreshold){
          percent = '50'
          variant = 'warning'
          text = 'Almost there, keep going!'
        } else if (str >= this.strongThreshold) {
          percent = '100'
          variant = 'positive'
          text = 'Success! Strong passphrase'
        }
        return { percent, variant, text }
      }

      const result = calculate(password)

      return (
        {
          suggestions: result.feedback.suggestions,
          warning: result.feedback.warning,
          strength: result.score,
          ...feedbackValues(result.score),
        }
      )
    },
  }
}
