/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'

type LabelPillProps = {
  className?: String,
  id?: String,
}

const LabelPill = (props: LabelPillProps) => {
  return (
    <div className={classnames('pb_label_pill', spacing(props))}>
      <span>{'LABEL PILL CONTENT'}</span>
    </div>
  )
}

export default LabelPill
