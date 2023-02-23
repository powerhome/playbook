This kit provides a wrapping class to place around the MapLibre library. Complete docs for using the library can be found [here](https://maplibre.org/maplibre-gl-js-docs/api/).

Basic setup to start using MapLibre:
- Install the npm package using `yarn add maplibre-gl`
- import the maplibre-gl CSS using `import "maplibre-gl/dist/maplibre-gl.css"` OR include a link to the CSS file as a CDN in your stylesheet using the following syntax: `@import url("https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css");`
 OR include it as a link in the <head> tag `<link href='https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css' rel='stylesheet' />`
- To use Maplibre, you must also set a height on the containing div.
- You can now use MapLibre within the Map Kit as shown in this example.

__Notes__ : 
- The MapLibre Marker allows us to pass it a HEX value as a color prop but for Playbook styling we recommend importing our `MapTheme` file and passing `mapTheme.marker` to the Marker color prop.
- To enable custom buttons, set `zoomBtns` and `flyTo` to true and pass in `zoomInClick`, `zoomOutClick` and `flyToClick` as shown in this doc example. 
- `scrollZoom` has been disabled in these doc examples for page usability