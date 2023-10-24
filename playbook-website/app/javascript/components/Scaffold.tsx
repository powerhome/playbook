import React from "react"
import { useParams, useSearchParams } from "react-router-dom"

export default function Scaffold() {
  const { name, type } = useParams()
  const [searchParams] = useSearchParams()
  const queryType = searchParams.get("type")

  return (
    <div className='pl_md'>
      <h1>Component Page: {`${name}`} </h1>
      {queryType ? (
        <h2>Type: {`${queryType}`}</h2>
      ) : (
        <h2>Type: {`${type}`} </h2>
      )}
    </div>
  )
}
