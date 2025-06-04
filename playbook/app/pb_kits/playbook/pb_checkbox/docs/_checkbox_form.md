The way to access hidden inputs for form submission depends on which version of the kit being used within the form context.

If using the Rails Checkbox version of the kit, set `hidden_input: true`. Inspect Checkbox #1 in the example above to see the hidden input in the DOM. 

If using the Form Builder version of the kit (reference the [Form kit page](https://playbook.powerapp.cloud/kits/form) for more on these), the hidden input will appear if the input has a set `unchecked_value`. Inspect Checkbox #2 in the example above (and the two checkbox examples on the Form kit page) to see the hidden input in the DOM. See the [Rails check_box FormHelper docs](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-check_box) for more.