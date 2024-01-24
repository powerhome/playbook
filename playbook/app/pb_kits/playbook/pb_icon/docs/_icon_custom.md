# Tips for Custom Icons

### React

- Providing a valid React `<SVG>` element to the `icon` prop results in an `<SVG>` node within the working view.
- Sending the absolute path to your SVG (e.g. `/my/path/to/icon.svg`) results in an `img` node with the `src` attribute set to the provided path:

  ```html
  <img src="host.com/my/path/to/icon.svg" />
  ```

### Rails

Sending the absolute path to the `icon` prop results in an `<SVG>` tag within the working view.
