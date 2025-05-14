import React from 'react'

import Collapsible from '../../pb_collapsible/_collapsible'
import Caption from '../../pb_caption/_caption'

type FilterSectionProps = {
  children?: React.ReactChild[] | React.ReactChild,
  collapsible?: boolean,
  collapsed?: boolean,
  header?: boolean,
  headerText?: string,
}
const FilterSection = ({ children, collapsible = false, collapsed = true, header = false, headerText, }: FilterSectionProps): React.ReactElement => {
  if (collapsible) {
    return (
      <Collapsible
          collapsed={collapsed}
          padding="none"
      >
        <Collapsible.Main
            paddingX="sm"
            paddingY="xs"
        >
            <Caption>{ headerText }</Caption>
        </Collapsible.Main>
        <Collapsible.Content paddingX="sm">
          { children }
        </Collapsible.Content>
      </Collapsible>
    )
  }
  
  return (
    <>
      {header && <Caption>{ headerText }</Caption>}
      { children }
    </>
  )
}

export default FilterSection
