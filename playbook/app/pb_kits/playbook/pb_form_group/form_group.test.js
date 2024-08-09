import React from 'react'
import { render } from "../utilities/test-utils";

import { Button, FormGroup } from "playbook-ui";

test("should render a div with a button child", () => {
  const testId = "primary-test"
  const { queryByTestId } = render(
    <FormGroup>
      <Button 
          data={{ testid: testId }} 
          text={"some text"} />
    </FormGroup>
  )

  expect(queryByTestId("primary-test")).not.toBeNull;
})
