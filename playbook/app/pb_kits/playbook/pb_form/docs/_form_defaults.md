Toggle pills to add or remove inputs from the form. Submit to see values for the selected fields on the right. The code snippet updates to match the current selection.

### Naming kit fields under a scope

`text_field`, `select`, `check_box`, and similar Rails-backed helpers nest under the form `scope` automatically (`defaults[full_name]` when `scope: :defaults`).

Playbook-only helpers — `typeahead`, `phone_number_field`, and `dropdown_field` — do not. Pass an explicit string that matches the form scope so params stay nested:

```erb
<%= pb_form_with(scope: :defaults, url: "", method: :get) do |form| %>
  <%= form.typeahead "defaults[color_search]", props: { ... } %>
  <%= form.phone_number_field "defaults[phone]", props: { ... } %>
  <%= form.dropdown_field "defaults[countries]", props: { ... } %>
<% end %>
```

Submitted params then land under `params[:defaults]`, matching the code you copy.
