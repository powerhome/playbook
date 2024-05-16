A custom Main section can also be used in place of the provided `Collapsible.Main`. This gives devs full control over that subcomponent. For example, here we are using global props to make that custom Main 'sticky' on scroll.

If a custom component is used in place of the default, devs must handle collapsible toggling themselves via the useCollapsible hook as seen in this example.