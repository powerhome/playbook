import React from "react"

import Sandbox from "../components/Sandbox"
import { SandpackProvider } from "@codesandbox/sandpack-react"
import { useLoaderData } from "react-router-dom"
import sandpackIndexFile from "./sandpackIndexFile"

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
      <SandpackProvider
        files={{
          "/App.js": {
            code: code,
          },
          "/index.js": {
            code: sandpackIndexFile,
            hidden: true,
          },
        }}
        template='react'
        customSetup={{
          entry: "/src/index.js",
          dependencies: {
            "playbook-ui": "latest",
          },
        }}
      >
        <Sandbox />
      </SandpackProvider>
    </>
  )
}
