/* @flow */

import React from 'react'
import classnames from 'classnames'

type ListProps = {
  borderless?: Boolean,
  children?: Array<React.ReactChild>,
  className?: String,
  dark?: Boolean,
  layout?: '' | 'left' | 'right',
  ordered?: Boolean,
  size?: '' | 'small' | 'large',
  xpadding?: Boolean
}

const listCSS = ({
  borderless=false,
  dark=false,
  layout="",
  ordered=false,
  size="",
  xpadding=false
}: ListProps) => {

  const borderStyle = borderless === true ? '_borderless' : ''
  const layoutStyle = "_"+ layout
  const orderedStyle = ordered === true ? "_ordered" : ""
  const sizeStyle = "_" + size
  const themeStyle = dark === true ? '_dark' : ''
  const xpaddingStyle = xpadding === true ? `_xpadding` : ''

  return 'pb_list_kit' + borderStyle + layoutStyle + orderedStyle + sizeStyle + themeStyle + xpaddingStyle
}


const List = (props: ListProps) => {
  const {
    borderless,
    children,
    className,
    dark,
    layout,
    ordered,   
    size,
    xpadding,
  } = props;
  
  const Tag = ordered === true ? `ol` : `ul`

  return (
    <div className={classnames(listCSS(props), className)}>
      <Tag>
        {children}
      </Tag>
    </div>
  );
}

export default List
