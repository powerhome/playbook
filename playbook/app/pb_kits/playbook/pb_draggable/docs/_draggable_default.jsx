import React, { useState } from "react";
import { SelectableList, Draggable, DraggableProvider } from "../../";

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

const DraggableDefault = (props) => {
  const [initialState, setInitialState] = useState(data);

  return (
    <>
    <DraggableProvider initialItems={data}
        onChange={(items) => setInitialState(items)}
    >
        <Draggable.Container {...props}>
          <SelectableList variant="checkbox">
            {initialState.map(({ id, text }) => (
              <Draggable.Item id={id} 
                  key={id}
              >
                <SelectableList.Item dragHandle
                    label={text} 
                    name={id} 
                    value={id} 
                />
              </Draggable.Item>
            ))}
          </SelectableList>
        </Draggable.Container>
    </DraggableProvider>
    </>

  );
};

export default DraggableDefault;
