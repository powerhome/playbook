/** Curated behavior only. Method names are lookup keys; Ruby supplies structure. */
export const FORM_BUILDER = {
  class: 'Playbook::Forms::Builder',
  helper: 'pb_form_with',
  platforms: ['rails'],
  setup: '<%= pb_form_with model: @user do |f| %>\n  <%= f.text_field :email, props: { label: "Email", required: true, error: @user.errors[:email].to_sentence } %>\n<% end %>',
  formWith: '<%= form_with model: @user, builder: Playbook::Forms::Builder do |f| %>\n  <%= f.text_field :email, props: { label: "Email" } %>\n<% end %>',
  validation: 'pb_form_with defaults validate to false. validate: true sets data-pb-form-validation for Playbook client validation. Server/model validation remains the host application responsibility.',
  lifecycle: 'pb_form_with invokes formHelper when available. PbFormValidation is registered with PbKitRegistry; its MutationObserver handles dynamically added forms, including Turbo navigation. Load the Playbook Rails bundle in the host.',
  simpleForm: 'No Simple Form adapter is declared by this contract. These methods belong to Playbook::Forms::Builder.',
  sources: ['lib/playbook/pb_forms_helper.rb', 'lib/playbook/forms/builder.rb'],
};

const messageError = {
  automatic: false,
  prop: 'props.error',
  type: 'string',
  example: '@user.errors[:email].to_sentence',
  description: 'Pass the message explicitly. The builder does not read record.errors.',
};
const directBinding = {
  modelScopedName: false,
  modelValue: false,
  name: 'The name argument is passed directly to props.name. Supply user[country] explicitly for a nested parameter.',
};
const railsBinding = {
  modelScopedName: true,
  modelValue: true,
  name: 'The Rails helper derives the input name from the builder object name and attribute, including nested form scopes.',
};
const textHtmlOptions = {
  argument: '**options',
  description: 'Pass HTML attributes as builder keyword arguments, outside props. The Rails helper renders the input; props.input_options is not a general attribute pass-through in this builder path.',
  examples: { maxlength: 255, min: 0, step: '0.01', autocomplete: 'email', data: { controller: 'field' } },
  overrides: 'The builder sets placeholder from props (default empty), forwards props.required when true, and forwards explicit props.type, value, disabled, autocomplete, mask and validation. It derives props.input_options.id from the rendered input.',
};
const textValidation = {
  required: 'props.required: true sets required on the Rails-generated input. required: true as a builder HTML option also works.',
  indicator: 'props.required_indicator is a visual label indicator, not validation.',
  error: messageError,
  client: 'props.validation.pattern becomes pattern; props.validation.message becomes data-message. These do not replace props.error.',
};
const formExample = (expression) => `<%= pb_form_with model: @user do |f| %>\n  <%= ${expression} %>\n<% end %>`;
const directMethod = (name, extra = {}) => ({
  name,
  binding: directBinding,
  htmlOptions: { supported: false, description: 'This method accepts props only, not arbitrary HTML keyword arguments.' },
  block: { supported: false, description: 'This builder method does not forward a caller block to the kit.' },
  ...extra,
});

const textMethods = ['email_field', 'number_field', 'search_field', 'telephone_field', 'text_field', 'password_field', 'url_field', 'text_area'].map((name) => ({
  name,
  binding: { ...railsBinding, value: 'The Rails helper uses the model value unless overridden; explicit props.value is forwarded as the HTML value option. There is no builder defaultValue argument.' },
  submission: { submits: true, value: 'The current Rails-generated input or textarea value under the model-scoped name.' },
  htmlOptions: textHtmlOptions,
  validation: textValidation,
  block: { supported: true, description: 'Forwarded to the underlying Rails helper. The builder itself supplies the kit block containing the Rails-generated field; this is not a custom kit-content block.' },
  example: formExample(`f.${name} :${name === 'text_area' ? 'bio' : 'email'}, props: { label: true, required: true, error: @user.errors[:${name === 'text_area' ? 'bio' : 'email'}].to_sentence }`),
}));

const selectMethods = [
  ['select', 'f.select :country, [["Canada", "ca"]], {}, {}, props: { label: true, required: true, error: @user.errors[:country].to_sentence }'],
  ['collection_select', 'f.collection_select :country_id, @countries, :id, :name, {}, {}, props: { label: true, required: true, error: @user.errors[:country_id].to_sentence }'],
  ['time_zone_select_field', 'f.time_zone_select_field :time_zone, nil, {}, {}, props: { label: true, required: true, error: @user.errors[:time_zone].to_sentence }'],
].map(([name, example]) => ({
  name,
  binding: railsBinding,
  submission: { submits: true, value: 'Selected option value(s) from the Rails select helper.', multi: 'For multiple selection, set html_options.multiple. Rails controls array naming and auxiliary hidden inputs.' },
  htmlOptions: { argument: 'html_options', description: 'Pass input attributes in the positional html_options hash. props.input_options forwards only id, class and data. props.blank_selection sets options.prompt (default empty).' },
  validation: { required: 'props.required sets html_options.required.', indicator: 'props.required_indicator is visual only.', error: messageError, client: 'props.validation_message becomes data-message.' },
  block: { supported: name === 'select', description: name === 'select' ? 'Passed to Rails select to construct option tags.' : 'Caller blocks are not forwarded.' },
  example: formExample(example),
}));

export const FORM_METHODS = [
  ...textMethods,
  ...selectMethods,
  {
    name: 'check_box',
    binding: railsBinding,
    submission: { submits: true, value: 'checked_value and unchecked_value are extracted from keyword options and passed positionally to Rails check_box. Set both explicitly; this wrapper passes nil when omitted.', example: 'checked_value: "1", unchecked_value: "0"' },
    htmlOptions: { argument: '**options', description: 'Remaining keywords are passed as Rails check_box options.' },
    validation: { required: 'props.required sets the HTML required option.', indicator: 'props.required_indicator is visual only.', error: { ...messageError, type: 'boolean', example: '@user.errors[:terms].any?', description: 'The Checkbox error prop is a boolean styling flag. Render any error message separately.' } },
    block: { supported: false, description: 'The builder supplies the Rails checkbox as kit content; caller blocks are not forwarded.' },
    example: formExample('f.check_box :terms, checked_value: "1", unchecked_value: "0", props: { label: true, required: true, error: @user.errors[:terms].any? }'),
  },
  directMethod('dropdown_field', {
    binding: { ...directBinding, value: 'Supply props.default_value explicitly; the builder does not read the model.' },
    submission: { submits: true, value: 'Selected option id in a CSS-hidden input (not input type=hidden).', multi: 'Comma-joining is only the default-value encoding (data-default-value and a temporary baseInput.value). After kit JS runs, syncHiddenInputs emits one input type="hidden" per selected id, all named name[] (the CSS-hidden input already has [] appended), then clears that original CSS-hidden input. Rails receives separate array entries such as ["ca","us"], not "ca,us".', dynamicOptions: 'props.options_by_context with props.context_selector replaces the rendered options when the referenced element fires change, and props.clear_on_context_change (default true) then clears the selection, so a context change can submit an empty value. A pb:dropdown:updateOptions event, or an event named in props.options_event_type, replaces options the same way; clearSelection: false keeps only selections whose id exists in the replacement options.' },
    validation: { required: 'props.required sets required on the CSS-hidden input. Do not assume a focusable native validation UI.', indicator: 'props.required_indicator is visual only.', error: messageError, client: 'No validation or input_options prop is exposed by this Rails kit.' },
    example: formExample('f.dropdown_field "user[country]", props: { label: "Country", options: [{ id: "ca", value: "canada", label: "Canada" }], required: true, error: @user.errors[:country].to_sentence }'),
  }),
  directMethod('date_picker', {
    binding: { ...railsBinding, name: 'The builder sets props.name to object_name[attribute] and props.picker_id to object_name_attribute, then renders a model-bound text_field.' },
    submission: { submits: true, value: 'The underlying model-bound text field value.' },
    htmlOptions: { argument: 'props', description: 'input_data and input_aria become field data and aria; disable_input becomes disabled. No arbitrary HTML keyword pass-through.' },
    validation: { required: 'props.required is passed to the nested text_field.', error: messageError, client: 'props.validation_message is forwarded as the nested text field validation.message.' },
    example: formExample('f.date_picker :birthday, props: { label: true, required: true, error: @user.errors[:birthday].to_sentence }'),
  }),
  directMethod('time_picker', {
    binding: { modelScopedName: true, modelValue: false, name: 'The builder sets props.name to object_name[attribute] and props.id to object_name_attribute.', value: 'Supply props.value or props.default_time; the builder does not read the model value.' },
    submission: { submits: true, value: 'The named time text field. The kit also renders hour, minute and meridiem controls with picker-specific names.' },
    validation: { required: 'props.required is passed to the nested text_input.', indicator: 'props.required_indicator is visual only.', error: messageError, client: 'props.validation_message becomes the nested text_input validation.message.' },
    example: formExample('f.time_picker :appointment_time, props: { label: true, required: true, error: @user.errors[:appointment_time].to_sentence }'),
  }),
  ...['phone_number_field', 'intl_telephone'].map((name) => directMethod(name, {
    binding: { ...directBinding, name: 'The name argument is converted to a string and assigned directly. id defaults to object_name_attribute, which does not imply a model-scoped name.', value: 'Supply props.value explicitly; the builder does not read the model.' },
    submission: { submits: true, value: 'The named phone text input.', additionalFields: 'With hidden_inputs: true, intl-tel-input is configured with literal names `${name}_full` and `${name}_country_code`. These suffixes are appended to the entire name string.' },
    validation: { required: 'props.required is forwarded to the nested text_input.', indicator: 'props.required_indicator is visual only.', error: messageError },
    example: formExample(`f.${name} "user[phone]", props: { label: "Phone", value: @user.phone, required: true, error: @user.errors[:phone].to_sentence }`),
  })),
  directMethod('multi_level_select', {
    binding: { ...directBinding, value: 'The builder does not populate a selection from the model.' },
    submission: { submits: true, value: 'JavaScript renders one hidden input per selected item id, named name[]. This also applies to variant: single.', multi: 'Pass user[regions], without [], to submit user[regions][] entries.' },
    validation: { required: 'props.required is used by the kit; hidden selected-value inputs also receive required. Do not infer native validation from hidden inputs.', indicator: 'props.required_indicator is visual only.', error: messageError },
    example: formExample('f.multi_level_select "user[regions]", props: { label: "Regions", tree_data: @regions, required: true, error: @user.errors[:regions].to_sentence }'),
  }),
  directMethod('star_rating_field', {
    binding: { ...directBinding, value: 'Supply props.default_value for the input value. props.rating controls display rendering; the builder does not read the model.' },
    submission: { submits: true, when: 'variant: interactive', value: 'The interactive rating input value. The default display variant does not render this input.' },
    htmlOptions: { argument: 'props.input_options', description: 'The kit merges input_options first, then overrides data, name, required, style and value.' },
    validation: { required: 'props.required sets required on the CSS-hidden rating input.', error: { supported: false, automatic: false, description: 'This kit has no error prop. Render model errors separately.' } },
    example: formExample('f.star_rating_field "user[rating]", props: { label: "Rating", variant: "interactive", default_value: @user.rating, required: true }'),
  }),
  directMethod('typeahead', {
    binding: { ...directBinding, value: 'Pass the kit selection/value props explicitly; the builder does not read the model.' },
    submission: { submits: true, value: 'Depends on the rendering branch. Native Rails renders a named search text_input; the React-backed branch delegates selection submission to Typeahead.', multi: { status: 'unknown', description: 'No uniform array serialization contract is declared here across both rendering branches.' } },
    htmlOptions: { argument: 'props.input_options', description: 'The positional _options and _html_options are ignored. input_options.id defaults to name_input. Other input_options behavior depends on the native/React rendering branch.' },
    validation: { required: 'props.required is handled by the kit rendering branch.', indicator: 'props.required_indicator is visual only.', error: { ...messageError, description: 'The React-backed branch receives error. The native Rails template does not forward error to its nested text_input; do not promise identical error rendering.' }, client: 'props.validation.message is copied to input_options.data.validation_message; the kit also receives validation.' },
    example: formExample('f.typeahead "user[country]", props: { label: "Country", is_multi: false, options: [{ label: "Canada", value: "ca" }], required: true, error: @user.errors[:country].to_sentence }'),
  }),
];

export const FORM_ACTIONS = {
  description: 'Yields an ActionArea inside ol.pb-form-actions. submit defaults props.type to submit and props.text to the supplied value or Rails submit_default_value. button renders supplied props in an li.',
  example: '<%= f.actions do |action| %>\n  <%= action.submit "Save" %>\n<% end %>',
};

