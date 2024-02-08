import React, { useState } from "react"
import { Button, Detail, Icon, Flex, Tooltip } from "playbook-ui"
import CodesandboxIcon from "../../assets/sandbox"
import {
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  useActiveCode,
  UnstyledOpenInCodeSandboxButton,
} from "@codesandbox/sandpack-react"

import "./styles.scss"

export default function Sandbox() {
  const { loading } = useActiveCode()
  // const loadingWords = () => <div>loading.........</div>
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const SandboxButtons = () => {
    return (
      <Flex>
        <Tooltip
          placement='top'
          text={isExpanded ? "Hide Code" : "Show Code"}
          zIndex={10}
        >
          <Button
            variant='rounded'
            onClick={() => setIsExpanded(!isExpanded)}
            tabIndex={0}
          >
            <Detail color='default'>
              <Icon icon='arrows-from-line' />
            </Detail>
          </Button>
        </Tooltip>
        <Tooltip
          placement='top'
          text={isCopied ? "Copied!" : "Copy Code"}
          zIndex={10}
        >
          <Button
            variant='rounded'
            onClick={() => setIsCopied(true)}
            tabIndex={0}
          >
            <Detail color='default'>
              <Icon icon='copy' />
            </Detail>
          </Button>
        </Tooltip>
        <Tooltip placement='top' text={"Open in CodeSandbox"} zIndex={10}>
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
            <Button variant='rounded' tabIndex={0}>
              <Detail>
                <Icon customIcon={CodesandboxIcon()} />
              </Detail>
            </Button>
          </UnstyledOpenInCodeSandboxButton>
        </Tooltip>
      </Flex>
    )
  }

  return (
    <SandpackLayout
      className='sandbox-layout'
      style={{
        backgroundColor: "white",
        border: "none",
        fontFamily: "Proxima Nova",
        width: "100%",
      }}
    >
      {/* {loading && <h1 style={{ backgroundColor: "orange" }}>Loading...</h1>} */}

      <Flex orientation='column'>
        {!loading && (
          <SandpackPreview
            className={`sandbox-preview ${isExpanded ? "expanded" : ""}`}
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            // style={{ backgroundColor: "white" }}
            actionsChildren={<SandboxButtons />}
          ></SandpackPreview>
        )}

        {isExpanded && <SandpackCodeEditor  style={{ height: "auto" }} />}
      </Flex>
    </SandpackLayout>
  )
}
