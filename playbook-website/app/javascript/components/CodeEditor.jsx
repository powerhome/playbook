import React from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'
import '@codesandbox/sandpack-react/dist/index.css'

/* eslint react/prop-types: 0 */

const code = `import React from 'react'
import { Button } from 'playbook-ui'

const ButtonDefault = (props) => (
  <div>
    <Button
        marginRight="xl"
        onClick={() => alert('button clicked!')}
        text="Button Primary"
        {...props}
    />
    {' '}
    <Button
        onClick={() => alert('button clicked!')}
        text="Button Secondary"
        variant="secondary"
        {...props}
    />
    {' '}
    <Button
        onClick={() => alert('button clicked!')}
        text="Button Link"
        variant="link"
        {...props}
    />
    <Button
        disabled
        onClick={() => alert('button clicked!')}
        text="Button Disabled"
        {...props}
    />
  </div>
)

export default ButtonDefault`

const CodeEditor = () => {
  return (
    <Sandpack
        customSetup={{
        dependencies: {
          'playbook-ui': 'latest',
        },
        entry: 'test.js',
        files: {
          test: `${code}`,
        },
      }}
    />
  )
}

export default CodeEditor
