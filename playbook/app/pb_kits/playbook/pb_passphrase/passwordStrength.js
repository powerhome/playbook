import zxcvbn from 'zxcvbn'

// This takes a function, or falls back to using zxcvbn
// Function should return an object of this form:
// {
//   score: integer,
//   feedback: {
//     warning: string
//     suggestions: array<string>
//   }
// }
// this is to match the format from zxcvbn and could be changed
//
// If we intend to offer box kits, or more kits in the future,
//   maybe return an object with a test() function that returns the results
//   to match the functionality of Oswap and make the code to handle different libs more similar
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
