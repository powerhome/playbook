import React, { useState } from "react";
import { SelectableList, DraggableProvider } from "../../";

// Initial items to be dragged
const data = [
  {
    id: "1",
    text: "Task 1",
  },
  {
    id: "2",
    text: "Task 2",
  },
  {
    id: "3",
    text: "Task 3",
  },
  {
    id: "4",
    text: "Task 4",
  },
];

const DraggableWithSelectableList = (props) => {
  const [initialState, setInitialState] = useState(data);

  return (
    <>
    <DraggableProvider initialItems={data}
        onReorder={(items) => setInitialState(items)}
    >
          <SelectableList draggable 
              variant="checkbox"
              {...props}
              >
            {initialState.map(({ id, text }) => (
                <SelectableList.Item id={id}
                    key={id}
                    label={text} 
                    name={id} 
                    value={id}
                />
            ))}
          </SelectableList>
    </DraggableProvider>
    </>

  );
};

export default DraggableWithSelectableList