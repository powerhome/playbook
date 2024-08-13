This kit kit provides a wrapping class to place around the MapLibre library. Complete docs for using the library can be found [here](https://maplibre.org/maplibre-gl-js-docs/api/).

Basic setup to start using MapLibre:
- Install the npm package using `yarn add maplibre-gl`
- To include the maplibre css, include a link to the CSS file as a CDN in your stylesheet using the following syntax: `@import url("https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css");`
 OR include it as a link in the <head> tag `<link href='https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css' rel='stylesheet' />`
- You can now use MapLibre within the Map Kit as shown in this example.

__Notes__ : 
- To enable custom buttons, set `zoomBtns` and `flyTo` to true and pass in `zoomInClick`, `zoomOutClick` and `flyToClick` as shown in this doc example. 
- Use `mapTheme.marker` to set the Marker color. 
- To use Maplibre, you must also set a height and width to the containing div (.pb_map) and set position to 'relative'.
- `scrollZoom` has been disabled in these doc examples for page usability
