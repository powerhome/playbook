The `customDisplay` prop can be used to customize the display of the selected item by allowing devs to pass in a component that will be rendered to the left of the default text-based display. In this example the Avatar kit is being used.

The `placeholder` prop can also be used to customize the placeholder text for the default Trigger. 

The `onSelect` prop is a function that gives the dev one argument: the selected option. In this example we are using the    `onSelect` to set a state with the selected option and using it to customize the `customDisplay`.