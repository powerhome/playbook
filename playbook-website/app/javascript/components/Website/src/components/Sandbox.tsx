import React, { useState } from "react"
import { Button, Detail, Icon, Flex } from "playbook-ui"
import CodesandboxIcon from "../assets/sandbox"
import {
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  useActiveCode,
  UnstyledOpenInCodeSandboxButton,
} from "@codesandbox/sandpack-react"

export default function Sandbox() {
  const { loading } = useActiveCode()
  // const loadingWords = () => <div>loading.........</div>
  const [isExpanded, setIsExpanded] = useState(false)

  const SandboxButtons = () => {
    return (
      <Flex>
        <Button
          variant='rounded'
          onClick={() => setIsExpanded(!isExpanded)}
          tabIndex={0}
        >
          <Detail color='default'>
            <Icon icon='arrows-from-line' />
          </Detail>
        </Button>
        <Button
          variant='rounded'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
        >
          <Detail color='default'>
            <Icon icon='copy' />
          </Detail>
        </Button>
        <UnstyledOpenInCodeSandboxButton
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // reset button styles
            background: "none",
            border: "none",
            padding: 0,
            margin: 0,
            outline: "none",
            cursor: "pointer",
          }}
        >
          <Button
            variant='rounded'
            onClick={() => alert("button clicked!")}
            tabIndex={0}
          >
            <Detail>
              <Icon customIcon={CodesandboxIcon()} />
            </Detail>
          </Button>
        </UnstyledOpenInCodeSandboxButton>
      </Flex>
    )
  }

  return (
    <SandpackLayout
      style={{
        backgroundColor: "white",
        border: "none",
        fontFamily: "Proxima Nova",
      }}
    >
      {/* {loading && <h1 style={{ backgroundColor: "orange" }}>Loading...</h1>} */}

      <Flex orientation='column'>
        {!loading && (
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            style={{ backgroundColor: "white" }}
            actionsChildren={<SandboxButtons />}
          ></SandpackPreview>
        )}

        {isExpanded && <SandpackCodeEditor style={{ height: "auto" }} />}
      </Flex>
    </SandpackLayout>
  )
}
