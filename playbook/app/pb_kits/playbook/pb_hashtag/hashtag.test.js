
import React from 'react'
import { render, screen, cleanup } from "../utilities/test-utils";

import { Hashtag } from "playbook-ui";


const testId = "primary-test"
const text="Open in a new window"
const type="project"
const url="https://google.com"
const typeMap = {
  home: 'H#',
  project: 'P#',
  appointment: 'A#',
  default: '#',
}

function HashtagTest(props) {
    return (
        <Hashtag
            data={{ testid: testId }}
            text={text}
            type={type}
            url={url}
            {...props}
        />
    );
  }

  test("renders the component", () => {
    render(<HashtagTest/>);
    const kit = screen.getByTestId("primary-test");
    expect(kit).toBeInTheDocument();
    expect(kit).toHaveClass("pb_hashtag_kit");

    cleanup()
  });

  test("should pass in url property and allow links to open in a new window", () => {
    const { container } = render(<HashtagTest newWindow />);
    expect(container.getElementsByClassName("pb_hashtag_kit")[0].firstChild).toHaveAttribute("href", url);
    expect(container.getElementsByClassName("pb_hashtag_kit")[0].firstChild).toHaveAttribute("target", "_blank");

    cleanup()
  });

  test("renders the badge kit with appropriate text", () => {
    const { container } = render(<HashtagTest />);
    expect(container.getElementsByClassName("pb_badge_kit_primary")[0]).toBeInTheDocument;
    expect(container.getElementsByClassName("pb_badge_kit_primary")[0]).toHaveTextContent(typeMap[type] + text);

    cleanup()
  });