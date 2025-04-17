The optional `layout` prop accepts the `position` and `size` of the overlay as a key:value pair.

The `position` key accepts `bottom` (default), `top`, `y` (for both top and bottom) `right`, `left`, or `x` (for both left and right), which sets the side(s) where the `color` overlay starts. The direction of the overlay is always toward the opposite side of the position. For example, the default position of `bottom` starts the overlay on the bottom edge of your container and extends it toward the opposite side: the top.

The `size` value is `full` (100%) by default, but accepts our [spacing tokens](https://playbook.powerapp.cloud/visual_guidelines/spacing) or a percentage value as a string, and literally translates to how much of the container is covered by the overlay(s).