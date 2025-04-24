import React from "react"

import { useLoaderData } from "react-router-dom"

export default function ComponentShow() {
  const { examples } = useLoaderData()

  const source = examples[0].source

  const code = source
    .replace(
      /import (\w+) from ('|")\.\.\/_(\w+)('|")/g,
      'import { $1 } from "playbook-ui"'
    )
    .replace(
      /import \{ (.*) \} from ('|")\.\.\/(.*)('|")/g,
      'import { $1 } from "playbook-ui"'
    )

  return (
    <>
      i moved this
    </>
  )
}
