import React from 'react'

import Flex from "../../pb_flex/_flex"
import { GenericObject } from '../../types'

type FiltersInlineProps = {
  children?: React.ReactChild[] | React.ReactChild,
  inlineProps?: GenericObject,
}

const FiltersInline = ({ children }: FiltersInlineProps): React.ReactElement => {
    console.log(children)
  return (
    <div className="pb-form">
        <Flex
            orientation="row"
            paddingRight="lg"
            vertical="center"
        >
            {children}
        </Flex>
    </div>
  )
}

export default FiltersInline
