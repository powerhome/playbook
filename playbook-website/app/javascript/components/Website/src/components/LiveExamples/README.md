# LiveExamples

This folder contains components for rendering live, interactive code examples in the Playbook documentation site.

## Overview

- **LiveExampleReact.tsx** - Renders React code examples using [react-live](https://github.com/FormidableLabs/react-live). Strips imports, injects Playbook components and third-party libraries into scope, and renders the component live.
- **LiveExampleRails.tsx** - Renders pre-rendered Rails/ERB examples as static HTML.

## ThirdPartyLoaders

The `ThirdPartyLoaders/` folder contains dynamic loaders for third-party libraries used in doc examples. Since `react-live` executes code in a sandboxed scope, external imports don't work directly. Instead, we detect which libraries an example needs and dynamically load them into the scope.

### When is a ThirdPartyLoader needed?

A loader is required when a doc example imports from a package that is **not** part of Playbook UI. For example:

```jsx
// This example needs loaders for maplibre-gl and @mapbox/mapbox-gl-draw
import maplibregl from 'maplibre-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
```

Without a loader, you'll see a `ReferenceError: <LibraryName> is not defined` in the new docs view.

### Current Loaders

| Loader | Detects | Libraries Loaded |
|--------|---------|------------------|
| `highchartsLoader` | `highcharts`, `highcharts/*`, `highcharts-react-official` | Highcharts, HighchartsReact, and modules like highcharts-more, solid-gauge |
| `mapboxDrawLoader` | `@mapbox/mapbox-gl-draw` | MapboxDraw + CSS |
| `maplibreLoader` | `maplibre-gl` | maplibregl + CSS |
| `playbookChartsLoader` | `_pb_bar_graph`, `_pb_circle_chart`, `_pb_gauge_chart`, `_pb_line_graph` | PbBarGraph, PbCircleChart, PbGaugeChart, PbLineGraph |
| `tiptapLoader` | `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-*` | useEditor, EditorContent, StarterKit, Link, etc. |

### How to Add a New Loader

1. **Create a new file** in `ThirdPartyLoaders/` (e.g., `myLibraryLoader.tsx`):

```tsx
import { ThirdPartyLoader, ThirdPartyScope } from "./utilities"

export const myLibraryLoader: ThirdPartyLoader = {
  id: "my-library",
  
  // Detect if this loader is needed based on import sources
  detect: (_raw, _defaults, sources) => 
    sources.includes("my-library"),
  
  // Dynamically load the library and return scope variables
  load: async (_raw, defaults) => {
    const mod: any = await import("my-library")
    const MyLibrary = mod.default || mod
    
    // Support import aliases (e.g., import ML from "my-library")
    const alias = defaults.find((d) => d.source === "my-library")?.local
    const scope: ThirdPartyScope = { MyLibrary }
    if (alias && alias !== "MyLibrary") scope[alias] = MyLibrary
    
    return scope
  },
}
```

2. **Export from index.ts**:

```ts
export { myLibraryLoader } from "./myLibraryLoader"
```

3. **Register in LiveExampleReact.tsx**:

```tsx
import { ..., myLibraryLoader, ... } from "./ThirdPartyLoaders"

const LIB_LOADERS: ThirdPartyLoader[] = [
  highchartsLoader,
  mapboxDrawLoader,
  maplibreLoader,
  myLibraryLoader,  // Add here
  tiptapLoader,
]
```

### Loader API

Each loader implements the `ThirdPartyLoader` interface:

```ts
type ThirdPartyLoader = {
  id: string
  detect: (raw: string, defaults: DefaultImport[], sources: string[]) => boolean
  load: (raw: string, defaults: DefaultImport[], sources: string[]) => Promise<ThirdPartyScope>
}
```

- **id** - Unique identifier for the loader
- **detect(raw, defaults, sources)** - Returns `true` if this loader should run
  - `raw` - The full source code string
  - `defaults` - Array of default imports: `[{ local: "MapboxDraw", source: "@mapbox/mapbox-gl-draw" }]`
  - `sources` - Array of import sources: `["react", "maplibre-gl", "@mapbox/mapbox-gl-draw"]`
- **load(raw, defaults, sources)** - Dynamically imports libraries and returns an object of variables to inject into scope

### Utilities

`utilities.ts` provides helper functions:

- `parseNamedImportsFor(raw, moduleName)` - Extract named imports for a specific module
- `parseDefaultImports(raw)` - Extract all default imports from source code

### Tips

- **CSS Loading**: If your library needs CSS, inject a `<link>` tag in the loader (see `maplibreLoader` or `mapboxDrawLoader` for examples)
- **Alias Support**: Always check `defaults` for import aliases so `import ML from "my-lib"` works as well as `import MyLib from "my-lib"`
- **Named Imports**: Use `parseNamedImportsFor()` when the library exports multiple named values
- **Module Initialization**: Some libraries (like Highcharts modules) need initialization - handle this in the loader
