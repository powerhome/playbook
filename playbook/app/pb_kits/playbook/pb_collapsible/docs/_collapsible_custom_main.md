A custom Main section can also be used in place of the provided Collapsible.Main. Tjis gives devs full control over that subcomponent. For example, here we are using global props to make that custom Main 'sticky' on scroll.

If a custom component is used in place of the default, devs must handle collapsible toggling themselves. 

For the React, use the useCollapsible hook to manage toggling.

For Rails, add `data: {"collapsible-main": "true"}` to your custom Main for toggling to work.