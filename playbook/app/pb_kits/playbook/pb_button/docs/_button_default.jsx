import React from "react"
import { Button, Icon, Detail } from "../../"
import Sandbox from "./sandbox.tsx"

const ButtonDefault = (props) => (
  <div>
    <Button
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        variant='rounded'
        {...props}
    >
      <Detail color='default'>
        <Icon icon='arrows-from-line' />
      </Detail>
    </Button>
    <Button
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        variant='rounded'
        {...props}
    >
      <Detail color='default'>
        <Icon icon='copy' />
      </Detail>
    </Button>
    <Button
        onClick={() => alert("button clicked!")}
        tabIndex={0}
        variant='rounded'
        {...props}
    >
      <Detail>
        <Icon customIcon={Sandbox()} />
      </Detail>
    </Button>
  </div>
)

export default ButtonDefault
