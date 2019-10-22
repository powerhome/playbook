import React from "react"
import {
  ListItem,
  List,
} from "../../"


function ListDefault() {
  return (
    <List layout={"left"} size={"small"} ordered={true} >
      <ListItem>Blah</ListItem>
      <ListItem>Cool</ListItem>
      <ListItem>Awesome</ListItem>
    </List>
  )
}

export default ListDefault;
