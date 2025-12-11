# Overview

This system provides runtime console warnings when deprecated Playbook kits are used in development mode. It helps developers identify deprecated kit usage in Nitro, Tempo, Runway, and other apps without impacting production builds.

# Deprecation Warning System for React Kits
## Key Features

- ✅ **Once per page load**: Each deprecated kit logs exactly one warning per page load, preventing spam on re-renders
- ✅ **Dev mode only**: No warnings in production or staging builds 
- ✅ **Platform-specific**: Can be set for only React version (or React rendered Rails version) of kit
- ✅ **Customizable messages**: Default or custom deprecation messages

## Usage

### Step 1: Import the utility

In your kit's main React component file (e.g., `_bar_graph.tsx`):

```tsx
import { deprecatedKitWarning } from "../utilities/deprecated";
```

### Step 2: Add the warning in a useEffect hook

Add a `useEffect` hook that calls the warning once when the component mounts:

```tsx
const YourKit = (props: YourKitProps): React.ReactElement => {

  useEffect(() => {
    deprecatedKitWarning('YourKitName', 'Optional custom message');
  }, []); // Empty dependency array ensures it runs once

  // rest of component
};
```


## API Reference

### `deprecatedKitWarning(kitName, message?)`

**Parameters:**
- `kitName` (string, required): Name of the deprecated kit (e.g., 'BarGraph')
- `message` (string, optional): Custom deprecation message to add to end of base message. If omitted, uses default.

**Default message format:**
```
PLAYBOOK DEPRECATION WARNING
  ----------------------------
  The "${kitName}" kit is deprecated and will be removed in a future version. Please migrate to the recommended alternative`;
```
**Custom message format if used:**
```
PLAYBOOK DEPRECATION WARNING
  ----------------------------
  The "${kitName}" kit is deprecated and will be removed in a future version. "${message}"`;
```

**Behavior:**
- Only logs in development mode
- Tracks warned kits in a Set to prevent duplicate warnings
- Silent in production builds


## Best Practices

### 1. Place the warning early in the component lifecycle
```tsx
useEffect(() => {
  deprecatedKitWarning('YourKit');
}, []); // Run once on mount
```

### 2. Provide helpful migration messages if needed
```tsx
deprecatedKitWarning(
  'BarGraph', 
  'Please use "PbBarGraph" instead.'
);
```

### 3. Check menu.yml before applying
Always verify the kit's status in `playbook-website/config/menu.yml` to ensure it's actually deprecated for React.

### 4. Don't over-warn
The utility handles deduplication, but keep it to one `deprecatedKitWarning` call per kit component.

# Deprecation Warning System for Rails Kits
## Key Features

- ✅ **Once per page load**: Each deprecated kit logs exactly one warning per page load
- ✅ **Dev mode only**: No warnings in production or test environments
- ✅ **Platform-specific**: Can be set only for Rails version of kit 
- ✅ **Customizable messages**: Default or custom deprecation messages
- ✅ **Browser console**: Injects JavaScript that runs `console.warn()` in the browser

## Usage

### Add the helper to your kit's HTML template

In your kit's `.html.erb` file (e.g., `legend.html.erb`), add the helper at the top:

```erb
<%== deprecated_kit_warning('KitName') %>
<!-- rest of your template -->
```

**Important:** Use `<%==` (double equals) NOT `<%=` to prevent HTML escaping of the script tag.

### With Custom Message

```erb
<%== deprecated_kit_warning('Legend', 'Use NewLegendKit instead.') %>
<%= pb_content_tag do %>
  <!-- kit content -->
<% end %>
```

### Example Implementation

```erb
<%== deprecated_kit_warning('Legend') %>
<%= pb_content_tag do %>
  <%= pb_rails("body", props: {color: object.body_color}) do %>
    <!-- kit content -->
  <% end %>
<% end %>
```

## When to Apply Rails Deprecation Warnings

Check `playbook-website/config/menu.yml` for kit status:

### Rails-Only Kits (not React-rendered)
```yaml
- name: legend
  status: deprecated
  react_rendered: false  # Apply warning to Rails template
```

### Platform-Specific Deprecation
```yaml
- name: rich_text_editor
  status: stable
  platforms_status: { rails: deprecated }  # Apply warning to Rails only
```

### React-Rendered Kits (DON'T add Rails warning)
```yaml
- name: bar_graph
  status: deprecated
  react_rendered: true  # DON'T add Rails warning - use React warning instead
```

**Apply warnings to Rails templates when:**
- `status: deprecated` AND `react_rendered: false`, OR
- `platforms_status: { rails: deprecated }`

**Do NOT apply warnings when:**
- `react_rendered: true` (the React component handles the warning)
- `status: stable` or `status: beta`
- `platforms_status: { react: deprecated }` (React-only deprecation)

## API Reference

### `deprecated_kit_warning(kit_name, message = nil)`

**Parameters:**
- `kit_name` (String, required): Name of the deprecated kit (e.g., 'Legend', 'BarGraph')
- `message` (String, optional): Custom message to append to the base warning. If omitted, uses default.

**Default message format:**
```
PLAYBOOK DEPRECATION WARNING
  ----------------------------
  The "{kit_name}" kit is deprecated and will be removed in a future version. Please migrate to the recommended alternative
```

**With custom message:**
```
PLAYBOOK DEPRECATION WARNING
  ----------------------------
  The "{kit_name}" kit is deprecated and will be removed in a future version. {your custom message}
```

**Returns:**
- Development: HTML-safe `<script>` tag with `console.warn()`
- Production/Test: Empty string (`""`)

**Behavior:**
- Only runs in development mode (`Rails.env.development?`)
- Returns empty string in test and production
- Uses client-side JavaScript Set to prevent duplicate warnings per page load
- Script tag is always rendered (no server-side caching issues)

## How It's Implemented

The helper is defined in `/playbook/lib/playbook/pb_kit_helper.rb` and is available to all Rails kit templates.

### What Gets Rendered

In development, the helper renders:

```html
<script type="text/javascript">
(function() {
  if (!window.__PB_WARNED_KITS__) window.__PB_WARNED_KITS__ = new Set();
  if (!window.__PB_WARNED_KITS__.has('Legend')) {
    window.__PB_WARNED_KITS__.add('Legend');
    console.warn('PLAYBOOK DEPRECATION WARNING\n  ----------------------------\n  The "Legend" kit is deprecated...');
  }
})();
</script>
```

In production/test: Nothing (empty string)

## Best Practices

### 1. Place at the top of the template
```erb
<%== deprecated_kit_warning('YourKit') %>
<!-- Makes it easy to find and consistent across kits -->
```

### 2. Provide helpful migration messages
```erb
<%== deprecated_kit_warning('Legend', 'Use PbLegend instead for improved accessibility.') %>
```

### 3. Check menu.yml before applying
Always verify the kit's deprecation status and whether it's React-rendered.

### 4. Use <%== not <%=
The double equals prevents HTML escaping so the script tag executes properly.

### 5. Don't add to React-rendered kits
If `react_rendered: true`, the React component should have the warning instead.


