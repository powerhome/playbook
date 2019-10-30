/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

type SelectableCardProps = {
  checked?: Boolean,
  className?: String,
  dark?: Boolean,
  data?: String,
  disabled?: Boolean,
  id?: String,
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
  data, 
  disabled, 
  id, 
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
    <div className={`pb_selectable_card_kit${cardCSS(props)} ${className}`}>
     {`kit content`}
    </div>
  )
}

export default SelectableCard