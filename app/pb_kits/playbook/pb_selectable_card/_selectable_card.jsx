/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'
import { Card } from "../"

type SelectableCardProps = {
  checked?: Boolean,
  className?: String,
  dark?: Boolean,
  disabled?: Boolean,
  name?: String,
  showSelected?: Boolean,
  showUnselected?: Boolean,
  text?: String,
  value?: String,
}

const cardCSS = ({ selected = false }: CardPropTypes) => {
  let css = "";
  css += selected ? "_selected" : "_deselected";
  return css;
};

const SelectableCard = ({ 
  checked, 
  className, 
  dark,
  disabled, 
  name, 
  showSelected, 
  showUnselected, 
  text, 
  value 
}: SelectableCardProps) => {
  const css = classnames ([
    'pb_selectable_card_kit',
    className,
  ])

  return (
    <div className={`pb_selectable_card_kit ${className} ${showSelected} ${showUnselected} ${checked}`}>
     <SelectableCard
     />
    </div>
  )
}

export default SelectableCard