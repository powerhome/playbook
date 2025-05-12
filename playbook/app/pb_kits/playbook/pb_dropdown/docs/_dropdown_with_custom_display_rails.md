Optionally utilize `custom_display` on the `dropdown/dropdown_trigger` subcomponent to customize its content after an option is selected. Pass in any combination of kits to create a custom display. When a user clicks on an option, the kits passed into `custom_display` will display as the selected option.

The `placeholder` prop can also be used to customize the placeholder text for the default `dropdown/dropdown_trigger`. 

The dropdown follows the typical rails pattern of utilizing hidden inputs for form submission. The hidden input value is the selected options' id.