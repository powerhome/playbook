import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Avatar from './_avatar'

const imageUrl = 'https://randomuser.me/api/portraits/men/44.jpg',
  testId = 'tjohnson',
  name = 'Terry Johnson',
  imageAlt = 'Terry Johnson Standing'

test('loads the given image url and name', () => {
  render(
    <Avatar
        data={{ testid: testId }}
        imageAlt={imageAlt}
        imageUrl={imageUrl}
        name={name}
    />
  )

  const kit      = screen.getByTestId(testId)
  const image    = screen.getByAltText(imageAlt)
  const initials = name.split(/\s/)[0].substr(0, 1) + name.split(/\s/)[1].substr(0, 1)

  expect(kit).toHaveClass('pb_avatar_kit_size_md')
  expect(kit).toHaveAttribute('data-initials', initials)
  expect(image).toHaveAttribute('data-src', imageUrl)
  expect(image).toHaveAttribute('src', imageUrl)
  expect(image).toHaveAttribute('alt', imageAlt)
})

test('uses the name prop as the alt property if no imageAlt prop is passed in', () => {
  render(
    <Avatar
        data={{ testid: testId }}
        imageUrl={imageUrl}
        name={name}
    />
  )

  const image    = screen.getByAltText(name)

  expect(image).toHaveAttribute('alt', name)
})

test('renders with badge overlay', () => {
  const componentOverlay = {
    component: "badge",
    placement: "top-right",
    text: "New",
    variant: "error"
  };
  render(
    <Avatar
        componentOverlay={componentOverlay}
        data={{ testid: testId }}
        imageAlt={imageAlt}
        imageUrl={imageUrl}
        name={name}
    />
  );

  const badgeOverlay = screen.getByTestId(testId);
 
  expect(badgeOverlay).toBeInTheDocument();
  expect(badgeOverlay).toHaveClass('pb_avatar_kit_size_md');
  expect(badgeOverlay).toHaveTextContent('New');
});

test('renders with iconCircle overlay', () => {
  const componentOverlay = {
    component: "iconCircle",
    placement: "bottom-left",
    icon: "plus",
    variant: "blue"
  };
  render(
    <Avatar
        componentOverlay={componentOverlay}
        data={{ testid: testId }}
        imageAlt={imageAlt}
        imageUrl={imageUrl}
        name={name}
    />
  );

  const iconCircleOverlay = screen.getByTestId(testId);
 
  expect(iconCircleOverlay).toBeInTheDocument();
  expect(iconCircleOverlay).toHaveClass('pb_avatar_kit_size_md');
});


test('renders with online status', () => {
  render(
    <Avatar
        data={{ testid: testId }}
        imageAlt={imageAlt}
        imageUrl={imageUrl}
        name={name}
        status="online"
    />
  );

  const onlineStatusAvatar = screen.getByTestId(testId);
  const onlineStatus = onlineStatusAvatar.querySelector('.pb_online_status_kit_online_size_md')
  expect(onlineStatus).toBeInTheDocument();
});

test('renders with grayscale filter', () => {
  render(
    <Avatar
        data={{ testid: testId }}
        grayscale
        imageAlt={imageAlt}
        imageUrl={imageUrl}
        name={name}
    />
  );

  const grayscaleAvatar = screen.getByTestId(testId);
  expect(grayscaleAvatar).toBeInTheDocument();

  const grayscaleImage = grayscaleAvatar.querySelector('.grayscale')
  expect(grayscaleImage).toBeInTheDocument();
});
