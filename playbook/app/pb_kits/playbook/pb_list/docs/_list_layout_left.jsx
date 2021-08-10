import React from 'react'

import List from '../_list'
import ListItem from '../_list_item'
import Currency from '../../pb_currency/_currency'
import Title from '../../pb_title/_title'

const ListLayoutLeft = (props) => {
  return (
    <>
      <List
          layout="left"
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
              {...props}
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
              {...props}
          />
        </ListItem>
      </List>
    </>
  )
}

export default ListLayoutLeft
