import React from "react"
import { useParams, useSearchParams, NavLink } from "react-router-dom"
import {Title} from "playbook-ui"
export default function Scaffold() {
  const { name, type: pathType } = useParams()
  const [searchParams] = useSearchParams()
  const queryType = searchParams.get("type")

  const finalType = pathType || queryType || "react"

  const formatName = (name: any) => {
    return name
      .split("_")
      .map((word: any) => word[0].toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className='pl_md'>
      <NavLink to={`/beta/kits/${name}`}>
        {name ? <Title size="2">{formatName(name)}</Title> : null}
      </NavLink>
    </div>
  )
}
