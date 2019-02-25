import React from "react";
import List from "./List.jsx";

class VerticalNavList extends React.Component {
  render() {
    return (
      <List>
        <List.Item text={"hello world"} />
        <List.Item>{"testing here too"}</List.Item>
        <List.Item text={"hello wow"} />
        <List.Item text={"hello cool"} />
        <List.Item text={"hello sweet"} />
      </List>
    );
  }
}

export default VerticalNavList;
