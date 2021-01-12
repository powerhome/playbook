import React from 'react'

import { Currency, List, ListItem, Title } from '../../'

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
