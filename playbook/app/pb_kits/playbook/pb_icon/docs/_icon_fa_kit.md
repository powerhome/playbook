Our Icon kit allows integration with [FontAwesome's custom kit](https://fontawesome.com/v6/docs/web/setup/use-kit#contentHeader) functionality out-of-the-box. 

All you need to do is 3 things:
1) Import your custom-icons.js file as outlined in the FontAwesome docs. See [this sample `custom-icons.js`](https://github.com/powerhome/playbook/blob/master/playbook-website/app/javascript/scripts/custom-icons.js) for the shape of that file (not loaded into this example).
2) Use our fontStyle prop called "fak" so that our Icon component knows you are using a "fa-kit" icon. 
3) Pass in your FaKit name as a string to our icon prop (This is the name that you designated when you uploaded the icon on their site).

Note: The Playbook website does not load Font Awesome, so the preview below will not render a kit icon. In your app, use the script from your FA Kit and load Font Awesome as documented in our icon integration guides.
