You can build your own logic to control whether to show or not the tooltip. 

In this example, we're verifying if one of the tooltip triggers has truncated text by comparing its `scrollWidth` to its `clientWidth`. If they're equal, the trigger text is being displayed in full length and the tooltip shouldn't be displayed.

Each element has a `dataset` with the `pbTooltipShowTooltip` property set to true by default. To update it, access the `pbTooltipShowTooltip` in the dataset of your tooltip element: `yourTooltip.dataset.pbTooltipShowTooltip = 'false'`
