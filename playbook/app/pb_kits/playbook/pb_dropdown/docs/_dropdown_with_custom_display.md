Optionally utilize `customDisplay` on the `Dropdown.Trigger` subcomponent to customize its content after an option is selected. The component passed to customDisplay will be rendered to the left of the default text-based display. In this example the Avatar kit is being used.

The `placeholder` prop can also be used to customize the placeholder text for the default `Dropdown.Trigger`. 

The `onSelect` prop returns the selected option as an object to be utilized by the dev. In this example we are using the `onSelect` to set a state with the selected option and using it to customize the `customDisplay`.