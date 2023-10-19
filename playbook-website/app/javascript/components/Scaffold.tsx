//  create a component that just renders and h1 and accepts a prop called name
import React from "react"
import { useParams } from "react-router-dom"

export default function Scaffold() {
  const { name } = useParams()
  return (
    <div>
      <h1>{`${name}`} component page</h1>
    </div>
  )
}
