# Deprecation Warning System for React Kits

## Overview

This system provides runtime console warnings when deprecated Playbook kits (REACT) are used in development mode. It helps developers identify deprecated kit usage in Nitro, Tempo, Runway, and other apps without impacting production builds.

## How It Works

### Key Features

✅ **Once per page load**: Each deprecated kit logs exactly one warning per page load, preventing spam on re-renders  
✅ **Dev mode only**: No warnings in production or staging builds
✅ **Platform-specific**: Can warn only for React  
✅ **Customizable messages**: Default or custom deprecation messages

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
