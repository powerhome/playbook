import React from "react"
import { useParams, useSearchParams, Navigate } from "react-router-dom"

export default function RedirectToType() {
  const { name } = useParams()
  const [searchParams] = useSearchParams()
  const queryType = searchParams.get("type")

  //  Supports our old routing, keeping our routes backwards-compatible.
  if (queryType) {
    return <Navigate to={`/beta/kit_category/${name}/${queryType}`} replace />
  }

  // If there's no queryType, navigate to the defaultType (react).
  return <Navigate to={`/beta/kit_category/${name}/react`} replace />
}
