import zxcvbn from 'zxcvbn'

const passwordStrength = (value) => {
  const result = zxcvbn(value)

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
      colorVariant: 'postive',
    },
  }

  const resultObj = {
    suggestions: result.feedback.suggestions,
    strength: result.score,
    ...SCORE_MAP[result.score],
  }

  return resultObj
}

export default passwordStrength
