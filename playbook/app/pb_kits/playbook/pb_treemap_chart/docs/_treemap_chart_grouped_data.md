Data can be grouped into distinct segments by specifying the relationship in the `chartData`. For a point to be a parent, it needs an `id` of type `string` included in its object. Any other data points may then reference that `id` as its `parent` value to establish the tree structure.

Parents can also be passed a custom color to be applied to all of its child points.
