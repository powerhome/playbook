import PbMultiLevelSelect from "./index"

const TREE = [
  {
    id: "parent",
    label: "Parent",
    children: [
      { id: "child-a", label: "Child A" },
      { id: "child-b", label: "Child B" },
    ],
  },
]

const kitHtml = ({
  treeData = TREE,
  selectedIds = [],
  returnAllSelected = false,
  variant = "multi",
  name = "location",
} = {}) => `
  <div
    class="pb_multi_level_select"
    data-pb-multi-level-select="true"
    data-tree-data='${JSON.stringify(treeData)}'
    data-selected-ids='${JSON.stringify(selectedIds)}'
    data-return-all-selected="${returnAllSelected}"
    data-variant="${variant}"
    data-name="${name}"
    data-input-display="pills"
    data-placeholder="Start typing..."
    data-show-checked-children="true"
    id="mls-test"
  >
    <div class="wrapper" data-pb-mls-wrapper>
      <div class="input_wrapper" data-pb-mls-input-wrapper>
        <div class="input_inner_container" data-pb-mls-inner>
          <input data-pb-mls-search id="mls-test_input" type="text" />
        </div>
        <div data-pb-mls-arrow-down id="arrow_down_mls-test"></div>
        <div data-pb-mls-arrow-up id="arrow_up_mls-test" style="display: none;"></div>
      </div>
      <div class="dropdown_menu close" data-pb-mls-menu></div>
    </div>
    <template data-pb-mls-template="checkbox-row">
      <div>
        <li class="dropdown_item">
          <div class="dropdown_item_checkbox_row">
            <div data-pb-mls-toggle-slot></div>
            <div class="pb_checkbox_kit_off">
              <input type="checkbox" />
              <span class="pb_checkbox_label"><span class="pb_body_kit">Label</span></span>
            </div>
          </div>
          <div data-pb-mls-nested></div>
        </li>
      </div>
    </template>
    <template data-pb-mls-template="radio-row">
      <div>
        <li class="dropdown_item">
          <div class="dropdown_item_checkbox_row">
            <div data-pb-mls-toggle-slot></div>
            <div class="pb_radio_kit">
              <input type="radio" name="mls_radio" />
              <span class="pb_body_kit">Label</span>
            </div>
          </div>
          <div data-pb-mls-nested></div>
        </li>
      </div>
    </template>
    <template data-pb-mls-template="hide-radio-row">
      <div>
        <li class="dropdown_item">
          <div class="dropdown_item_checkbox_row">
            <div data-pb-mls-toggle-slot></div>
            <div class="pb_body_kit">Label</div>
          </div>
          <div data-pb-mls-nested></div>
        </li>
      </div>
    </template>
    <template data-pb-mls-template="chevron-down">
      <div class="pb_circle_icon_button_kit"></div>
    </template>
    <template data-pb-mls-template="chevron-right">
      <div class="pb_circle_icon_button_kit"></div>
    </template>
    <template data-pb-mls-template="pill">
      <div class="pb_form_pill_kit">
        <span class="pb_form_pill_tag">Label</span>
        <span class="pb_form_pill_close"></span>
      </div>
    </template>
  </div>
`

const hiddenIds = (root) =>
  [...root.querySelectorAll('input[type="hidden"][data-pb-mls-hidden]')].map(
    (input) => input.value
  )

const eventIds = (event) => (event.detail.value || []).map((item) => item.id)

const mountKit = (options) => {
  document.body.innerHTML = kitHtml(options)
  const element = document.querySelector("[data-pb-multi-level-select]")
  const events = []
  element.addEventListener("pb-multi-level-select-change", (event) => {
    events.push({
      ids: eventIds(event),
      hiddenIds: hiddenIds(element),
    })
  })
  const kit = new PbMultiLevelSelect(element)
  kit.connect()
  return { element, events, kit }
}

describe("PbMultiLevelSelect change event", () => {
  afterEach(() => {
    document.body.innerHTML = ""
    delete window["clearMultiLevelSelect_mls-test"]
  })

  test("does not fire during connect, including when selected_ids hydrate hidden inputs", () => {
    const { events, element } = mountKit({ selectedIds: ["child-a"] })

    expect(events).toHaveLength(0)
    expect(hiddenIds(element)).toEqual(["child-a"])
  })

  test("fires once per checkbox selection and matches hidden inputs", () => {
    const { events, element, kit } = mountKit()

    kit.handledropdownItemClick("child-a", true)

    expect(events).toHaveLength(1)
    expect(events[0].ids).toEqual(["child-a"])
    expect(events[0].hiddenIds).toEqual(["child-a"])
    expect(hiddenIds(element)).toEqual(["child-a"])
  })

  test("fires once for parent selection with the collapsed selected set", () => {
    const { events, element, kit } = mountKit()

    kit.handledropdownItemClick("parent", true)

    expect(events).toHaveLength(1)
    expect(events[0].ids).toEqual(["parent"])
    expect(events[0].hiddenIds).toEqual(["parent"])
    expect(hiddenIds(element)).toEqual(["parent"])
  })

  test("fires once for parent deselection", () => {
    const { events, kit } = mountKit({ selectedIds: ["parent"] })

    kit.handledropdownItemClick("parent", false)

    expect(events).toHaveLength(1)
    expect(events[0].ids).toEqual([])
    expect(events[0].hiddenIds).toEqual([])
  })

  test("returnAllSelected parent selection includes every checked id in both event and hiddens", () => {
    const { events, element, kit } = mountKit({ returnAllSelected: true })

    kit.handledropdownItemClick("parent", true)

    expect(events).toHaveLength(1)
    expect(events[0].ids).toEqual(["parent", "child-a", "child-b"])
    expect(events[0].hiddenIds).toEqual(["parent", "child-a", "child-b"])
    expect(hiddenIds(element)).toEqual(["parent", "child-a", "child-b"])
  })

  test("fires once for pill removal and matches hidden inputs", () => {
    const { events, element, kit } = mountKit({ selectedIds: ["child-a"] })

    kit.handlePillClose({ stopPropagation() {} }, "child-a")

    expect(events).toHaveLength(1)
    expect(events[0].ids).toEqual([])
    expect(events[0].hiddenIds).toEqual([])
    expect(hiddenIds(element)).toEqual([])
  })

  test("expand/collapse does not fire a change event", () => {
    const { events, kit } = mountKit()

    kit.handleToggleClick("parent")

    expect(events).toHaveLength(0)
  })
})
