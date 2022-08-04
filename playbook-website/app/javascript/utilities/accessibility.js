/* eslint-disable no-console */

import axe from 'axe-core'

export const runAxe = function(include = '.pb--kit-example', ignore = ['.pb--kit-example :first-child']) {
  axe
    .run({
      include: [include],
      exclude: [ignore],
    })
    .then((results) => {
      if (results.violations.length) {
        console.warn('🚨 [axe-core] Accessibility issues found. See below for a list:')
        console.dir(results.violations)
      } else {
        console.log('[axe-core] Yay! 🎉 No accessibility violations were found!')
      }
    })
    .catch((err) => {
      console.info('Accessibility Check:', err.message)
    })
}
