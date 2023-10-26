import React from "react"
import { useParams, useSearchParams } from "react-router-dom"

export default function Scaffold() {
  const { name, type: pathType } = useParams()
  const [searchParams] = useSearchParams()
  const queryType = searchParams.get("type")

  const finalType = pathType || queryType || "react"

  return (
    <div className='pl_md'>
      <h1>Component Page: {name}</h1>
      <h2>Type: {finalType}</h2>
    </div>
  )
}
