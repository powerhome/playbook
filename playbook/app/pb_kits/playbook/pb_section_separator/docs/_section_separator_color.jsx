import React from "react"
import SectionSeparator from '../../pb_section_separator/_section_separator'
import Flex from '../../pb_flex/_flex'
import Detail from '../../pb_detail/_detail'
import Icon from '../../pb_icon/_icon'

const children = (
  <Flex alignItems="center"
      padding="xs"
  >
    <Icon color="primary"
        icon="arrow-down"
    />
    <Detail
        color="link"
        size="sm"
        text="Children"
    />
  </Flex>
)

const SectionSeparatorColor = (props) => {
  return (
    <div>
      <SectionSeparator text="Default Separator"
          {...props}
      />
      <SectionSeparator color="primary"
          text="Primary Separator"
          {...props}
      />
      <SectionSeparator
          color="primary"
          lineStyle="dashed"
          text="Primary Dashed Separator"
          {...props}
      />
       <SectionSeparator color="primary"
           {...props}
       >
        {children}
      </SectionSeparator>
    </div>
  )
}

export default SectionSeparatorColor
