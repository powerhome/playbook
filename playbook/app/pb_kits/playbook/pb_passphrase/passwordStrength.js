import zxcvbn from 'zxcvbn'

export const zxcvbnPasswordScore = (options) => {
  const {
    calculate = zxcvbn,
    averageThreshold,
    strongThreshold,
    minLength,
  } = options

  return {
    minLength,
    averageThreshold,
    strongThreshold,
    test: function (password = '', common = false, isPwned = false) {
      const feedbackValues = (str) => {
        let percent, variant, text

        if (password.length <= 0) {
          percent = '0'
          variant = 'negative'
          text = '\u00A0' //nbsp to keep form from jumping when typing begins
        } else if (common || isPwned) {
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
          strength: common || isPwned ? 0 : result.score,
          ...feedbackValues(result.score),
        }
      )
    },
  }
}
