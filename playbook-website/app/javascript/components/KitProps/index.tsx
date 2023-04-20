import React, { useEffect } from 'react'
const reactDocs = require('react-docgen')

const KitProps = ({ kit, source }) => {
  // eslint-disable-next-line no-console
  console.log('kit: ', kit)
  // eslint-disable-next-line no-console
  console.log('source: ', source)

  useEffect(() => {
    const code = `/** My first component */
      export default ({ name }: { name: string }) => <div>{{name}}</div>;`
    const documentation = reactDocs.parse(code)
    // eslint-disable-next-line no-console
    console.log('documentation: ', documentation)
  }, [])

  return (
    <div>
      {'HELLO KIT PROPS'}
    </div>
  )
}

export default KitProps
