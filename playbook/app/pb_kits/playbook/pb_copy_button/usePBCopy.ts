import { useState, useRef, useEffect } from 'react'

type UsePBCopyProps = {
  value?: string
  from?: string
  timeout?: number
}

export default function usePBCopy({
  value = '',
  from = '',
  timeout = 0,
}: UsePBCopyProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<number>()

  const copy = () => {
    if (!value && !from) return

    if (value) {
      navigator.clipboard.writeText(value)
    } else {
      const el = document.getElementById(from)
      let text = el?.innerText
      if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
        text = el.value
      }
      if (text) navigator.clipboard.writeText(text)
    }

    setCopied(true)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setCopied(false)
    }, timeout)
  }

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current)
    }
  }, [])

  return [copied, copy] as const
}
