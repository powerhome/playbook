/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import Card from '../pb_card/_card.jsx'
import Checkbox from '../pb_checkbox/_checkbox.jsx'

type CheckboxCardProps = {
  className?: String,
  data?: String,
  id?: String,
  selected?: Boolean,
  
}

const CheckboxCard = ({ className, data, id, selected, content }: CheckboxCardProps) => (
  <Card selected={true} padding={"none"}>
    <div className="pb_checkbox_card_container">
      <span className="pb_checkbox_card_checkbox">
        <Checkbox selected={selected}/>
      </span>
      <span className="pb_checkbox_card_content">
        {content}
      </span>
    </div>
  </Card>
)

export default CheckboxCard
