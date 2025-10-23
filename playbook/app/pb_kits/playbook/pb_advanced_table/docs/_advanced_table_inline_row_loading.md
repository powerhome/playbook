### inlineRowLoading
As a default, the kit assumes that the initial dataset is complete, and it renders all expansion buttons/controls based on that data; if no children are present, no expansion controls are rendered. If, however, you want to change the initial dataset to omit some or all of its children (to improve load times of a complex dataset, perhaps), and you implement a querying logic that loads children only when its parent is expanded, then you must use the `inlineRowLoading` prop to ensure your expansion controls are rendered even though your child data is not yet loaded. You must also pass an empty `children` array to any node that will have children to ensure its parent maintains its ability to expand. If this prop is called AND your data contains empty `children` arrays, the kit will render expansion controls on any row with empty children, and then add an inline loading state within the expanded subrow until those child row(s) are returned to the page [by your query logic].

In the first Advanced Table in this code example, 2021 has an empty children array. Toggle it open to see the inline loading state. Once the correct data loads, this state will be replaced with the correct data rows. 

This prop is set to `false` by default. 


### persistToggleExpansion
The `persistToggleExpansionButton` is a boolean prop that renders the toggle-all icon in the top left header cell for complex datasets with empty `children` arrays and advanced querying logic explained in the preceeding doc example. Your logic may require an additional query helper file to update data specifically from requerying via toggle all buttons.

In the second Advanced Table in this code example, all 3 rows have empty children arrays. The toggle all button would not render (prior to an initial row expansion) without `persistToggleExpansionButton` in place. 

This prop is set to false by default and should only be used in conjunction with `inlineRowLoading`.