import React, { useState } from 'react';
import { render, cleanup, fireEvent, screen } from '../utilities/test-utils';
import { Drawer, Button } from 'playbook-ui';

const size = 'sm';

function DrawerTest({ props }) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return (
    <>
      <Button onClick={open}>{'Open Drawer'}</Button>
      <Drawer
          className="wrapper"
          onClose={close}
          opened={isOpen}
          placement="left"
          portalClassName="portal"
          size={size}
          {...props}
      >
        {props && props.children}
      </Drawer>
    </>
  );
}

afterEach(cleanup);

test('renders with the right border class when border prop is right', async () => {
  render(<DrawerTest props={{ border: 'right' }} />);

  fireEvent.click(screen.getByText('Open Drawer'));

  const drawer = await screen.findByRole('dialog');
  expect(drawer).toHaveClass('drawer_border_right');
});

test('renders with the left border class when border prop is left', async () => {
  render(<DrawerTest props={{ border: 'left' }} />);

  fireEvent.click(screen.getByText('Open Drawer'));

  const drawer = await screen.findByRole('dialog');
  expect(drawer).toHaveClass('drawer_border_left');
});

test('renders with the full border class when border prop is full', async () => {
  render(<DrawerTest props={{ border: 'full' }} />);

  fireEvent.click(screen.getByText('Open Drawer'));

  const drawer = await screen.findByRole('dialog');
  expect(drawer).toHaveClass('drawer_border_full');
});

test('does not have a border class when border prop is none', async () => {
  render(<DrawerTest props={{ border: 'none' }} />);

  fireEvent.click(screen.getByText('Open Drawer'));

  const drawer = await screen.findByRole('dialog');
  expect(drawer).not.toHaveClass('drawer_border_right');
  expect(drawer).not.toHaveClass('drawer_border_left');
  expect(drawer).not.toHaveClass('drawer_border_full');
});

test('renders the correct size class for a large drawer', async () => {
  render(<DrawerTest props={{ size: 'lg' }} />);

  fireEvent.click(screen.getByText('Open Drawer'));

  const drawer = await screen.findByRole('dialog');
  expect(drawer).toHaveClass('pb_drawer pb_drawer_lg_left');
});
