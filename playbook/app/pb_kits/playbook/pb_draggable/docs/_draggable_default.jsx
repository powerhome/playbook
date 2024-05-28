import React, { useState } from "react";
import {
 SelectableList,
  Draggable,
  DraggableProvider,
} from "../../";

// Initial items to be dragged
const data = [
  {
    id: "1",
    container: "List",
    text: "Task 1",
  },
  {
    id: "2",
    container: "List",
    text: "Task 2",
  },
  {
    id: "3",
    container: "List",
    text: "Task 3",
  },
  {
    id: "4",
    container: "List",
    text: "Task 4",
  },
];

const DraggableDefault = (props) => {
  const [initialItems, setInitialItems] = useState(data);


  return (
    <DraggableProvider>
      <Draggable draggableItems={data} 
          onDragChange={(items)=> 
          setInitialItems(items)} 
          {...props}
      >
            <Draggable.Container 
                container="List"
            >
                    <SelectableList variant="checkbox">
                  {initialItems
                    .map(
                      ({
                        id,
                        text,
                      }) => (
                        <Draggable.Item 
                            container="List"
                            id={id} 
                            key={id}
                        >
                        <SelectableList.Item
                            label={text}
                            name={id}
                            value={id}
                        />
                          
                        </Draggable.Item>
                      )
                    )}
                    </SelectableList>
            </Draggable.Container>
      </Draggable>
    </DraggableProvider>
  );
};

export default DraggableDefault;
