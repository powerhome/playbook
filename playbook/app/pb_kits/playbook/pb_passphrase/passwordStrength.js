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
    test: function (password = '') {
      const feedbackValues = (str) => {
        let percent, variant, text

        if (password.length <= 0) {
          percent = '0'
          variant = 'negative'
          text = ''
        } else if (password.length < this.minLength || str < this.averageThreshold) {
          percent = '25'
          variant = 'negative'
          text = 'Weak Passphrase'
        } else if (str < this.strongThreshold){
          percent = '50'
          variant = 'warning'
          text = 'Average Passphrase'
        } else if (str >= this.strongThreshold) {
          percent = '100'
          variant = 'positive'
          text = 'Strong Passphrase'
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
