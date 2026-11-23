import PbAdvancedTable from "./index";

const UP_ARROW_SELECTOR = "#advanced-table_close_icon";
const DOWN_ARROW_SELECTOR = "#advanced-table_open_icon";

function toggleButton(id) {
  return `
    <button id="${id}" data-advanced-table="true" type="button">
      <i id="advanced-table_open_icon"></i>
      <i id="advanced-table_close_icon" style="display: none"></i>
    </button>
  `;
}

function buildTable() {
  const root = document.createElement("div");
  root.className = "pb_advanced_table";
  root.id = "demo-table";
  root.innerHTML = `
    <table class="pb_table">
      <thead>
        <tr>
          <th>
            <button id="expand-all" type="button">Expand all</button>
          </th>
        </tr>
      </thead>
      <tbody class="pb_advanced_table_body">
        <tr class="pb_table_tr" data-row-depth="0" data-advanced-table-content="1">
          <td>${toggleButton("demo_1")}</td>
        </tr>
        <tr class="pb_table_tr toggle-content" data-row-depth="1" data-row-parent="demo_1" data-advanced-table-content="1-2" style="display: none">
          <td>${toggleButton("demo_2")}</td>
        </tr>
        <tr class="pb_table_tr toggle-content" data-row-depth="2" data-row-parent="demo_2" data-advanced-table-content="1-2-3" style="display: none">
          <td>${toggleButton("demo_3")}</td>
        </tr>
        <tr class="pb_table_tr toggle-content" data-row-depth="3" data-row-parent="demo_3" data-advanced-table-content="1-2-3-4" style="display: none">
          <td>Day</td>
        </tr>
        <tr class="pb_table_tr" data-row-depth="0" data-advanced-table-content="5">
          <td>${toggleButton("demo_5")}</td>
        </tr>
        <tr class="pb_table_tr toggle-content" data-row-depth="1" data-row-parent="demo_5" data-advanced-table-content="5-6" style="display: none">
          <td>${toggleButton("demo_6")}</td>
        </tr>
        <tr class="pb_table_tr toggle-content" data-row-depth="2" data-row-parent="demo_6" data-advanced-table-content="5-6-7" style="display: none">
          <td>Leaf</td>
        </tr>
      </tbody>
    </table>
  `;
  document.body.appendChild(root);
  return root;
}

function row(content) {
  return document.querySelector(`[data-advanced-table-content="${content}"]`);
}

function button(id) {
  return document.getElementById(id);
}

function isExpanded(toggle) {
  return toggle.querySelector(UP_ARROW_SELECTOR).style.display === "inline-block";
}

function isRowVisible(tableRow) {
  return tableRow.style.display === "table-row" && tableRow.classList.contains("is-visible");
}

describe("PbAdvancedTable expand all", () => {
  let expandAll;

  beforeEach(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    document.body.innerHTML = "";
    PbAdvancedTable.expandedRows.clear();
    PbAdvancedTable.selectedRows.clear();
    const root = buildTable();
    const instance = new PbAdvancedTable(button("demo_1"));
    instance.connect();
    expandAll = root.querySelector("#expand-all");
  });

  afterEach(() => {
    document.body.innerHTML = "";
    PbAdvancedTable.expandedRows.clear();
  });

  test("expands top-level rows only, matching React", () => {
    expect(() => window.expandAllRows(expandAll)).not.toThrow();

    expect(isExpanded(button("demo_1"))).toBe(true);
    expect(isExpanded(button("demo_5"))).toBe(true);
    expect(isExpanded(button("demo_2"))).toBe(false);
    expect(isRowVisible(row("1-2"))).toBe(true);
    expect(row("1-2-3").style.display).toBe("none");
    expect(row("5-6-7").style.display).toBe("none");
  });

  test("collapses all top-level rows on the second click", () => {
    window.expandAllRows(expandAll);
    expect(() => window.expandAllRows(expandAll)).not.toThrow();

    expect(isExpanded(button("demo_1"))).toBe(false);
    expect(isExpanded(button("demo_5"))).toBe(false);
    expect(row("1-2").style.display).toBe("none");
    expect(row("5-6").style.display).toBe("none");
  });

  test("keeps nested rows that were already open across expand and collapse all", () => {
    button("demo_1").click();
    button("demo_2").click();

    window.expandAllRows(expandAll);

    expect(isExpanded(button("demo_2"))).toBe(true);
    expect(isRowVisible(row("1-2-3"))).toBe(true);
    expect(row("1-2-3-4").style.display).toBe("none");
    expect(isExpanded(button("demo_3"))).toBe(false);

    window.expandAllRows(expandAll);
    expect(row("1-2-3").style.display).toBe("none");

    window.expandAllRows(expandAll);
    expect(isExpanded(button("demo_2"))).toBe(true);
    expect(isRowVisible(row("1-2-3"))).toBe(true);
  });

  test("individual row toggles do not affect sibling branches", () => {
    button("demo_1").click();

    expect(isRowVisible(row("1-2"))).toBe(true);
    expect(row("1-2-3").style.display).toBe("none");
    expect(row("5-6").style.display).toBe("none");
    expect(isExpanded(button("demo_5"))).toBe(false);

    button("demo_2").click();
    expect(isRowVisible(row("1-2-3"))).toBe(true);
    expect(row("5-6").style.display).toBe("none");

    button("demo_1").click();
    expect(row("1-2").style.display).toBe("none");
    expect(row("1-2-3").style.display).toBe("none");
    expect(button("demo_5").querySelector(DOWN_ARROW_SELECTOR).style.display).not.toBe("none");
  });
});
