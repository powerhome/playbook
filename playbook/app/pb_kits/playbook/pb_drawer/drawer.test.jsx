import React, { useState } from 'react';
import { render, fireEvent, screen } from '../utilities/test-utils';
import { Drawer, Button } from 'playbook-ui';
import { waitFor } from '@testing-library/react';

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
          id="drawer-id"
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

test('renders with the right border class when border prop is right', async () => {
  render(<DrawerTest props={{ border: 'right' }} />);

  fireEvent.click(screen.getByText('Open Drawer'));

  await waitFor(() => expect(document.getElementById('drawer-id')).toBeInTheDocument());

  const container = document.getElementById('drawer-id');
  const drawer = container.querySelector('#drawer-id .pb_drawer');

  expect(drawer).toHaveClass('drawer_border_right');
});

test('renders with the full border class when border prop is full', async () => {
  render(<DrawerTest props={{ border: 'full' }} />);

  fireEvent.click(screen.getByText('Open Drawer'));

  await waitFor(() => expect(document.getElementById('drawer-id')).toBeInTheDocument());

  const container = document.getElementById('drawer-id');
  const drawer = container.querySelector('#drawer-id .pb_drawer');
  expect(drawer).toHaveClass('drawer_border_full');
});

test('does not have a border class when border prop is none', async () => {
  render(<DrawerTest props={{ border: 'none' }} />);

  fireEvent.click(screen.getByText('Open Drawer'));

  await waitFor(() => expect(document.getElementById('drawer-id')).toBeInTheDocument());

  const container = document.getElementById('drawer-id');
  const drawer = container.querySelector('#drawer-id .pb_drawer');
  expect(drawer).not.toHaveClass('drawer_border_right');
  expect(drawer).not.toHaveClass('drawer_border_left');
  expect(drawer).not.toHaveClass('drawer_border_full');
});

test('renders the correct size class for a large drawer', async () => {
  render(<DrawerTest props={{ size: 'lg' }} />);

  fireEvent.click(screen.getByText('Open Drawer'));

  await waitFor(() => expect(document.getElementById('drawer-id')).toBeInTheDocument());

  const container = document.getElementById('drawer-id');
  const drawer = container.querySelector('#drawer-id .pb_drawer');
  expect(drawer).toHaveClass('pb_drawer pb_drawer_lg_left');
});
