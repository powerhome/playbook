This kit provides a wrapping class to place around the MapLibre library. Complete docs for using the library can be found [here](https://maplibre.org/maplibre-gl-js-docs/api/).

Basic setup to start using MapLibre:
- Install the npm package using `yarn add maplibre-gl`
- Include a link to the CSS file as a CDN in your stylesheet using the following syntax:
`@import url("https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css");`
 or include it as a link in the <head> tag `<link href='https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css' rel='stylesheet' />`
- To use Maplibre, you must also set a height on the containing div.
- You can now use MapLibre within the Map Kit as shown in this example.
