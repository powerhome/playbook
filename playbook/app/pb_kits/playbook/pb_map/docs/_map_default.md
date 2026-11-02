This kit provides a wrapping class to place around the MapLibre library. Complete docs for using the library can be found [here](https://maplibre.org/maplibre-gl-js-docs/api/).

Basic setup to start using MapLibre:

- Install the npm package using `yarn add maplibre-gl@6.4.1`
- Import the CSS from the installed package in your JavaScript entry point: `import 'maplibre-gl/dist/maplibre-gl.css'`. Your application's bundler must support CSS imports.
- You can now use MapLibre within the Map Kit as shown in this example.

__Map provider__:

The Map kit provides the wrapper and controls; your application creates the MapLibre instance and chooses its map provider. The examples use `mapTheme.mapConfig`, whose default `style` is CARTO's Positron style at `https://basemaps.cartocdn.com/gl/positron-gl-style/style.json`.

MapLibre downloads that style and its referenced tiles, glyphs, and sprites at runtime. Bundling MapLibre and its CSS does not bundle these resources. If the provider is unavailable or blocked by your application's Content Security Policy (CSP), the basemap can be blank or incomplete. Importing Playbook alone does not make these requests.

To use your own provider or a self-hosted style, override `style` after spreading the defaults:

```jsx
new maplibregl.Map({
  container: mapContainerRef.current,
  center: defaultPosition,
  ...mapTheme.mapConfig,
  style: '/maps/company-style.json',
})
```

The style can still reference external resources even when its JSON file is hosted locally. Configure your application's CSP to allow the selected provider's style, tile, glyph, and sprite requests, including any hosts referenced by the style or its source metadata. For the default, start with `https://basemaps.cartocdn.com` and verify the downstream hosts in your browser's Network panel. Provider availability, CSP configuration, and any fallback behavior are managed by your application.

__Notes__ : 
- To enable custom buttons, set `zoomBtns` and `flyTo` to true and pass in `zoomInClick`, `zoomOutClick` and `flyToClick` as shown in this doc example. 
- Use `mapTheme.marker` to set the Marker color. 
- To use Maplibre, you must also set a height and width to the containing div (.pb_map) and set position to 'relative'.
- `scrollZoom` has been disabled in these doc examples for page usability
