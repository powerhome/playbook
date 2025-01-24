import React, { useState } from "react"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react"

import { Button, Caption } from "playbook-ui"
import entryPoint from "./entryPoint"

type KitDocsType = {
  source: string,
  exampleTitle: string,
}

const FA_JS = "https://kit.fontawesome.com/098a1cd4d5.js"
const PB_JS = "https://unpkg.com/playbook-ui@13.17.0/dist/playbook.css"

const KitDocs = ({ source, exampleTitle }: KitDocsType) => {
  const [
    editorHeight,
    setEditorHeight
  ]: [string | number, React.Dispatch<React.SetStateAction<string | number>>] = useState(0)

  const editorHeightAuto = (editorHeight as unknown) === "auto"

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
        options={{
          externalResources: [
            FA_JS,
            PB_JS,
          ],
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

            {editorHeightAuto && (
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

            <SandpackCodeEditor
              style={{ height: editorHeight, maxHeight: "300px" }}
            />
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </>
  )
}

export default KitDocs
