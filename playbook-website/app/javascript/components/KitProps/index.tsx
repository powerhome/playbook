import React, { useEffect } from "react"
import { parse } from 'react-docgen';

const KitProps = ({ kit, source }) => {
  console.log('kit: ',kit)
  console.log('source: ',source)

  useEffect(() => {
    const code = `/** My first component */
      export default ({ name }: { name: string }) => <div>{{name}}</div>;`
    const documentation = parse(source)
    console.log('documentation: ', documentation)
  }, []);

  return (
    <>
      {'HELLO KIT PROPS'}
    </>
  )
}

export default KitProps
