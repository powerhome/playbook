Overlays require a `color`, which sets the "start" (opaque) color of a gradient mask. Because this overlay is intended to reveal underlying content, the "end" color is fixed to transparent.

The optional `layout` prop accepts a `position` and a `size` as a key:value pair object.

The `position` key accepts `top`, `bottom`, `y` (for both top and bottom) `right`, `left`, or `x` (for both left and right), which sets the side(s) where the `color` overlay starts. The direction of the overlay is always toward the opposite side of the position. For example, the default position of `bottom` starts the overlay on the bottom edge of your container and extends it toward the opposite side: the top.

The `size` value accepts our [spacing tokens](https://playbook.powerapp.cloud/visual_guidelines/spacing) or a percentage value as a string, and literally translates to how much of the container is covered by the overlay. By default, `size` is set to `full` (100%) so that your overlay covers the entire container with a smooth fade from `color` at its starting edge, fading to transparent and ending at the containers opposite edge.