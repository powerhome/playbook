# Table Card Variant - Implementation Summary

## Overview
Added a new `variant="card"` prop to the Table component that automatically wraps tables in a Card component with proper Flex layout and optional SectionSeparator for Filter integration.

## Changes Made

### 1. Table Component (`_table.tsx`)
- Added `variant` prop accepting `"default"` or `"card"`
- Added `cardProps` prop for customizing the Card wrapper
- Imported Card, Flex, and SectionSeparator components
- Created `renderCardVariant()` function that:
  - Wraps table in Card with configurable margins and padding
  - Detects Filter component in children
  - Adds SectionSeparator between Filter and Table
  - Uses Flex container for proper layout

### 2. New Props

#### `variant`
- Type: `"default" | "card"`
- Default: `"default"`
- When set to `"card"`, wraps the table in a Card component

#### `cardProps`
- Type: `{ marginX?: AllSizes | { [key: string]: string }, padding?: AllSizes }`
- Allows customization of the Card wrapper
- Default values:
  ```typescript
  {
    marginX: {
      xs: "sm",
      sm: "sm",
      md: "xl",
      lg: "xl",
      xl: "xl",
      default: "xl",
    },
    padding: "none"
  }
  ```

## Usage Examples

### Basic Card Variant
```jsx
<Table 
  variant="card"
  container={false}
  cardProps={{
    marginX: "xl",
    padding: "none"
  }}
>
  <Table.Head>
    {/* ... */}
  </Table.Head>
  <Table.Body>
    {/* ... */}
  </Table.Body>
</Table>
```

### Card Variant with Filter
```jsx
<Table 
  variant="card"
  container={false}
  cardProps={{
    marginX: {
      xs: "sm",
      md: "xl"
    }
  }}
>
  <>
    <Filter {...filterProps}>
      {/* filter inputs */}
    </Filter>
    <Table.Head>
      {/* ... */}
    </Table.Head>
    <Table.Body>
      {/* ... */}
    </Table.Body>
  </>
</Table>
```

## Benefits
1. **Reduced Boilerplate**: No need to manually compose Card, Flex, and SectionSeparator
2. **Consistency**: Ensures the same pattern is used across Nitro applications
3. **Flexibility**: cardProps allows customization when needed
4. **Automatic Detection**: Detects Filter component and adds separator automatically
5. **Backward Compatible**: Default variant maintains existing behavior

## Migration
Existing tables are not affected. To migrate the common Card + Filter + Table pattern:

**Before:**
```jsx
<Card marginX={{ xs: "sm", md: "xl" }} padding="none">
  <Flex align="stretch" flexDirection="column" gap="none">
    <Filter {...props} />
    <SectionSeparator />
    <Table container={false}>
      {/* ... */}
    </Table>
  </Flex>
</Card>
```

**After:**
```jsx
<Table 
  variant="card" 
  container={false}
  cardProps={{ marginX: { xs: "sm", md: "xl" } }}
>
  <>
    <Filter {...props} />
    <Table.Head>
      {/* ... */}
    </Table.Head>
    <Table.Body>
      {/* ... */}
    </Table.Body>
  </>
</Table>
```
