/* eslint-disable flowtype/no-types-missing-file-annotation */
/* eslint-disable comma-dangle */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react'

import Editor from 'react-simple-code-editor'
import Prism, { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-erb'
import 'prismjs/plugins/unescaped-markup/prism-unescaped-markup'
import 'prismjs/themes/prism-okaidia.css'

import { LoadingInline, FixedConfirmationToast, Title } from 'playbook-ui'
import PlaygroundHeader from './PlaygroundHeader'

const PbKitPlayground = () => {
  const [previewData, setPreviewData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [code, setCode] = React.useState('<%= pb_rails("title", props: { text: "Welcome to Playbook", size: 1 }) %>')
  const [token, setToken] = useState(null)
  const [throttleFetch, setThrottleFetch] = useState(false)

  useEffect(() => {
    var throttleTimer
    if (throttleTimer) clearTimeout(throttleTimer)
    setThrottleFetch(true)
    throttleTimer = setTimeout(() => {
      if (token) getPreview(code)
    }, 2000)
    return () => clearInterval(throttleTimer)
  }, [code])

  useEffect(() => {
    if (token) {
      getPreview(code)
    } else {
      const getToken = document.querySelector('[name="csrf-token"]').content
      setToken(getToken)
    }
  }, [token])

  const saveCode = (code: string) => {
    setCode(code)
  }

  const getPreview = (code: string) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ erb_code: code })
    }
    setError(null)
    setLoading(true)
    fetch('/rails_pg_render', requestOptions)
      .then((response) => {
        if (response.ok) {
          response.text().then((text) => {
            setPreviewData(text)
            setLoading(false)
          })
        }
        if (response.status === 400) {
          response.json().then((rv) => {
            setLoading(false)
            setError(rv.error)
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        setError(err)
      })
    return () => {
      setLoading(false)
      clearTimeout(throttleTimer)
      setThrottleFetch(false)
    }
  }

  const showPreview = () => {
    if (loading) {
      return (
        <LoadingInline
            align="center"
            className="pbDocPlayground-Preview-Loading"
        />
      )
    } else {
      if (error) {
        return (
          <FixedConfirmationToast
              className="pbDocPlayground-Preview-Error"
              status="error"
              text={error}
          />
        )
      } else {
        return (
          <div
              className="pbDocPlayground-Preview-Example"
              dangerouslySetInnerHTML={{ __html: previewData }}
          />
        )
      }
    }
  }

  Prism.languages.insertBefore('javascript', 'keyword', {
    'end-keyword': {
      pattern: /<%\s*end\s*%>/,
      greedy: true,
      inside: {
        'seperator': {
          pattern: /^<%|%>$/,
          alias: 'punctuation'
        },
        'keyword': {
          pattern: /\bend\b/
        }
      }
    }
  })

  return (
    <>
    <PlaygroundHeader/>
    <div className="pbDocPlayground">
      <div className="pbDocPlayground-Editor">
        <Editor
            className="language-erb"
            highlight={(code) => highlight(code, languages.js)}
            onValueChange={(code) => saveCode(code)}
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              caretColor: "white",
              overflow: "scroll",
              height: "100%",
            }}
            value={code}
        />
        {throttleFetch}
      </div>
      <div className="pbDocPlayground-Preview">
        { showPreview() }
      </div>
    </div>
    </>
  )
}

export default PbKitPlayground
