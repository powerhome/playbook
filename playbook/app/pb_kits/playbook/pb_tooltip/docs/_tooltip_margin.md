You should set `margin` in the `tooltip` component itself. If you add this prop to the child, it will cause the tooltip to be pulled away from the trigger.

It is not recommended to set `padding` in the `tooltip` nor its child, doing so will cause it to be pulled away from its trigger element.