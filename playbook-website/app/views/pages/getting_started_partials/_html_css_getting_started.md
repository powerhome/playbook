#### 1 Add the Playbook NPM Package

```sh
yarn add "playbook-ui@stable"
```

This will allow you to choose what version you want.

```sh
yarn install
```
#### 2 Import the CSS

```sass
@import "playbook-ui/dis/playbook";
@import "playbook-ui/dist/reset";
```
#### 3 Optionally you can import the Javascript if you want some of the interactivity
This will add all the Javascript to use the popovers & graphs for example.

```js
import 'playbook-ui/dist/playbook-rails.js';
```

#### 4 Navigate to the Rails Kits and copy the raw HTML from the examples

![Copy the raw HTML from the examples](/images/getting_started/copy_html.png) 

#### 5 How to include CSS and Javascript Assets

To include CSS and JavaScript files in an HTML document, follow these steps:
1. Create a CSS file with the extension ".css" and a JavaScript file with the extension ".js". Place them in a directory on your server, preferably in a subdirectory named "css" or "js" respectively.
2. Open the HTML file you want to add the assets to in a text editor.
3. To include a CSS file in the HTML document, add the following code to the "head" section of the HTML document:

```html
<link rel="stylesheet" type="text/css" href="path/to/your/css/file.css">
```

Replace "path/to/your/css/file.css" with the actual path to your CSS file.
4. To include a JavaScript file in the HTML document, add the following code to the "head" section of the HTML document:

```html
<script src="path/to/your/js/file.js"></script>
```

Replace "path/to/your/js/file.js" with the actual path to your JavaScript file.
5. Save the HTML file and upload all the files (HTML, CSS, and JavaScript) to your server.
6. Test your HTML document in a web browser to ensure that the assets are being loaded correctly.

