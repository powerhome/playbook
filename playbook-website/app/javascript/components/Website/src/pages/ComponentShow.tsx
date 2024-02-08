import React, { useState } from "react"
import { Title, Caption, Button } from "playbook-ui"
import Sandbox from "../components/Sandbox"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react"
import { useLoaderData } from "react-router-dom"
import entryPoint from "./entryPoint"


export default function ComponentShow() {
  const { examples } = useLoaderData()

  const source = examples[0].source

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
      <Title
        paddingTop={{ xs: "md", sm: "md", md: "md", default: "none" }}
        text={"Component Show Page"}
        size='2'
      />
<<<<<<< Updated upstream

      <SandpackProvider template='react'>
        <SandpackLayout>
          <SandpackCodeEditor />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
      {/* <SandpackProvider
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
            "https://kit.fontawesome.com/098a1cd4d5.js",
            "https://unpkg.com/playbook-ui@13.16.0/dist/playbook.css",
          ],
          classes: {
            "sp-loading": "alksdhgklasdhkjlahsdfkjlhasdkjlfhahkljsdf",
          },
        }}
      >
        <Sandbox />
      </SandpackProvider> */}
=======
      <div className="sandpack sandpack--playground">
        <SandpackProvider
          // files={{
          //   "/App.js": {
          //     code: code,
          //   },
          //   "/index.js": {
          //     code: entryPoint,
          //     hidden: true,
          //   },
          // }}
          // theme="light"
   
          // template='react'
          // customSetup={{
          //   entry: "/src/index.js",
          //   dependencies: {
          //     "playbook-ui": "latest",
          //   },
          // }}
          // options={{
          //   classes: {
          //     "sp-preview-actions": "sandbox-button-toolbar",
          //   },
          //   externalResources: [
          //     "https://kit.fontawesome.com/098a1cd4d5.js",
          //     "https://unpkg.com/playbook-ui@13.16.0/dist/playbook.css",
          //   ],
  
        >
          <Sandbox />
        </SandpackProvider>
      </div>
>>>>>>> Stashed changes
    </>
  )
}
