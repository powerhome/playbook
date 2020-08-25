import React from 'react'
import { ListRadios, ListRadioItem, ListItem } from '../../'


const ListRadiosDefault = () => {

return (
    <div>
      <ListRadios
        dark
      >
        <ListItem>
          <ListRadioItem
            defaultChecked={false}
            name="custom1"
          >
            Unselected
          </ListRadioItem>
        </ListItem>
        <ListItem>
          <ListRadioItem
            defaultChecked
            name="custom1"
          >
            Selected
          </ListRadioItem>
        </ListItem>
        <ListItem>
          <ListRadioItem
            defaultChecked={false}
            name="custom1"
            value="Hover"
          >
            Hover
          </ListRadioItem>
        </ListItem>
        <ListItem>
          <ListRadioItem
            defaultChecked={false}
            name="custom1"
          >
            Unselected Last
          </ListRadioItem>
        </ListItem>
      </ListRadios>
    </div>
  )
}

export default ListRadiosDefault