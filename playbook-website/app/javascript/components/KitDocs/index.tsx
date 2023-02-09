import React, { useState } from "react"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react"


import { CircleIconButton, Card, Caption } from "playbook-ui"

const KitDocs = ({ source, exampleTitle }) => {
  const [showCode, setShowCode] = useState(false)
  const updatedFileContent = source.replace(/\'..\/..\/?\'/g, "'playbook-ui'").replace(/\"..\/..\/?\"/g, "'playbook-ui'")
  const files = {
    "/App.js": {
      code: updatedFileContent,
    },

    "test.js": {
      code: require("@fortawesome/fontawesome-pro/js/fontawesome.js")
    }
 
  }

  return (
    <>
      <Card className='pb--doc' padding='none'>
        <SandpackProvider
          theme='dark'
          template='react'
          files={files}
          customSetup={{
            dependencies: {
              'playbook-ui': 'latest',
            },
          }}
          options={{
            externalResources: [
         
              'https://unpkg.com/playbook-ui@latest/dist/playbook.css',
              'https://unpkg.com/playbook-ui@latest/dist/reset.css',
            ],
          }}
        >
          <SandpackLayout style={{backgroundColor: 'white', border: 'none'}}>
            <div style={{ width: '100%'}}>
              <div className='pb--kit-example'>
                <Caption text={exampleTitle}></Caption>
                <SandpackPreview
                  style={{height: '450px'}}
                  showOpenInCodeSandbox={false}
                  showRefreshButton={false}
                  actionsChildren={
                    <CircleIconButton
                      icon='pen'
                      variant='secondary'
                      onClick={() => setShowCode(!showCode)}
                    />
                  }
                />
              </div>
            </div>
            { showCode && <SandpackCodeEditor /> }
          </SandpackLayout>
        </SandpackProvider>
      </Card>
    </>
  )
}

export default KitDocs
