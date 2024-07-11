import '@testing-library/jest-dom';
import failOnConsole from 'jest-fail-on-console'

failOnConsole()

// or with options:
failOnConsole({
  shouldFailOnWarn: false,
})
