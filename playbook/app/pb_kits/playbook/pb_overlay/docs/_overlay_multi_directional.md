Optionally, you can pass multi-directional options (`left-right` or `top-bottom`) to the `position` key, which creates multiple overlays. 

Your `color` is still applied as the starting edge to both overlays, and each mask will fade to transparent moving toward its opposite edge, ending at the `size` percentage you set. 

NOTE: Multi-directional overlays share the available container space, so passing a size greater than 50% to a multi-directional overlay will cause your masks to overlap at the midline of your container. As a best practice, we do not recommend exceeding a size of 25% when using multi-directional overlays.
