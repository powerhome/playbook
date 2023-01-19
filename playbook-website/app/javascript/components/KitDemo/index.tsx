import React from "react"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react"

import { Card, Caption } from "playbook-ui"

const code = `import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "playbook-ui/dist/reset.css";
import "playbook-ui/dist/playbook.css";
import "playbook-ui/dist/fonts/fontawesome-min";
import "playbook-ui/dist/fonts/regular-min";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
`

const KitDemo = ({ kit, source, exampleTitle }) => {
  const updatedFileContent = source.replace(/\'..\/..\/?\'/g, "'playbook-ui'").replace(/\"..\/..\/?\"/g, "'playbook-ui'")
  const files = {
    "/App.js": {
      code: updatedFileContent,
    },
    "/index.js": {
      code: code,
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
