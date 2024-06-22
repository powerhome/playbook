import React, { useState, useEffect } from "react"
import { Flex } from "playbook-ui"
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  useActiveCode,
} from "@codesandbox/sandpack-react"
import { Buttons } from "./Buttons"
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

  return (
    <SandpackLayout
      className={`sandbox-layout`}
      style={{
        border: "none",
        fontFamily: "Power Centra",
      }}
    >
      <Flex orientation='column' alignSelf='stretch'>
        <SandpackPreview
          className={`sandbox-preview ${isExpanded ? "expanded" : ""}`}
          showOpenInCodeSandbox={false}
          showRefreshButton={false}
          style={{ backgroundColor: backgroundColor, height: "auto" }}
          actionsChildren={
            <Buttons
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              hasCopied={hasCopied}
              showCopyTooltip={showCopyTooltip}
              handleCopy={handleCopy}
            />
          }
        />

        {isExpanded && <SandpackCodeEditor style={{ height: "auto" }} />}
      </Flex>
    </SandpackLayout>
  )
}
