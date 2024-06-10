import React, {useState} from "react"
import { render, screen } from "../utilities/test-utils"

import { Draggable, DraggableProvider, SelectableList } from '../'

const testId = 'draggable'

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


const DefaultDraggableKit = () => {
  const [initialState, setInitialState] = useState(data);

  return (
    <DraggableProvider
        initialItems={data}
        onReorder={(items) => setInitialState(items)}
    >
      <Draggable
          data={{ testid: testId }}
      >
        <Draggable.Container>
          <SelectableList variant="checkbox">
            {initialState.map(({ id, text }) => (
              <Draggable.Item id={id} 
                  key={id}
              >
                <SelectableList.Item label={text} 
                    name={id} 
                    value={id} 
                />
              </Draggable.Item>
            ))}
          </SelectableList>
        </Draggable.Container>
      </Draggable>
    </DraggableProvider>
  );
};

test('generated default kit and classname', () => {
render(<DefaultDraggableKit/>)
const kit = screen.getByTestId(testId)
expect(kit).toBeInTheDocument()
expect(kit).toHaveClass('pb_draggable')
})
