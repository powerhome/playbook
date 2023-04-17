import React, { useEffect, useState } from 'react'

import { Title, LoadingInline } from 'playbook-ui'

const PbKitFetch = ({ kit }) => {
  const [serverData, setServerData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/kits/avatar/rails_raw')
      .then((response) => response.text())
      .then((data) => {
        console.log(data)
        debugger
        setLoading(false)
        setServerData(data)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setError(err)
      })
  }, [])

  const unescapeHtml = function (value) {
    var div = document.createElement('div')
    div.innerHTML = value
    return div.textContent
  }

  return (
    <>
      <Title
          size={4}
          tag="h1"
          text={kit}
      />
      { loading && <LoadingInline align="center" /> }
      <span dangerouslySetInnerHTML={{__html: serverData}} />
    </>
  )
}

export default PbKitFetch
