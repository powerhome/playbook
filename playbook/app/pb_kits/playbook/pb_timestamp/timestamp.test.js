import React from "react";
import { render, screen } from "../utilities/test-utils";

import Timestamp from "./_timestamp";

const TEST_DATE = "01/01/2020 00:00:000 GMT-0500";
jest.setSystemTime(new Date(TEST_DATE));

const testId = "timestamp-kit";
const realDate = Date;
const futureDate = new Date(
  new Date().getFullYear() + 4,
  new Date().getMonth(),
  new Date().getDate(),
  new Date().getHours(),
  new Date().getMinutes()
);

beforeEach(() => {
  global.Date.now = jest.fn(() => new Date(TEST_DATE).getTime());
});

afterEach(() => {
  global.Date = realDate;
});

describe("Timestamp Kit", () => {
  test("renders Timestamp className", () => {
    render(
      <Timestamp
          align="left"
          data={{ testid: testId }}
          showDate
          timestamp={new Date(Date.now())}
      />
    );

    const kit = screen.getByTestId(testId);
    expect(kit).toHaveClass("pb_timestamp_kit_left_variant");
  });

  test("renders Timestamp time", () => {
    render(
      <Timestamp
          align="left"
          data={{ testid: testId }}   
          showDate={false}
          timestamp={new Date(Date.now())}
      />
    );

    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_caption_kit_xs");
    expect(text.textContent).toEqual("12:00a");
  });

  test("renders Timestamp date and time with future year", () => {
    render(
      <Timestamp
          align="left"
          data={{ testid: testId }}
          showDate
          timestamp={new Date(futureDate)}
      />
    );
    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_caption_kit_xs");
    expect(text.textContent).toEqual("Jan 1, 2024  ·  12:00a");
  });

  test("renders Timestamp className with alignment", () => {
    render(
      <Timestamp
          align="center"
          data={{ testid: testId }}
          showDate
          timestamp={new Date(Date.now())}
      />
    );

    const kit = screen.getByTestId(testId);
    expect(kit).toHaveClass("pb_timestamp_kit_center_variant");
  });

  test("renders Timestamp timezone", () => {
    render(
      <Timestamp
          align="left"
          data={{ testid: testId }}
          showDate={false}
          showTimezone
          timestamp={new Date()}
          timezone="America/New_York"
      />
    );
    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_caption_kit_xs");
    expect(text.textContent).toEqual("12:00a EST");
  });

  test("renders Timestamp updated variant with user", () => {
    render(
      <Timestamp
          data={{ testid: testId }}
          showDate={false}
          showUser
          text="Maricris Nonato"
          timestamp={new Date()}
          variant="updated"
      />
    );
    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_caption_kit_xs");
    expect(text.textContent).toEqual(
      "Last updated  by Maricris Nonato on Jan 1 at 12:00a"
    );
  });

  test("renders Timestamp updated variant without user", () => {
    render(
      <Timestamp
          data={{ testid: testId }}
          showDate={false}
          timestamp={new Date()}
          variant="updated"
      />
    );
    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_caption_kit_xs");
    expect(text.textContent).toEqual("Last updated  on Jan 1 at 12:00a");
  });

  test("renders Timestamp elapsed variant with user", () => {
    render(
      <Timestamp
          data={{ testid: testId }}
          showUser
          text="Maricris Nonato"
          timestamp={new Date()}
          variant="elapsed"
      />
    );
    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_caption_kit_xs");
    expect(text.textContent).toEqual(
      "Last updated  by Maricris Nonato a few seconds ago"
    );
  });

  test("renders Timestamp elapsed variant without user and without updated text", () => {
    render(
      <Timestamp
          data={{ testid: testId }}
          hideUpdated
          showUser={false}
          timestamp={new Date()}
          variant="elapsed"
      />
    );
    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_caption_kit_xs");
    expect(text.textContent).toEqual("  a few seconds ago");
  });
});
