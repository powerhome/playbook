import React from 'react'
import { IconStatValue } from '../../'

const IconStatValueDefault = () => {
  return (
    <div>
       <IconStatValue value={64.18} unit={"%"} text="ELECTRIC" icon="user" variant="teal" />
        <br></br>
       <IconStatValue value={158.3} text="DISTANCE DRIVEN" icon="lightbulb-on" variant="teal" />
       <br></br>
       <br></br>
       <IconStatValue value={158.3} text="DISTANCE DRIVEN" icon="user" variant="teal" />
       <br></br>
       <IconStatValue value={158.3} text="DISTANCE DRIVEN" icon="lightbulb-on" variant="teal" />
    </div>

  )
}

export default IconStatValueDefault
