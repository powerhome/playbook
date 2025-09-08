import React from "react";
import { render, screen } from "../utilities/test-utils";

import DateYearStacked from "./_date_year_stacked";

const TEST_DATE = "01/01/2020 00:00:000 GMT-0500";
jest.setSystemTime(new Date(TEST_DATE));
const testId = "dateyearstacked-kit";
const realDate = Date;

beforeEach(() => {
  global.Date.now = jest.fn(() => new Date(TEST_DATE));
});

afterEach(() => {
  global.Date = realDate;
});

describe("DateYearStacked Kit", () => {
  test("renders DateYearStacked className", () => {
    render(
      <DateYearStacked 
          data={{ testid: testId }} 
          date={new Date(Date.now())}
      />
    );

    const kit = screen.getByTestId(testId);
    expect(kit).toHaveClass("pb_date_year_stacked_left");
  });

  test("renders DateYearStacked text top", () => {
    render(
      <DateYearStacked 
          data={{ testid: testId }} 
          date={new Date(Date.now())}
      />
    );

    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_title_kit.pb_title_4");
    expect(text.textContent).toEqual("1 JAN");
  });

  test("renders DateYearStacked text bottom", () => {
    render(
      <DateYearStacked 
          data={{ testid: testId }} 
          date={new Date(Date.now())}
      />
    );

    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_body_kit_light");
    expect(text.textContent).toEqual("2020");
  });

  test("renders align prop", () => {
    render(
      <DateYearStacked
          align="center"
          data={{ testid: testId }}
          date={new Date(Date.now())}
      />
    );

    const kit = screen.getByTestId(testId);
    expect(kit).toHaveClass("pb_date_year_stacked_center");
  });
});
