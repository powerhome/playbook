import React from 'react'

import List from '../_list'
import ListItem from '../_list_item'

import Currency from '../../pb_currency/_currency'
import Title from '../../pb_title/_title'

const ListLayoutRight = (props) => {
  return (
    <>
      <List
          layout="right"
          {...props}
      >
        <ListItem>
          <Title
              size={4}
              text="Label"
              {...props}
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
              {...props}
          />
        </ListItem>

        <ListItem>
          <Title
              size={4}
              text="Label"
              {...props}
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
              {...props}
          />
        </ListItem>

        <ListItem>
          <Title
              size={4}
              text="Label"
              {...props}
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
              {...props}
          />
        </ListItem>

        <ListItem>
          <Title
              size={4}
              text="Label"
              {...props}
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
              {...props}
          />
        </ListItem>

        <ListItem>
          <Title
              size={4}
              text="Label"
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
          />
        </ListItem>
      </List>
    </>
  )
}

export default ListLayoutRight
