The `form` kit provides consumers with a convenient, consistently styled `<form>` wrapper. 

### Form Helpers

There are currently two form helper options for Rails: [`form_with`](https://apidock.com/rails/ActionView/Helpers/FormHelper/form_with) and [`simple_form`](https://github.com/heartcombo/simple_form). 

**Note:** It is suggested to use `form_with` for newer or more progressive Rails applications and `simple_form` for older legacy forms where simple_form is already implemented and a complete overhaul might not make sense.

This kit does make use of other kits such as text_input, select and typeahead to name a few. Doing so provides UI consistency within forms and makes adding a form to your page easier.

