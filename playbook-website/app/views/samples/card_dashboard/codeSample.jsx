import React from "react"

const CodeSample = ({ code }) => {

  return (
    <pre style={{ background: '#f5f5f5', padding: '1rem', overflowX: 'auto' }}>
      <code>{code}</code>
    </pre>
  )
}

export default CodeSample
