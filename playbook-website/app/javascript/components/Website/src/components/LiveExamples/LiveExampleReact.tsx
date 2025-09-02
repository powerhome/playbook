import React from "react"
import { LiveProvider, LivePreview, LiveError } from "react-live"

// Pull in all Playbook React exports so we don't have to specify individual imports
import * as PB from "playbook-ui" 


/**
 * NOTE:
 * This component renders a live code example using react-live.
 * We pull in all Playbook React exports so we don't have to specify individual imports.
 * We have to do the Date kit as FormattedDate as the only one that requires special handling.
 * We also need to add in third party imports if used in examples. For Example: Highcharts, etc. 
 */
type LiveExampleProps = {
  code: string
  exampleProps?: Record<string, unknown>
}

function prepareCode(raw: string) {
  let code = raw
    .split("\n")
    .filter((l) => !l.trim().startsWith("import "))
    .join("\n")

  const defaultExportRegex = /export\s+default\s+([A-Za-z0-9_]+)/

  if (defaultExportRegex.test(code)) {
    code = code.replace(defaultExportRegex, "const __Exported = $1")
    code += `
render(<__Exported {...(typeof exampleProps !== 'undefined' ? exampleProps : {})} />)
`
  } else {
    code += `
if (typeof render === 'function') { render(<React.Fragment />) }
`
  }

  return code
}

const LiveExample: React.FC<LiveExampleProps> = ({ code, exampleProps = {} }) => {
  const prepared = prepareCode(code)

  const { Date: FormattedDate, ...PBrest } = PB as any

  const scope = {
    React,
    useState: React.useState,
    useEffect: React.useEffect,
    useRef: React.useRef,
    useMemo: React.useMemo,
    useCallback: React.useCallback,
    useLayoutEffect: React.useLayoutEffect,
    Fragment: React.Fragment,
    ...PBrest,
    FormattedDate,
    exampleProps,
  }

  return (
    <LiveProvider code={prepared} scope={scope} noInline>
      <div style={{ padding: 16 }}>
        <LivePreview />
      </div>
      <div style={{ padding: "0 16px 16px 16px", color: "#b00020", fontSize: 12 }}>
        <LiveError />
      </div>
    </LiveProvider>
  )
}

export default LiveExample
