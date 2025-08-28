##### Prop

`align` **Type**: String | **Values**: left | center | right (defaults to center)
`verticalAlign` **Type**: String | **Values**: top | middle | bottom (defaults to bottom)
`layout` **Type**: String | **Values**: horizontal | vertical | proximate (defaults to horizontal)
`x` **Type**: Number (defaults to 0)
`y` **Type**: Number (defaults to 0)

- 

- `layout` determines the position of the legend items
`layout: proximate` will place the legend items as close as possible to the graphs they're representing. It will also determine whether to place the legend above/below or on the side of the plot area, if the legend is in a corner.

- `x` offsets the legend relative to its horizontal alignmnet. Negative x moves it to the left, positive x moves it to the right


- `y` offsets the legend relative to its vertical alignmnet. Negative y moves it up, positive y moves it down.