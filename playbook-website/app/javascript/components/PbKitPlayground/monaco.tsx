/* eslint-disable flowtype/no-types-missing-file-annotation */
/* eslint-disable comma-dangle */
/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react'
import MonacoEditor from '@monaco-editor/react'
import * as Babel from '@babel/standalone'

import { Avatar, Badge, Body, Button, Card, Checkbox, Drawer, Dropdown, Icon, Nav, Radio, RichTextEditor, Select, Table, Title, Tooltip } from 'playbook-ui'
import PlaygroundHeader from './PlaygroundHeader'

// Allowed components for the code snippet
const scope = { Avatar, Badge, Body, Button, Card, Checkbox, Drawer, Dropdown, Icon, Nav, Radio, RichTextEditor, Select, Table, Title, Tooltip }

const initialCode = `
const text = 'Click me'
render(
  <>
    <Button text={text} onClick={() => alert("Button clicked!")} />
  </>
)
`

const PbKitPlaygroundMonaco = () => {
  const [code, setCode] = useState(initialCode)
  const [error, setError] = useState(null)
  const [Component, setComponent] = useState(null)

  useEffect(() => {
    try {
      // Transpile JSX using Babel with the react preset
      const transformed = Babel.transform(code, { presets: ['react'] }).code
      // Create a new function that accepts React, scope and a render callback
      const renderFn = new Function('React', ...Object.keys(scope), 'render', transformed)
      let Comp = () => null
      // The render callback captures the rendered element
      renderFn(React, ...Object.values(scope), (element) => {
        Comp = () => element
      })
      setComponent(() => Comp)
      setError(null)
    } catch (err) {
      setError(err.message)
      setComponent(null)
    }
  }, [code])

  return (
    <>
      <PlaygroundHeader />
      <div className="pbDocPlayground">
        <div className="pbDocPlayground-Editor">
          <MonacoEditor
            height="400px"
            language="javascript"
            value={code}
            onChange={(value) => setCode(value)}
            options={{ automaticLayout: true }}
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
        <div className="pbDocPlayground-Preview">
          {Component && <Component />}
        </div>
      </div>
    </>
  )
}

export default PbKitPlaygroundMonaco
