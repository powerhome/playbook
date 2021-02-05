import zxcvbn from 'zxcvbn'
import owasp from 'owasp-password-strength-test'

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

  const SCORE_MAP = {
    0: {
      text: 'Very Weak',
      colorVariant: 'negative',
    },
    1: {
      text: 'Weak',
      colorVariant: 'negative',
    },
    2: {
      text: 'Moderate',
      colorVariant: 'default',
    },
    3: {
      text: 'Strong',
      colorVariant: 'positive',
    },
    4: {
      text: 'Very Strong',
      colorVariant: 'positive',
    },
  }

  return {
    test: (password = '') => {
      if (password.length === 0) return {}
      const result = calculate(password)

      return (
        {
          suggestions: result.feedback.suggestions,
          warning: result.feedback.warning,
          strength: result.score + 1,
          ...SCORE_MAP[result.score],
        }
      )
    },
  }
}

export const owaspPasswordScore = (options = {}) => {
  // Most of this functionality is to enable different inputs on the same page to use different settings
  // Otherwise, the same owasp object is used and configs can overwrite eachother
  // It seems unlikely that we'd have two password fields on the same page, but not impossible
  // also needed to show different examples on the same page in the textInput page
  const owaspCopy = Object.assign(
    {},
    owasp,
    {
      tests: { required: [], optional: [] },
      configs: Object.assign({}, owasp.configs),
    }
  )

  // This is where we could set Nitro standard configs and overwrite the built in defaults
  // These are the default values out of the box:
  // allowPassphrases       : true,
  // maxLength              : 128,
  // minLength              : 10,
  // minPhraseLength        : 20,
  // minOptionalTestsToPass : 4,
  //
  //   Passphrase:
  //   Once the "minPhraseLength" is passed, the minimum number of optional tests is ignored
  //   So you could 5 or 6 optional tests, with at least 4 needing to be met for a short password
  //   once 20 characters are reached, those are ignored because the phrase is long enough
  const defaultConfig = {
    allowPassphrases: true,
    maxLength: 128,
    minLength: 10,
    minPhraseLength: 20,
    minOptionalTestsToPass: 4,
  }

  const { owaspConfig = {} } = options
  const { config = {}, optionalTests = [], requiredTests = [] } = owaspConfig
  owaspCopy.config(Object.assign({}, defaultConfig, config))

  // Include the default tests here, plus any additional passed by the user of the kit
  // if we wanted to add our own defaults, or skip the defaults out of the box
  // we could exclude/include them here
  owaspCopy.tests.required.push(...owasp.tests.required, ...requiredTests)
  owaspCopy.tests.optional.push(...owasp.tests.optional, ...optionalTests)

  // The default tests refer to oswap.configs instead of this.configs
  //   so we have to change the global settings for the built in tests
  //   to respect the configs associated with this particular input
  owaspCopy.test = (password) => {
    if (password.length === 0) return {}

    const outOfBoxConfig = Object.assign({}, owasp.configs)
    owasp.config(owaspCopy.configs)
    const result = owasp.test.call(owaspCopy, password)
    owasp.config(outOfBoxConfig)

    return result
  }

  return owaspCopy
}
