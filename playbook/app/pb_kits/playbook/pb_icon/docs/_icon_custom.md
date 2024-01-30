# Tips for Custom Icons

When using custom icons it is important to introduce a "clean" SVG. In order to ensure these custom icons perform as intended within your kit(s), ensure these things have been modified from the original SVG markup:

Attributes must be React compatible e.g. <code>xmlns:xlink</code> should be <code>xmlnsXlink</code> and so on. <strong>There should be no hyphenated attributes and no semi-colons!.</strong>

Fill colors with regards to <code>g</code> or <code>path</code> nodes, e.g. <code>fill="black"</code>, should be replaced with <code>currentColor</code> ala <code>fill="currentColor"</code>. Your mileage may vary depending on the complexity of your SVG.

Pay attention to your custom icon's dimensions and `viewBox` attribute. It is best to use a `viewBox="0 0 512 512"` starting point **when designing instead of trying to retrofit the viewbox afterwards**!

You must source _your own SVG into component/view_ you are working on. This can easily be done in programmatic and maintainable ways.

### React

- Providing a valid React `<SVG>` element to the `icon` prop results in an `<SVG>` node within the working view.
- Sending the absolute path to your SVG (e.g. `/my/path/to/icon.svg`) results in an `img` node with the `src` attribute set to the provided path:

  ```html
  <img src="host.com/my/path/to/icon.svg" />
  ```

### Rails

Sending the absolute path to the `icon` prop results in an `<SVG>` tag within the working view.
