import React, { useState } from "react";

import SelectableList from '../../pb_selectable_list/_selectable_list'
import { DraggableProvider } from '../../pb_draggable/context'

// Initial items to be dragged
const data = [
  {
    id: "41",
    text: "Task 1",
  },
  {
    id: "42",
    text: "Task 2",
  },
  {
    id: "43",
    text: "Task 3",
  },
  {
    id: "44",
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
          <SelectableList enableDrag
              variant="radio"
              {...props}
              >
            {initialState.map(({ id, text }) => (
                <SelectableList.Item 
                    dragId={id}
                    key={id}
                    label={text} 
                    name="radio-test" 
                    value={id}
                    {...props}
                />
            ))}
          </SelectableList>
    </DraggableProvider>
    </>

  );
};

export default DraggableWithSelectableList