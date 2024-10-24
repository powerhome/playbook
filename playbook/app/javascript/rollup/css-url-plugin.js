const fs = require('fs'),
      path = require('path')

function cssUrl() {
    return {
        name: 'cssUrl',
        writeBundle() {
          const playbookCSSFile = path.resolve(process.cwd(), 'dist/playbook.css')
          const playbookCSS = fs.readFileSync(playbookCSSFile, 'utf8')
          fs.writeFileSync(playbookCSSFile, playbookCSS.replaceAll('/vite/', './'))
        }
    }
}

module.exports = cssUrl