### Experimental: Not currently available in the Rails version!

When using custom icons it is important to introduce a "clean" SVG. In order to ensure these custom icons perform as intended within your kit(s), ensure these things have been modified from the original SVG markup:

Attributes must be React compatible e.g. <code>xmlns:xlink</code> should be <code>xmlnsXlink</code> and so on. <strong>There should be no hyphenated attributes and no semi-colons!.</strong>

Fill colors with regards to <code>g</code> or <code>path</code> nodes, e.g. <code>fill="black"</code>, should be replaced with   <code>currentColor</code> ala <code>fill="currentColor"</code>. Your mileage may vary depending on the complexity of your SVG.

Pay attention to your custom icon's dimensions and `viewBox` attribute. It is best to use a `viewBox="0 0 512 512"` starting point __when designing instead of trying to retrofit the viewbox afterwards__!

You must source *your own SVG into the React component/view* you are working in. This can easily be done in a programmatic and maintainable way. So long as you have a valid React `<SVG>` node, you can send it as the `customIcon` prop and the kit will take care of the rest.
