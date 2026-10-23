import config from '../eslint.config.mjs'

// The root lint command excludes the website; its own lint command includes it.
export default config.map(entry => entry.ignores ? {
  ...entry,
  ignores: [
    ...entry.ignores.filter(pattern => pattern !== 'playbook-website/**'),
    // Match the website's existing JS/JSX lint scope.
    '**/*.{ts,tsx}',
  ],
} : entry)
