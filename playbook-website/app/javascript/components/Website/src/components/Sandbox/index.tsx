import React, { useState, useEffect } from "react"
import { Button, Detail, Icon, Flex, Tooltip } from "playbook-ui"
import CodesandboxIcon from "../../assets/sandbox"
import {
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  useActiveCode,
  UnstyledOpenInCodeSandboxButton,
} from "@codesandbox/sandpack-react"

import { useClipboard } from "../../hooks/useClipboard"

import "./styles.scss"

export default function Sandbox({ backgroundColor = "white" }) {
  const { code } = useActiveCode()
  const [isExpanded, setIsExpanded] = useState(false)
  const { setValue, hasCopied, onCopy } = useClipboard(code)
  const [isOtherTooltipHovered, setIsOtherTooltipHovered] = useState(false)
  useEffect(() => {
    setValue(code)
  }, [code])

  const handleOtherTooltipHover = (hoverState) => {
    setIsOtherTooltipHovered(hoverState)
  }

  const SandboxButtons = () => {
    return (
      <Flex>
        <span
          onMouseEnter={() => handleOtherTooltipHover(true)}
          onMouseLeave={() => handleOtherTooltipHover(false)}
        >
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
        </span>
        <Tooltip
          placement='top'
          text={hasCopied ? "Copied!" : "Copy Code"}
          zIndex={10}
          delay={{
            close: isOtherTooltipHovered ? 0 : 3000,
          }}
        >
          <Button variant='rounded' onClick={onCopy} tabIndex={0}>
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
      className={`sandbox-layout`}
      style={{
        border: "none",
        fontFamily: "Proxima Nova",
        width: "100%",
      }}
    >
      <Flex orientation='column'>
        <SandpackPreview
          className={`sandbox-preview ${isExpanded ? "expanded" : ""}`}
          showOpenInCodeSandbox={false}
          showRefreshButton={false}
          style={{ backgroundColor: backgroundColor }}
          actionsChildren={<SandboxButtons />}
        />
        {isExpanded && <SandpackCodeEditor style={{ height: "auto" }} />}
      </Flex>
    </SandpackLayout>
  )
}
