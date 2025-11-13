Each step can also be configured to display a tooltip as shown here. To achieve this, for the relevant progress_step_item, use the following props:

- `tooltip`: The text you want displayed within the tooltip
- `tooltip_position`: The placement of the tooltip. 
- `step_direction`: This should follow the orientation of the kit. If no tooltip_position is provided, if `step_direction` is vertical tooltip will be rendered to the right, if `step_direction` is horizontal, tooltip will be rendered on top. 
- `classname`: a unique classname must be provided for each step to link it correctly to its tooltip. 