import React from "react"
import List from "../_list.jsx"
import ListItem from "../_list_item.jsx"


function ListDefault() {
  return (
    <List>
      <ListItem>{`List Item`}</ListItem>
      <ListItem>{`List Item`}</ListItem>
      <ListItem>{`List Item`}</ListItem>
    </List>
  )
}

export default ListDefault;
