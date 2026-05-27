# Adding Advanced Table Documentation Examples

This guide explains how to add new documentation examples for the Advanced Table component.

## Overview

Advanced Table docs live in two main locations:
- **Playbook package**: `playbook/app/pb_kits/playbook/pb_advanced_table/docs/`
- **Website config**: `playbook-website/config/menu.yml`

For React examples, the doc system runs code in a sandboxed environment where mock data is injected at runtime (not resolved from imports).

## File Structure

Each doc example typically needs:

```
pb_advanced_table/docs/
├── _advanced_table_your_example.jsx      # React example
├── _advanced_table_your_example.md       # Documentation text
├── _advanced_table_your_example_rails.html.erb  # (Optional) Rails example
├── _advanced_table_your_example_rails.md        # (Optional) Rails docs
└── your_mock_data.json                   # (If new dataset needed)
```

## Step 1: Create the React Example (.jsx)

Create `_advanced_table_your_example.jsx`:

```jsx
import React from "react"
import AdvancedTable from '../../pb_advanced_table/_advanced_table'
import MOCK_DATA from "./advanced_table_mock_data.json"  // Use existing or new dataset

const AdvancedTableYourExample = (props) => {
  const columnDefinitions = [
    // Define your columns...
  ]

  return (
    <AdvancedTable
        columnDefinitions={columnDefinitions}
        tableData={MOCK_DATA}
        {...props}
    />
  )
}

export default AdvancedTableYourExample
```

## Step 2: Create the Markdown Documentation (.md)

Create `_advanced_table_your_example.md`:

```markdown
Explain what the example demonstrates. Keep it concise but informative.

- Describe the props being showcased
- Mention any important behavior
- Note default values if relevant
```

## Step 3: Export in index.js

Add your example to `pb_advanced_table/docs/index.js`:

```js
export { default as AdvancedTableYourExample } from './_advanced_table_your_example.jsx'
```

**Important**: The export name must be PascalCase and match the pattern `AdvancedTable<ExampleName>`.

## Step 4: Update menu.yml

Edit `playbook-website/config/menu.yml` to add your example to the appropriate `kit_section`.

Find the relevant category under `advanced_table` and add your example title:

```yaml
- category: advanced_table
  components:
  - name: pagination_&_data_states
    parent: advanced_table
    kit_section: ["Pagination", "Pagination Props", "Loading State", "Inline Row Loading", "Your New Example"]
```

The kit section title should match your example name with spaces (e.g., `_advanced_table_your_example` → `"Your Example"`).

## Adding a New Dataset

If your example needs custom mock data that doesn't exist, follow these additional steps:

### Step A: Create the JSON File

Create `advanced_table_mock_data_your_data.json` in the docs folder:

```json
[
  {
    "year": "2021",
    "quarter": null,
    "month": null,
    "day": null,
    "yourField": "value",
    "children": []
  }
]
```

**Naming convention**: `advanced_table_mock_data_<descriptor>.json` (no leading underscore)

### Step B: Update pages_controller.rb

Add methods to load your data in `playbook-website/app/controllers/pages_controller.rb`:

```ruby
# Around line 810, in assign_advanced_table_doc_mocks method:
# Add beta assignment for React:
@beta_table_data_your_data = advanced_table_mock_data_your_data_beta if @beta_table_data_your_data.nil?

# Add Rails assignment (after the "return unless @type.to_s == 'rails'" line):
@table_data_your_data = advanced_table_mock_data_your_data if @table_data_your_data.nil?

# Add the loader methods at the bottom of the controller:

def advanced_table_mock_data_your_data
  file_path = Playbook::Engine.root.join("app/pb_kits/playbook/pb_advanced_table/docs/advanced_table_mock_data_your_data.json")
  return nil unless File.exist?(file_path)

  JSON.parse(File.read(file_path), object_class: OpenStruct)
rescue
  nil
end

def advanced_table_mock_data_your_data_beta
  file_path = Playbook::Engine.root.join("app/pb_kits/playbook/pb_advanced_table/docs/advanced_table_mock_data_your_data.json")
  return nil unless File.exist?(file_path)

  JSON.parse(File.read(file_path))
rescue
  nil
end
```

### Step C: Add to JSON Response

In the same controller, find the JSON response block (around line 193) and add:

```ruby
table_data_your_data: @beta_table_data_your_data,
```

### Step D: Update KitShow Component

Edit `playbook-website/app/javascript/components/Website/src/pages/KitShow/index.tsx`:

Add your variable to the `exampleProps` object:

```typescript
const exampleProps = useMemo(() => {
  const isAdvancedTable = loaderData?.kit === "advanced_table";
  if (!isAdvancedTable) return {};

  return {
    MOCK_DATA: loaderData.table_data || [],
    // ... existing entries ...
    YOUR_MOCK_DATA: loaderData.table_data_your_data || [],  // Add this
  };
}, [loaderData]);
```

### Step E: Use in Your Example

In your `.jsx` file, import from the JSON (for code display) and use the injected variable name:

```jsx
import YOUR_MOCK_DATA from "./advanced_table_mock_data_your_data.json"

// Use YOUR_MOCK_DATA in your component
tableData={YOUR_MOCK_DATA}
```

The import is for code display purposes. At runtime, the variable is injected by the doc system.

## Existing Datasets

Before creating a new dataset, check if an existing one works:

| Variable Name | JSON File | Description |
|--------------|-----------|-------------|
| `MOCK_DATA` | `advanced_table_mock_data.json` | Standard hierarchical data |
| `MOCK_DATA_WITH_ID` | `advanced_table_mock_data_with_id.json` | Data with row IDs |
| `MOCK_DATA_NO_SUBROWS` | `advanced_table_mock_data_no_subrows.json` | Flat data without children |
| `PAGINATION_MOCK_DATA` | `advanced_table_pagination_mock_data.json` | Data for pagination examples |
| `INFINITE_SCROLL_MOCK_DATA` | `advanced_table_mock_data_infinite_scroll.json` | Large dataset for infinite scroll |
| `MOCK_DATA_INLINE_LOADING` | `advanced_table_mock_data_inline_loading.json` | Data with empty children arrays |
| `MOCK_DATA_INLINE_LOADING_EMPTY_CHILDREN` | `advanced_table_mock_data_inline_loading_empty_children.json` | All rows have empty children |

## Rails Examples (Optional)

For Rails examples, create:

1. `_advanced_table_your_example_rails.html.erb` - The ERB template
2. `_advanced_table_your_example_rails.md` - Rails-specific documentation

Rails examples use instance variables (e.g., `@table_data`) instead of imports.

## Checklist

- [ ] Created `.jsx` file with proper imports and default export
- [ ] Created `.md` file with documentation
- [ ] Added export to `index.js`
- [ ] Added to appropriate `kit_section` in `menu.yml`
- [ ] (If new dataset) Created JSON file
- [ ] (If new dataset) Added controller methods
- [ ] (If new dataset) Added to JSON response
- [ ] (If new dataset) Added to KitShow `exampleProps`
- [ ] Restarted dev server to test

## Troubleshooting

### "ReferenceError: VARIABLE_NAME is not defined"

This means the runtime injection is missing. Ensure you:
1. Added the variable to `exampleProps` in `KitShow/index.tsx`
2. Added the data to the JSON response in `pages_controller.rb`
3. Created the controller methods to load the data

### Example not appearing in docs

Check that:
1. The export in `index.js` follows the naming pattern
2. The `kit_section` title in `menu.yml` matches your example name
3. You restarted the dev server after changes

### JSON file not loading

Verify the file path in your controller method uses `Playbook::Engine.root.join()` for files in the playbook package.
