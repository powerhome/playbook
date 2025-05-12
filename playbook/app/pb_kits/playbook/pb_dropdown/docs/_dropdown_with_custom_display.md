Optionally utilize `customDisplay` on the `Dropdown.Trigger` subcomponent to customize its content after an option is selected. Pass in any combination of kits to create a custom display. When a user clicks on an option, the kits passed into `customDisplay` will display as the selected option.

The `placeholder` prop can also be used to customize the placeholder text for the default `Dropdown.Trigger`. 

The `onSelect` prop returns the selected option as an object to be utilized by the dev. In this example we are using the `onSelect` to set a state with the selected option and using it to customize the `customDisplay`.