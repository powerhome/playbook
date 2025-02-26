const createFilter = require('@rollup/pluginutils').createFilter,
      fs = require('fs'),
      path = require('path')

const consolidate = (options = {}) => {
  const filter = createFilter(options.include, options.exclude),
  groups = options.groups || [],
  remove = options.remove || true

  return {
    name: 'consolidate',

    writeBundle() {
      for (const group of groups) {
        const files = group.files || []
        if (typeof group.outputFile === 'undefined') {
          throw new Error("outputFile is a required field in group")
        }
        if (typeof group.files === 'undefined' || files.length === 0) {
          throw new Error("files is a required field in group")
        }

        let code = ''

        for (const file of files) {
          if (filter(file)) {
            const content = fs.readFileSync(file, 'utf8')
            code += `${content}\n`

            if (remove) fs.unlinkSync(file)
          }
        }

        const outputFile = path.resolve(process.cwd(), group.outputFile)
        fs.writeFileSync(outputFile, code, 'utf8')
      }
    }
  }
}

export default consolidate
