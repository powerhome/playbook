/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

import classnames from 'classnames'
import { map } from 'lodash'
import { Image } from "../"

type MultipleUsersProps = {
  className?: String,
  name: String,
  number?: '1' | '2' | '3' | '4',
  url: String,
}

const initials = function(name) {
  if (name) {
    return map(name.split(/\s/), name => name[0]).join('').substring(0,2)
  }
}

const image = function(url, name) {
  if (url) {
    return (
      <Image alt={name}
          url={url}
      />
    )
  }
}

const PbStatus = ({ size, status } : { size: String, status: String }) => (
  <div className={`pb_online_status_kit_${status} size_${size}`}/>
)

const MultipleUsers = ({
  className,
  name=null,
  number='1',
  url
}: MultipleUsersProps) => {
  const css = classnames([
    `pb_multiple_users_kit`,
    `multiple_users_${number}`,
    className,
  ])

  return (
    <div className={css}
        data-initials={initials(name)}
    >
      <div
          className="multiple_users_wrapper"
          data-initials={initials(name)}
      >
        {image(url, name)}
      </div>
  )
}

export default MultipleUsers
