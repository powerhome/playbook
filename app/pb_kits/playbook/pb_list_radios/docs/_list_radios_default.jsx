import React from 'react'
import { ListItem, ListRadioItem, ListRadios } from '../../'

const ListRadiosDefault = () => {
  return (

    <div>
      <ListRadios>
        <ListItem>
          <ListRadioItem
              defaultChecked={false}
              label="Unselected"
              name="custom1"
          />
        </ListItem>
        <ListItem>
          <ListRadioItem
              defaultChecked
              label="Selected"
              name="custom1"
          />
        </ListItem>
        <ListItem>
          <ListRadioItem
              defaultChecked={false}
              label="Hover"
              name="custom1"
          />
        </ListItem>
        <ListItem>
          <ListRadioItem
              defaultChecked={false}
              label="Unselected Last"
              name="custom1"
          />
        </ListItem>
      </ListRadios>
    </div>

  )
}

export default ListRadiosDefault
