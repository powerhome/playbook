import React from "react";
import { render, screen } from "../utilities/test-utils";

import WeekdayStacked from "./_weekday_stacked";

const TEST_DATE = "01/01/2020 00:00:000 GMT-0500";
jest.setSystemTime(new Date(TEST_DATE));
const testId = "weekdaystacked-kit";
const realDate = Date;

beforeEach(() => {
  global.Date.now = jest.fn(() => new Date(TEST_DATE));
});

afterEach(() => {
  global.Date = realDate;
});

describe("WeekdayStacked Kit", () => {
  test("renders className", () => {
    render(
      <WeekdayStacked 
          data={{ testid: testId }} 
      />
    );

    const kit = screen.getByTestId(testId);
    expect(kit).toHaveClass("pb_weekday_stacked_kit_left");
  });

  test("renders Caption with weekday", () => {
    render(
      <WeekdayStacked 
          data={{ testid: testId }}
      />
    );

    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_caption_kit_md");
    expect(text.textContent).toEqual("Wed") 
  });

  test("renders Title with date", () => {
    render(
      <WeekdayStacked 
          data={{ testid: testId }}
      />
    );

    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_title_kit.pb_title_4");
    expect(text.textContent).toEqual("1/1") 
  });

  test("renders compact prop", () => {
    render(
      <WeekdayStacked 
          compact
          data={{ testid: testId }}
      />
    );

    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_caption_kit_md");
    expect(text.textContent).toEqual("W") 
  });

  test("renders align prop", () => {
    render(
        <WeekdayStacked 
            align="left"
            data={{ testid: testId }}
        />
    );
      
    const kit = screen.getByTestId(testId);
    expect(kit).toHaveClass("pb_weekday_stacked_kit_left")
  });

  test("renders day_only variant prop", () => {
    render(
        <WeekdayStacked 
            data={{ testid: testId }}
            variant="day_only"
        />
    );
      
    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_title_kit.pb_title_4");
    expect(text.textContent).toEqual("1") 
  });

  test("renders expanded variant prop", () => {
    render(
        <WeekdayStacked 
            data={{ testid: testId }}
            variant="expanded"
        />
    );
      
    const kit = screen.getByTestId(testId);
    const text = kit.querySelector(".pb_title_kit.pb_title_4");
    expect(text.textContent).toEqual("Jan 1") 
  });
});
