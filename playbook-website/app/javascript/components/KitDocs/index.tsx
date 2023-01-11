import React, { useState } from "react"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react"

import { CircleIconButton, Card, Caption } from "playbook-ui"

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

const KitDocs = ({ kit, source, path, exampleTitle }) => {
  const [showCode, setShowCode] = useState(false)
  // The code below is not final. I am working on it.
  // There are some other scenarios that need to be mapped and implemented.
  // Perhaps the best solution in this case is to use Regular Expressions.
  const updatedFileContent = source.replaceAll("'../../'", "'playbook-ui'").replaceAll('"../../"', "'playbook-ui'").replaceAll("'../..'", "'playbook-ui'")
  const files = {
    "/App.js": {
      code: updatedFileContent,
    },
    "/index.js": {
      code: code,
      hidden: true,
    },
  }

  return (
    <>
      <Card className='pb--doc' padding='none'>
        <SandpackProvider
          theme='dark' //https://sandpack.codesandbox.io/docs/getting-started/themes
          template='react' //https://sandpack.codesandbox.io/docs/getting-started/custom-content#templates
          files={files}
          customSetup={{
            dependencies: {
              //https://sandpack.codesandbox.io/docs/getting-started/custom-content#npm-dependencies
              "playbook-ui": "latest",
            },
          }}
        >
          <SandpackLayout style={{backgroundColor: "white", border: "none"}}>
            <div style={{ width: "100%"}}>
              <div className='pb--kit-example'>
                <Caption text={exampleTitle}></Caption>
                <SandpackPreview
                  style={{height: "500px"}} // Working on it to remove the fixed height
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
