/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import {
  Body,
  Table,
} from 'playbook-ui'

import Example from '../Templates/Example'

const NUMBERS = ['$1,231,123,123.00', '$7,444,112,512.00']

const NumberSpacing = ({ example }: {example: string}) => (
  <Example
      description="When dealing with numbers it can be helpful to controll the way the font handles number spacing. A font like proxima nova is an open type face that enables us to use tabular spacing for example. This alligns the numbers equally to make those numbers in a table easier to compare. This is avaliable in EVERY kit as a global prop. See example:"
      example={example}
      globalProps={{
        numberSpacing: ['tabular'],
      }}
      title="Number Spacing"
  >
    <Table size="md">
      <thead>
        <tr>
          <th>{'Normal'}</th>
          <th>{'Tabular'}</th>
        </tr>
      </thead>
      <tbody>
        {NUMBERS.map((number: string) => (
          <tr key={number}>
            <td>
              <Body
                  text={number}
              />
            </td>
            <td>
              <Body
                  numberSpacing="tabular"
                  text={number}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Example>
)

export default NumberSpacing
