import React, { useState, useEffect } from "react"
import { Flex } from "playbook-ui"
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
  <>
  this is the sandbox index 
  </>
  )
}
