/* eslint-disable flowtype/no-types-missing-file-annotation */
/* eslint-disable comma-dangle */
/* eslint-disable react/no-danger */
import React, { useState } from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import { Avatar, Badge, Body, Button, Card, Checkbox, Drawer, Dropdown, Icon, Nav, Radio, RichTextEditor, Select, Table, Title, Tooltip } from 'playbook-ui'
import PlaygroundHeader from './PlaygroundHeader'

// Pre-import allowed components for react-live
const scope = { Avatar, Badge, Body, Button, Card, Checkbox, Drawer, Dropdown, Icon, Nav, Radio, RichTextEditor, Select, Table, Title, Tooltip }

const initialCode = `
const text = 'Click me'
render (
<>
  <Button text={text} onClick={() => alert("Button clicked!")} />
</>
)
`

const PbKitPlayground = () => {
  const [code, setCode] = useState(initialCode)

  return (
    <>
      <PlaygroundHeader />
      <div className="pbDocPlayground">
        <div className="pbDocPlayground-Editor">
          <LiveProvider code={code} scope={scope} noInline={true}>
            <LiveEditor onChange={setCode} />
            <LiveError />
          </LiveProvider>
        </div>
        <div className="pbDocPlayground-Preview">
          <LiveProvider code={code} scope={scope} noInline={true}>
            <LivePreview />
          </LiveProvider>
        </div>
      </div>
    </>
  )
}

export default PbKitPlayground
