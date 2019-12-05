/* @flow */
import React from 'react'
import classnames from 'classnames'

import Caption from '../pb_caption/_caption.jsx'

type SectionSeparatorProps = {
  className: String,
  text: String,
  variant?: 'card' | 'background'
};

const SectionSeparator = ({
  className,
  text,
  variant = 'card'
}: SectionSeparatorProps) => {

  const css = classnames([`pb_section_separator_kit_${variant}`, className])

  return (<div className={css}>
    <span>
      <Caption text={text}/>
    </span>
  </div>)
}

export default SectionSeparator
