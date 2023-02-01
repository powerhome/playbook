import React from "react"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react"

import { Card, Caption } from "playbook-ui"

const KitDemo = ({ source, exampleTitle }) => {
  const updatedFileContent = source.replace(/\'..\/..\/?\'/g, "'playbook-ui'").replace(/\"..\/..\/?\"/g, "'playbook-ui'")
  const files = {
    "/App.js": {
      code: updatedFileContent,
    },
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
              'https://unpkg.com/playbook-ui@latest/dist/fonts/fontawesome-min',
              'https://unpkg.com/playbook-ui@latest/dist/fonts/regular-min',
            ],
          }}
        >
          <SandpackLayout style={{backgroundColor: 'white', border: 'none'}}>
            <div style={{ width: '100%'}}>
              <div className='pb--kit-example'>
                <Caption text={exampleTitle}></Caption>
                <SandpackCodeEditor style={{height: '300px'}}/>
                <SandpackPreview
                  style={{height: '450px'}}
                  showOpenInCodeSandbox={false}
                  showRefreshButton={false}
                />
              </div>
            </div>
          </SandpackLayout>
        </SandpackProvider>
      </Card>
    </>
  )
}

export default KitDemo
