#### Rails: Providing the `load_options` Promise

**Additional required props: ** `async: true`, `pills: true`

The prop `load_options`, when used in conjunction with `async: true` and `pills: true`, points to a JavaScript function located within the global window namespace. This function should return a `Promise` which resolves with the list of formatted options as described in prior examples above. This function is identical to the function provided to the React version of this kit. See the code example for more details.

#### React: `loadOptions`

**Additional required props: ** `async: true`

[As outlined in the react-select Async docs](https://react-select.com/async), `loadOptions` expects to return a Promise that resolves resolves with the list of formatted options as described in prior examples above. See the code example for more details.