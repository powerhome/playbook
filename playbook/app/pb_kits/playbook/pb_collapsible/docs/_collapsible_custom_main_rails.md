A custom Main section can also be used in place of the provided `collapsible/collapsible_main`. This gives devs full control over that subcomponent. For example, here we are using global props to make that custom Main 'sticky' on scroll.

If a custom component is used in place of the default, devs must add `data: {"collapsible-main": "true"}` to the custom Main for toggling of the collapsible to work correctly.

The default Collapsible icon can also be used as part of the custom Main as shown with the optional  `collapsible/collapsible_icon`. This optional subcomponent accepts all icon related props `color`, `icon` and `size`.