import React, { useState } from "react";

import Flex from '../../pb_flex/_flex'
import Image from '../../pb_image/_image'
import Caption from '../../pb_caption/_caption'
import Draggable from '../../pb_draggable/_draggable'
import { DraggableProvider } from '../../pb_draggable/context'
import List from '../../pb_list/_list'
import ListItem from '../../pb_list/_list_item'
import Avatar from '../../pb_avatar/_avatar'
import Table from '../../pb_table/_table'
import SelectableList from '../../pb_selectable_list/_selectable_list'
import Body from '../../pb_body/_body'
import Card from '../../pb_card/_card'



// Initial items to be dragged
const dataPrimary = [
  {
    id: "81",
    url: "https://unsplash.it/500/400/?image=633",
  },
  {
    id: "82",
    url: "https://unsplash.it/500/400/?image=634",
  },
  {
    id: "83",
    url: "https://unsplash.it/500/400/?image=637",
  },
];
const dataPurple = [
  {
    id: "91",
    url: "https://unsplash.it/500/400/?image=633",
  },
  {
    id: "92",
    url: "https://unsplash.it/500/400/?image=634",
  },
  {
    id: "93",
    url: "https://unsplash.it/500/400/?image=637",
  },
];
const dataHorizontal = [
  {
    id: "201",
    url: "https://unsplash.it/500/400/?image=633",
  },
  {
    id: "202",
    url: "https://unsplash.it/500/400/?image=634",
  },
  {
    id: "203",
    url: "https://unsplash.it/500/400/?image=637",
  },
];

const dataVertical = [
  {
    id: "211",
    url: "https://unsplash.it/500/400/?image=633",
  },
  {
    id: "212",
    url: "https://unsplash.it/500/400/?image=634",
  },
  {
    id: "213",
    url: "https://unsplash.it/500/400/?image=637",
  },
];

const dataLineHorizontal = [
  {
    id: "221",
    text: "Task 1",
  },
  {
    id: "222",
    text: "Task 2",
  },
  {
    id: "223",
    text: "Task 3",
  },
];

const listDataVertical = [
  {
    id: "331",
    text: "Philadelphia",
  },
  {
    id: "332",
    text: "New Jersey",
  },
  {
    id: "333",
    text: "Maryland",
  },
  {
    id: "334",
    text: "Connecticut",
  },
];

const tableData = [
  {
      id: "1000",
      task: "Task 1",
      assignee_name: "Terry Miles",
      assignee_img: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      id: "2000",
      task: "Task 2",
      assignee_name: "Sophia Miles",
      assignee_img: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      id: "3000",
      task: "Task 3",
      assignee_name: "Alice Jones",
      assignee_img: "https://randomuser.me/api/portraits/women/10.jpg",
    },
    {
      id: "4000",
      task: "Task 4",
      assignee_name: "Mike James",
      assignee_img: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: "5000",
      task: "Task 5",
      assignee_name: "James Guy",
      assignee_img: "https://randomuser.me/api/portraits/men/18.jpg",
    }
];

const selectableListData = [
  {
    id: "410",
    text: "Task 1",
  },
  {
    id: "420",
    text: "Task 2",
  },
  {
    id: "430",
    text: "Task 3",
  },
  {
    id: "440",
    text: "Task 4",
  },
];

const DraggableDropZonesColors = (props) => {
  const [initialPrimaryState, setInitialPrimaryState] = useState(dataPrimary);
  const [initialPurpleState, setInitialPurpleState] = useState(dataPurple);
  const [initialHorizontalState, setInitialHorizontalState] = useState(dataHorizontal);
  const [initialVerticalState, setInitialVerticalState] = useState(dataVertical);
  const [initialLineHorizontalState, setInitialLineHorizontalState] = useState(dataLineHorizontal);
  const [initialListVertical, setInitialListVertical] = useState(listDataVertical);
  const [initialStateTable, setInitialStateTable] = useState(tableData);
  const [initialStateSelectableList, setInitialStateSelectableList] = useState(selectableListData);

  return (
    <>
      <Caption marginBottom="xs"
          text="Primary"
      />
      <DraggableProvider
          dropZone={{type: "shadow", color: "primary"}}
          initialItems={dataPrimary}
          onReorder={(items) => setInitialPrimaryState(items)}
      >
          <Draggable.Container {...props}>
              <Flex>
                  {initialPrimaryState.map(({ id, url }) => (
                    <Draggable.Item dragId={id}
                        key={id}
                        marginRight="sm"
                    >
                        <Image alt={id}
                            size="md"
                            url={url}
                        />
                    </Draggable.Item>
                  ))}
              </Flex>
          </Draggable.Container>
      </DraggableProvider>
      <Caption marginBottom="xs"
          text="Purple"
      />
      <DraggableProvider
          dropZone={{type: "outline", color: "purple"}}
          initialItems={dataPurple}
          onReorder={(items) => setInitialPurpleState(items)}
      >
          <Draggable.Container {...props}>
              <Flex>
                  {initialPurpleState.map(({ id, url }) => (
                    <Draggable.Item dragId={id}
                        key={id}
                        marginRight="sm"
                    >
                        <Image alt={id}
                            size="md"
                            url={url}
                        />
                    </Draggable.Item>
                  ))}
              </Flex>
          </Draggable.Container>
      </DraggableProvider>
      <Caption marginBottom="xs" 
          marginTop="xl"
          text="Many PBNTR-935 test examples below for SHADOW and OUTINE comparison - #1A and #1B are the first Row shadow and outline in the Draggable Drop Zones doc example above"
      />
      <Caption marginBottom="xs" 
          marginTop="xl"
          text="#2 Vertical Draggable Item Test"
      />
      <DraggableProvider
          dropZone={{type: "shadow"}}
          // dropZone={{type: "outline"}}
          initialItems={dataVertical}
          onReorder={(items) => setInitialVerticalState(items)}
      >
          <Draggable.Container {...props}>
          <Flex flexDirection="column">
              {initialVerticalState.map(({ id, url }) => (
                <Draggable.Item dragId={id}
                    key={id}
                    marginBottom="sm"
                >
                  <Image alt={id}
                      size="md"
                      url={url}
                  />
                </Draggable.Item>
              ))}
          </Flex>
          </Draggable.Container>
      </DraggableProvider>
      <Caption marginBottom="xs" 
          marginTop="xl"
          text="#3 Vertical Line List Draggable Item Test (no horizontal list kit in pb)"
      />
      <DraggableProvider 
          // dropZone={{type: "shadow"}}
          dropZone={{type: "outline"}}
          initialItems={listDataVertical}
          onReorder={(items) => setInitialListVertical(items)}
      >
          <List enableDrag
              {...props}
          >
              {initialListVertical.map(({ id, text }) => (
                  <ListItem dragId={id}
                      key={id}
                  >
                      {text}
                  </ListItem>
              ))}
          </List>
      </DraggableProvider>
      <Caption marginBottom="xs" 
          marginTop="xl"
          text="#4 Vertical Line Selectable List Draggable Item Test (no horizontal selectable list kit in pb)"
      />
      <DraggableProvider 
          dropZone={{type: "shadow"}}
          // dropZone={{type: "outline"}}
          initialItems={selectableListData}
          onReorder={(items) => setInitialStateSelectableList(items)}
      >
            <SelectableList enableDrag
                variant="radio"
                {...props}
            >
              {initialStateSelectableList.map(({ id, text }) => (
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
      <Caption marginBottom="xs" 
          marginTop="xl"
          text="#5 Vertical Line Table Test (row functionality only no horizontal/column component)"
      />
      <DraggableProvider 
          // dropZone={{type: "shadow"}}
          dropZone={{type: "outline"}}
          initialItems={tableData}
          onReorder={(items) => setInitialStateTable(items)}
      >
          <Table
              responsive="none"
              size="sm" 
              {...props}
          >
            <Table.Head>
              <Table.Row>
                <Table.Header>{"id"}</Table.Header>
                <Table.Header>{"name"}</Table.Header>
                <Table.Header>{"task number"}</Table.Header>
              </Table.Row>
            </Table.Head>
            <Table.Body draggableContainer>
              {initialStateTable.map(({ id, task, assignee_name, assignee_img }) => (
                <Table.Row 
                    dragId={id} 
                    draggableItem
                    key={id}
                >
                  <Table.Cell>{id}</Table.Cell>
                  <Table.Cell>
                    <Flex align="center">
                      <Avatar 
                          imageUrl={assignee_img} 
                          size="xs" 
                      />
                      <Body 
                          paddingLeft="xxs" 
                          text={assignee_name} 
                          {...props}
                      />
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>{task}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
      </DraggableProvider>
      <Caption marginBottom="xs" 
          marginTop="xl"
          text="#6 Horizontal Line Draggable Item Test"
      />
      <DraggableProvider
          dropZone={{type: "shadow"}}
          // dropZone={{type: "outline"}}
          initialItems={dataHorizontal}
          onReorder={(items) => setInitialHorizontalState(items)}
      >
          <Draggable.Container {...props}>
          <Flex>
              {initialHorizontalState.map(({ id, url }) => (
                <Draggable.Item dragId={id}
                    key={id}
                    marginRight="sm"
                >
                  <Image alt={id}
                      size="md"
                      url={url}
                  />
                </Draggable.Item>
              ))}
          </Flex>
          </Draggable.Container>
      </DraggableProvider>
      <Caption marginBottom="xs" 
          marginTop="xl"
          text="#7 Horizontal Line Card Test"
      />
      <DraggableProvider
          // dropZone={{type: "shadow"}}
          dropZone={{type: "outline"}}
          initialItems={dataLineHorizontal}
          onReorder={(items) => setInitialLineHorizontalState(items)}
      >
          <Draggable.Container
              {...props}
          >
              <Flex alignItems="stretch"
                  flexDirection="row"
              > 
                  {initialLineHorizontalState.map(({ id, text }) => (
                    <Card dragId={id}
                        draggableItem
                        key={id}
                        marginRight="xs"
                        padding="xs"
                        {...props}
                    >
                        <Body
                            text={text}
                            {...props}
                        />
                    </Card>
                 ))}
              </Flex>
          </Draggable.Container>
      </DraggableProvider>
    </>
  );
};

export default DraggableDropZonesColors;
