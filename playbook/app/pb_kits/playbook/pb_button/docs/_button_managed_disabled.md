If needing to toggle the disabled state of the Button dynmically, you can now do so in rails using the `pb-button-managed` data attribute. 

If your button has `data:{ pb-button-managed: true }`  on it, you can then toggle state via attributes: for buttons set/remove disabled, for links set/remove aria-disabled="true". This will handle disabling the button, preventing clicks as well as all style changes so you don't have to.  

Click to enable or disable the buttons above and view the code snippet below for details!