import { useState, useCallback, useEffect, useRef } from "react"
import { copyText } from "../utils/clipboard"

export interface UseClipboardOptions {
  timeout?: number,
  format?: string
}

export function useClipboard(
  value: string,
  optionsOrTimeout: number | UseClipboardOptions = {},
) {
  const [hasCopied, setHasCopied] = useState(false)

  const [valueState, setValueState] = useState(value)
  useEffect(() => setValueState(value), [value])

  const { timeout = 3100, format = 'text/plain' } =
    typeof optionsOrTimeout === "number"
      ? { timeout: optionsOrTimeout }
      : optionsOrTimeout

  const copyRequest = useRef(0)
  useEffect(() => () => { copyRequest.current++ }, [valueState, format])

  const onCopy = useCallback(async () => {
    const request = ++copyRequest.current
    setHasCopied(false)
    const didCopy = await copyText(valueState, format)
    if (request === copyRequest.current) setHasCopied(didCopy)
  }, [valueState, format])

  useEffect(() => {
    let timeoutId: number | null = null

    if (hasCopied) {
      timeoutId = window.setTimeout(() => {
        setHasCopied(false)
      }, timeout)
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [timeout, hasCopied])

  return {
    value: valueState,
    setValue: setValueState,
    onCopy,
    hasCopied,
  }
}
