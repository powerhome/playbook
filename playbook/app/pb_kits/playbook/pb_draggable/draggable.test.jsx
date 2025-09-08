import React, { useState } from "react";
import { render, screen } from "../utilities/test-utils";

import {
  Draggable,
  DraggableProvider,
  SelectableList,
  List,
  ListItem,
  Card,
} from "playbook-ui";

const testId = "draggable";

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
      <Draggable data={{ testid: testId }}>
        <Draggable.Container>
          <SelectableList variant="checkbox">
            {initialState.map(({ id, text }) => (
              <Draggable.Item dragId={id} 
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

const DraggableKitWithList = () => {
  const [initialState, setInitialState] = useState(data);
  return (
    <div data-testid="draggable">
      <DraggableProvider
          initialItems={data}
          onReorder={(items) => setInitialState(items)}
      >
        <List enableDrag>
          {initialState.map(({ id, text }) => (
            <ListItem dragId={id} 
                key={id}
            >
              {text}
            </ListItem>
          ))}
        </List>
      </DraggableProvider>
    </div>
  );
};

const DraggableKitWithSelectableList = () => {
  const [initialState, setInitialState] = useState(data);
  return (
    <div data-testid="draggable">
      <DraggableProvider
          initialItems={data}
          onReorder={(items) => setInitialState(items)}
      >
        <SelectableList enableDrag>
          {initialState.map(({ id, text }) => (
            <SelectableList.Item
                dragId={id}
                key={id}
                label={text}
                name={id}
                value={id}
            />
          ))}
        </SelectableList>
      </DraggableProvider>
    </div>
  );
};

const DraggableKitWithCard = () => {
  const [initialState, setInitialState] = useState(data);
  return (
    <div data-testid="draggable">
      <DraggableProvider
          initialItems={data}
          onReorder={(items) => setInitialState(items)}
      >
        <Draggable.Container>
          {initialState.map(({ id, text }) => (
            <Card dragId={id} 
                draggableItem 
                key={id}
            >
              {text}
            </Card>
          ))}
        </Draggable.Container>
      </DraggableProvider>
    </div>
  );
};

const DraggableWithLineVertical = () => {
  const [initialState, setInitialState] = useState(data);
  return (
    <div data-testid={testId}>
      <DraggableProvider
          dropZone={{ type: "line" }}
          initialItems={data}
          onReorder={(items) => setInitialState(items)}
      >
        <Draggable>
          <Draggable.Container>
            {initialState.map(({ id, text }) => (
              <Draggable.Item
                  dragId={id}
                  key={id}
              >
                {text}
              </Draggable.Item>
            ))}
          </Draggable.Container>
        </Draggable>
      </DraggableProvider>
    </div>
  );
};

const DraggableWithLineHorizontal = () => {
  const [initialState, setInitialState] = useState(data);
  return (
    <div data-testid={testId}>
      <DraggableProvider
          dropZone={{ type: "line", direction: "horizontal" }}
          initialItems={data}
          onReorder={(items) => setInitialState(items)}
      >
        <Draggable>
          <Draggable.Container>
            {initialState.map(({ id, text }) => (
              <Draggable.Item
                  dragId={id}
                  key={id}
              >
                {text}
              </Draggable.Item>
            ))}
          </Draggable.Container>
        </Draggable>
      </DraggableProvider>
    </div>
  );
};

test("generated default kit and classname", () => {
  render(<DefaultDraggableKit />);
  const kit = screen.getByTestId(testId);
  expect(kit).toBeInTheDocument();
  expect(kit).toHaveClass("pb_draggable");
});

test("generated Draggable Container", () => {
  render(<DefaultDraggableKit />);
  const kit = screen.getByTestId(testId);

  const container = kit.querySelector(".pb_draggable_container");
  expect(container).toBeInTheDocument();
});

test("generated Draggable Item", () => {
  render(<DefaultDraggableKit />);
  const kit = screen.getByTestId(testId);

  const item = kit.querySelector(".pb_draggable_item");
  expect(item).toBeInTheDocument();
});

test("Attached draggable HTML attributes", () => {
  render(<DefaultDraggableKit />);
  const kit = screen.getByTestId(testId);

  const item = kit.querySelector(".pb_draggable_item");
  expect(item).toHaveAttribute("draggable");
});

test("generated dragHandle with List", () => {
  render(<DraggableKitWithList />);
  const kit = screen.getByTestId(testId);

  const list = kit.querySelector(".pb_list_kit");
  expect(list).toBeInTheDocument();
  const dragHandle = list.querySelector(".pb_custom_icon");
  expect(dragHandle).toBeInTheDocument();
});

test("generated dragHandle with SelectableList", () => {
  render(<DraggableKitWithSelectableList />);
  const kit = screen.getByTestId(testId);

  const selectabellist = kit.querySelector(".pb_selectable_list_kit");
  expect(selectabellist).toBeInTheDocument();
  const dragHandle = selectabellist.querySelector(".pb_custom_icon");
  expect(dragHandle).toBeInTheDocument();
});

test("generated dragHandle with Card", () => {
  render(<DraggableKitWithCard />);
  const kit = screen.getByTestId(testId);

  const card = kit.querySelector(".pb_card_kit");
  expect(card).toBeInTheDocument();
  const dragHandle = card.querySelector(".pb_custom_icon");
  expect(dragHandle).toBeInTheDocument();
});

test("line dropZone with default direction applies 'line_vertical' class to container", () => {
  render(<DraggableWithLineVertical />);
  const kit = screen.getByTestId(testId);
  const container = kit.querySelector(".pb_draggable_container");
  
  expect(container).toHaveClass("line_vertical");
});

test("line dropZone with horizontal direction applies 'line_horizontal' class to container", () => {
  render(<DraggableWithLineHorizontal />);
  const kit = screen.getByTestId(testId);
  const container = kit.querySelector(".pb_draggable_container");
  
  expect(container).toHaveClass("line_horizontal");
});