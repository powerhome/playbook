module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/hooks/*.test.jsx'],
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', {
      configFile: require.resolve('../playbook/babel.config.js'),
    }],
  },
}
