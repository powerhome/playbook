Optionally utilize `custom_display` on the `dropdown/dropdown_trigger` subcomponent to customize its content after an option is selected. The component passed to custom_display will be rendered to the left of the default text-based display. In this example the Avatar kit is being used.

The `placeholder` prop can also be used to customize the placeholder text for the default `dropdown/dropdown_trigger`. 

The dropdown follows the typical rails pattern of utilizing hidden inputs for form submission. The hidden input value is the selected options' id.