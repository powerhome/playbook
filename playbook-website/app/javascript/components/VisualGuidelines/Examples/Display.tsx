import React from 'react'
import {
  Body,
  Caption,
  Table,
  Title,
} from 'playbook-ui'

import Example from '../Templates/Example'

const screenSizeProps = {
  display: ['xs', 'sm', 'md', 'lg', 'xl']
}

const UTILITY_CLASSES = [
  {size: 'xs', media: '@media screen and (max-width: 575px)', class: '.display_xs_hidden', properties: 'display: hidden !important'},
  {size: 'sm', media: '@media screen and (max-width: 576px)', class: '.display_sm_block', properties: 'display: block !important'},
  {size: 'md', media: '@media screen and (max-width: 768px)', class: '.display_md_inline_block', properties: 'display: inline-block !important'},
  {size: 'lg', media: '@media screen and (max-width: 992px)', class: '.display_lg_inline', properties: 'display: inline !important'},
  {size: 'xl', media: '@media screen and (max-width: 1200px)', class: '.display_xl_flex', properties: 'display: flex !important'},
]

const DISPLAY_VALUES = ['inline', 'flex', 'inline_flex', 'inline_block', 'block', 'none']

const Display = ({example}: {example: string}) => (
  <React.Fragment>
    <Example
        example={example}
        globalProps={{
          display: DISPLAY_VALUES
        }}
        screenSizes={screenSizeProps}
        title='Display'
    />
    <Title
        marginBottom='xs'
        paddingTop='sm'
        size={4}
        text='Utility Classes'
    />
    <Body
        text='Just want the raw classes? We got you. All of our global props are simple CSS utilities available through classes.'
        marginBottom='sm'
    />
    <Caption
        text='Visual Guide'
        marginBottom='sm'
    />
    <Table
        shadow="deep"
        size='sm'
    >
      <thead>
        <tr>
          <th>{'Screen Size'}</th>
          <th>{'@Media Screen'}</th>
          <th>{'Class'}</th>
          <th>{'Properties'}</th>
        </tr>
      </thead>
      <tbody>
        {UTILITY_CLASSES.map((utilityClass: {[key: string]: string}) => (
          <tr>
            <td>
              <Body
                text={utilityClass.size}
              />
            </td>
            <td>
              <Body
                text={utilityClass.media}
              />
            </td>
            <td>
              <Body
                text={utilityClass.class}
              />
            </td>
            <td>
              <Body
                text={utilityClass.properties}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </React.Fragment>
)

export default Display
