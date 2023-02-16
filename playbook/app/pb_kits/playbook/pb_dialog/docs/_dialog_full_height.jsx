import React, { useState } from "react";
import {
  Body,
  Button,
  Caption,
  Dialog,
  Flex,
  RichTextEditor,
  Typeahead,
  Card,
  Table,
  DatePicker,
  FixedConfirmationToast,
  Pill,
  Select
} from "../..";

const useDialog = (visible = false) => {
  const [opened, setOpened] = useState(visible);
  const toggle = () => setOpened(!opened);

  return [opened, toggle];
};

const DialogFullHeight = () => {
  ////testing start
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })

  const { vertical, horizontal, open } = state

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }
  const testoptions = [
    {
      value: '1',
      text: 'Burgers',
    },
    {
      value: '2',
      text: 'Pizza',
    },
    {
      value: '3',
      text: 'Tacos',
    },
  ]

/// testing end
  const [headerSeparatorDialogOpened, toggleHeaderSeparatorDialog] =
    useDialog();
  const [footerSeparatorDialogOpened, toggleFooterSeparatorDialog] =
    useDialog();
  const [bothSeparatorsDialogOpened, toggleBothSeparatorsDialog] = useDialog();

  const dialogs = [
    {
      size: "sm",
      title: "Small Dialog",
      toggle: toggleHeaderSeparatorDialog,
      visible: headerSeparatorDialogOpened,
    },
    {
      size: "md",
      title: "Medium Dialog",
      toggle: toggleFooterSeparatorDialog,
      visible: footerSeparatorDialogOpened,
    },
    {
      size: "lg",
      title: "Large Dialog",
      toggle: toggleBothSeparatorsDialog,
      visible: bothSeparatorsDialogOpened,
    },
  ];

  return (
    <>
      <Flex wrap>
        <Button id="sm"
            marginRight="md"
            onClick={toggleHeaderSeparatorDialog}>
          {"Small Dialog"}
        </Button>
        <Button marginRight="md"
            onClick={toggleFooterSeparatorDialog}>
          {"Medium Dialog"}
        </Button>
        <Button marginRight="md"
            onClick={toggleBothSeparatorsDialog}>
          {"Large Dialog"}
        </Button>
      </Flex>
      <Flex>
        {dialogs.map(({toggle, visible, placement, size, title}, index) => (
          <Dialog
              fullHeight
              key={index}
              onClose={toggle}
              opened={visible}
              placement={placement}
              size={size}
          >
            <Dialog.Header>
              <Body>{title}</Body>
            </Dialog.Header>
            <Dialog.Body marginBottom="xl"
                paddingBottom="xl">
              <Caption marginBottom="xs">{"Description"}</Caption>
              <RichTextEditor />
              <br />
              <Caption>
                {
                  "Type in a word or term too help find tickets later. ex. training,"
                }
                {"phone setup, hr"}
              </Caption>
              <Typeahead placeholder="Tags.." />
              <div>
                <Select
                    label="Favorite Food"
                    name="food"
                    options={testoptions}
                />
              </div>
              <div>
                <Pill
                    text="success"
                    variant="success"
                />

                <Pill
                    text="error"
                    variant="error"
                />

                <Pill
                    text="warning"
                    variant="warning"
                />

                <Pill
                    text="info"
                    variant="info"
                />

                <Pill
                    text="neutral"
                    variant="neutral"
                />

                <Pill
                    text="primary"
                    variant="primary"
                />
              </div>
              <Button
                  onClick={handleClick({
                  horizontal: 'center',
                  open: true,
                  vertical: 'top',
                  })}
                  text="Top Center"
                  variant="secondary"
      />
      <FixedConfirmationToast
          closeable
          horizontal={horizontal}
          onClose={handleClose}
          open={open}
          status="neutral"
          text={`${vertical} ${horizontal}`}
          vertical={vertical}
      />
      <Card
          padding="none"
      >
        <Card.Header>
          <Body
              text="category_1"
          />
        </Card.Header>
        <Card.Body>
          <Body
              text="Body"
          />
        </Card.Body>
      </Card>

      <DatePicker
          pickerId="date-picker-default"
       />

<Table
    size="sm"
>
      <thead>
        <tr>
          <th>{'Column 1'}</th>
          <th>{'Column 2'}</th>
          <th>{'Column 3'}</th>
          <th>{'Column 4'}</th>
          <th>{'Column 5'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
      </tbody>
    </Table>
    <Card
        padding="none"
    >
        <Card.Header>
          <Body
              text="category_1"
          />
        </Card.Header>
        <Card.Body>
          <Body
              text="Body"
          />
        </Card.Body>
      </Card>

      <DatePicker
          pickerId="date-picker-default"
      />

<Table
    size="sm"
>
      <thead>
        <tr>
          <th>{'Column 1'}</th>
          <th>{'Column 2'}</th>
          <th>{'Column 3'}</th>
          <th>{'Column 4'}</th>
          <th>{'Column 5'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
      </tbody>
    </Table>
    <Card
        padding="none"
    >
        <Card.Header>
          <Body
              text="category_1"
          />
        </Card.Header>
        <Card.Body>
          <Body
              text="Body"
          />
        </Card.Body>
      </Card>

      <DatePicker
          pickerId="date-picker-default"
      />

<Table
    size="sm"
>
      <thead>
        <tr>
          <th>{'Column 1'}</th>
          <th>{'Column 2'}</th>
          <th>{'Column 3'}</th>
          <th>{'Column 4'}</th>
          <th>{'Column 5'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
      </tbody>
    </Table>


            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={toggle}>{"Send My Issue"}</Button>
              <Button onClick={toggle}
                  variant="link">
                {"Back"}
              </Button>
            </Dialog.Footer>
          </Dialog>
        ))}
      </Flex>
    </>
  );
};

export default DialogFullHeight;
