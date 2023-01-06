import React from "react"
import { SandpackPreview } from "@codesandbox/sandpack-react"

export function KitPreview(props) {
  return (
    <SandpackPreview
      showOpenInCodeSandbox={true}
      showRefreshButton={false}
    //   actionsChildren={
    //     <CircleIconButton
    //       icon='pen'
    //       variant='secondary'
    //       onClick={() => props.setShowCode(!props.showCode)}
    //     />
    //   }
    />
  )
}
