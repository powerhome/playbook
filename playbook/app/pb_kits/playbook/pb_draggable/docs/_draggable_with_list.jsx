import React, { useState } from "react";
import { DraggableProvider, List, ListItem } from "../../";

// Initial items to be dragged
const data = [
  {
    id: "1",
    text: "Philadelphia",
  },
  {
    id: "2",
    text: "New Jersey",
  },
  {
    id: "3",
    text: "Maryland",
  },
  {
    id: "4",
    text: "Connecticut",
  },
];

const DraggableWithList = (props) => {
  const [initialState, setInitialState] = useState(data);


  return (
    <>
    <DraggableProvider initialItems={data}
        onReorder={(items) => setInitialState(items)}
    >
        <List draggable
            {...props}
        >
            {initialState.map(({ id, text }) => (
                <ListItem id={id}
                    key={id}
                >
                    {text}
                </ListItem>
            ))}
        </List>
    </DraggableProvider>
    </>

  );
};

export default DraggableWithList;
