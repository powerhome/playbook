import zxcvbn from 'zxcvbn'

export const zxcvbnPasswordScore = (options) => {
  const { calculate = zxcvbn } = options

  return {
    averageThreshold: options.averageThreshold || 2,
    strongThreshold: options.strongThreshold || 3,
    test: function (password = '') {
      const feedbackValues = (str) => {
        let percent = 0
        let variant = 'default'
        let text = ''

        if (str > 0 && str < this.averageThreshold) {
          percent = 25
          variant = 'negative'
          text = 'Weak Passphrase'
        } else if (str >= this.averageThreshold && str < this.strongThreshold){
          percent = 50
          variant = 'warning'
          text = 'Average Passphrase'
        } else if (str >= this.strongThreshold) {
          percent = 100
          variant = 'positive'
          text = 'Strong Passphrase'
        }
        return { percent: percent.toString(), variant, text }
      }

      if (password.length === 0) return {}
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
