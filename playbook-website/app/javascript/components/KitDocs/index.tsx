import React, { useState } from "react"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react"

import { CircleIconButton, Card, Caption } from "playbook-ui"
import entryPoint from "./entryPoint"

const KitDocs = ({ source, exampleTitle, fa, faReg }) => {
  const [showCode, setShowCode] = useState(false)
  const code = source
    .replace(
      /import (\w+) from ('|")\.\.\/_(\w+)('|")/g,
      'import { $1 } from "playbook-ui"'
    )
    .replace(
      /import \{ (.*) \} from ('|")\.\.\/(.*)('|")/g,
      'import { $1 } from "playbook-ui"'
    )

  return (
    <>
      <Card className='pb--doc' padding='none'>
        <SandpackProvider
          files={{
            "/style.css": {
              code: `body { background: white };`,
              hidden: true,
            },

            "/App.js": {
              code: code,
            },
            "/index.js": {
              code: entryPoint,
              hidden: true,
            },
            "/fa.js": {
              code: fa,
              hidden: true,
            },
            "/faReg.js": {
              code: faReg,
              hidden: true,
            },
          }}
          theme='dark'
          template='react'
          customSetup={{
            entry: "/src/index.js",
            dependencies: {
              "playbook-ui": "latest",
            },
          }}
          options={{
            externalResources: [
              "https://unpkg.com/playbook-ui@latest/dist/playbook.css",
              "https://unpkg.com/playbook-ui@latest/dist/reset.css",
            ],
          }}
        >
          <SandpackLayout style={{ backgroundColor: "white", border: "none" }}>
            <div style={{ width: "100%" }}>
              <div className='pb--kit-example'>
                <Caption paddingBottom='md' text={exampleTitle}></Caption>

                <SandpackPreview
                  style={{ height: "450px" }}
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
            {showCode && (
              <SandpackCodeEditor
                style={{ height: "100%", maxHeight: "450px" }}
              />
            )}
          </SandpackLayout>
        </SandpackProvider>
      </Card>
    </>
  )
}

export default KitDocs
