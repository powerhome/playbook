import React, { useState } from "react"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react"

import AnimateHeight from "react-animate-height"
import { Button, Caption } from "playbook-ui"
import entryPoint from "./entryPoint"

const KitDocs = ({ source, exampleTitle, css }) => {
  const [editorHeight, setEditorHeight] = useState(0)

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
      <SandpackProvider
        files={{
          "/App.js": {
            code: code,
          },
          "/index.js": {
            code: entryPoint,
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
      >
        <SandpackLayout
          style={{
            backgroundColor: "white",
            border: "none",
            fontFamily: "Power Centra",
          }}
        >
          <div style={{ width: "100%" }}>
            <div className='pb--kit-example'>
              <Caption paddingBottom='md' text={exampleTitle}></Caption>

              <SandpackPreview
                showOpenInCodeSandbox={false}
                showRefreshButton={false}
                style={{ backgroundColor: "white" }}
              />
            </div>

            {editorHeight === 0 && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Button
                  icon='code'
                  marginRight='xl'
                  onClick={() => setEditorHeight("auto")}
                  paddingX='none'
                  tabIndex={0}
                  text='Show Code'
                  variant='link'
                />
              </div>
            )}

            {editorHeight === "auto" && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Button
                  icon='times'
                  marginRight='xl'
                  onClick={() => setEditorHeight(0)}
                  paddingX='none'
                  tabIndex={0}
                  text='Close Code'
                  variant='link'
                />
              </div>
            )}

            <AnimateHeight duration={500} height={editorHeight}>
              <SandpackCodeEditor
                style={{ height: "100%", maxHeight: "300px" }}
              />
            </AnimateHeight>
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </>
  )
}

export default KitDocs
