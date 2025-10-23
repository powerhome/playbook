The `showToggleWithInlineRowLoading` is a boolean prop that renders the toggle-all icon in the top left header cell for complex datasets with enoty `children` arrays and advanced querying logic explained in the preceeding doc example. Your logic may require an additional query helper file to update data specifically from requerying via toggle all buttons.

In this code example, all 3 rows have empty children arrays. The toggle all button would not render (prior to an initial row expansion) without `showToggleWithInlineRowLoading` in place. 

This prop is set to false by default and should only be used in conjunction with `inlineRowLoading`.