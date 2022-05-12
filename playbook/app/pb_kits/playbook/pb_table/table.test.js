import { ensureAccessible, renderKit } from "../utilities/test-utils"

import Table from "./_table"

const props = {
  data: { testid: "table" },
  sticky: false
}

it("should be accessible", async () => {
  ensureAccessible(Table, props)
})

test("when sticky is true", () => {
  const kit = renderKit(Table, props, { sticky: true })
  expect(kit).toHaveClass("pb_table table-sm table-responsive-collapse table-card sticky-header table-collapse-sm")
})
