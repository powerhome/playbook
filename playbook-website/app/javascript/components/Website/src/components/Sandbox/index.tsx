import React, { useState, useEffect } from "react"
import { Button, Detail, Icon, Flex, Tooltip, FlexItem } from "playbook-ui"
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
  useEffect(() => {
    setValue(code)
  }, [code])

  const [showCopyTooltip, setShowCopyTooltip] = useState(true)

  const handleCopy = () => {
    onCopy()
    setShowCopyTooltip(true)
  }

  const SandboxButtons = () => {
    return (
      <Flex>
        <Tooltip
          placement='top'
          text={isExpanded ? "Hide Code" : "Show Code"}
          zIndex={10}
        >
          <Button
            margin='xs'
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
          text={hasCopied ? "Copied!" : "Copy Code"}
          zIndex={10}
          showTooltip={showCopyTooltip}
          delay={{
            close: hasCopied ? 3000 : 0,
          }}
        >
          <Button
            margin='xs'
            variant='rounded'
            onClick={handleCopy}
            tabIndex={0}
          >
            <Detail color='default'>
              <Icon icon='copy' />
            </Detail>
          </Button>
        </Tooltip>

        <Tooltip
          placement='top'
          text={"Open in Sandbox"}
          position='fixed'
          zIndex={10}
        >
          <UnstyledOpenInCodeSandboxButton className='pb_button_kit_rounded_inline_enabled rounded m_xs'>
            <Detail>
              <Icon customIcon={CodesandboxIcon()} />
            </Detail>
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
      }}
    >
      <Flex orientation='column' alignSelf='stretch'>
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
