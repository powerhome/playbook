import { useState, useCallback, useEffect } from "react"
import copy from "copy-to-clipboard"

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

  const { timeout = 3100, ...copyOptions } =
    typeof optionsOrTimeout === "number"
      ? { timeout: optionsOrTimeout }
      : optionsOrTimeout

  const onCopy = useCallback(() => {
    const didCopy = copy(valueState, copyOptions)
    setHasCopied(didCopy)
  }, [valueState, copyOptions])

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