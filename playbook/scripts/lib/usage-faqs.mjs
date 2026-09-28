/** Curated usage questions, resolved into each kit so lookup needs no extra files. */
export const COMMON_FORM_FAQS = [
  {
    id: 'forms.setup', platforms: ['rails'],
    questions: ['Can I use this kit in a Rails form?', 'How do I use pb_form_with or form_with?'],
    answer: 'Use Playbook-owned pb_form_with, or form_with with builder: Playbook::Forms::Builder. See the listed methods and examples for this kit. Builder arguments are a separate API from standalone kit props.',
    contractPaths: ['form.rails.builder.setup', 'form.rails.builder.formWith'],
  },
  {
    id: 'forms.validation', platforms: ['rails'],
    questions: ['How do I show ActiveRecord errors?', 'Does required_indicator validate?', 'How do I enable client validation?'],
    answer: 'The builder does not automatically map record.errors. Follow each method validation.error contract: most use an explicit message, Checkbox uses a boolean, and StarRating has no error prop. A required indicator is visual only. pb_form_with validate: true enables Playbook client validation; it does not run model validations.',
    contractPaths: ['form.rails.builder.validation', 'form.rails.builder.methods'],
    props: ['error', 'required', 'requiredIndicator', 'validation', 'validationMessage'],
  },
  {
    id: 'forms.binding', platforms: ['rails'],
    questions: ['How does the value POST?', 'Are names model scoped?', 'Does the builder read the model value?'],
    answer: 'Check the method binding and submission fields. Rails-helper wrappers and direct kit wrappers have different naming and model-value behavior. A generated id or label does not prove that the input is model bound.',
    contractPaths: ['form.rails.builder.methods'], props: ['name', 'value', 'defaultValue'],
  },
  {
    id: 'forms.html-options', platforms: ['rails'],
    questions: ['Where do name id required maxlength min step autocomplete and data attributes go?', 'What can I put in input_options?'],
    answer: 'Use the method htmlOptions contract. Text field wrappers accept HTML keyword arguments outside props; select wrappers accept positional html_options. Direct wrappers generally accept only props. Text field wrappers and check_box also merge props.input_options into the Rails-generated field; other methods do not.',
    contractPaths: ['form.rails.builder.methods'], props: ['inputOptions', 'required', 'name', 'id'],
  },
  {
    id: 'forms.turbo', platforms: ['rails'],
    questions: ['Does pb_form_with initialize after Turbo navigation?', 'Do I need a Stimulus controller to initialize the form?'],
    answer: 'pb_form_with invokes formHelper when available, and Playbook registers PbFormValidation with PbKitRegistry for dynamically added forms. This requires the Playbook Rails bundle. No host-specific Stimulus controller is part of this contract.',
    contractPaths: ['form.rails.builder.lifecycle'],
  },
  {
    id: 'forms.simple-form', platforms: ['rails'],
    questions: ['Can I use these methods with Simple Form?'],
    answer: 'The documented methods belong to Playbook::Forms::Builder. This metadata does not declare a Simple Form adapter; host integrations must be documented separately.',
    contractPaths: ['form.rails.builder.simpleForm'],
  },
];

export const KIT_USAGE_FAQS = {
  dropdown: [{
    id: 'dropdown.builder-name', platforms: ['rails'],
    questions: ['Does dropdown_field scope country to user[country]?', 'Does multi_select submit separate array values?'],
    answer: 'Pass user[country] explicitly to dropdown_field. multi_select appends [] to the CSS-hidden input name. Comma-joining is only for default-value encoding. After kit JS runs, Playbook emits one type="hidden" input per selected id (all named name[]), clears the original CSS-hidden input, and Rails receives separate array entries.',
    contractPaths: ['form.rails.builder.methods'], props: ['name', 'multiSelect', 'options'],
  }, {
    id: 'dropdown.builder-block', platforms: ['rails'],
    questions: ['Can dropdown_field yield a custom trigger?', 'Can I pass a block to the dropdown builder?'],
    answer: 'dropdown_field does not forward a block. The standalone pb_rails("dropdown") API accepts content in place of its default trigger and container; it is a separate composition API.',
    contractPaths: ['form.rails.builder.methods'],
  }, {
    id: 'dropdown.dynamic-options', platforms: ['rails'],
    questions: ['How do I change dropdown options based on another field?', 'How do I replace dropdown options from a Turbo or custom event?'],
    answer: 'Pass options_by_context keyed by the other field value together with context_selector naming that element id; the kit swaps options on its change event and clears the selection unless clear_on_context_change is false. To push options from JavaScript, dispatch pb:dropdown:updateOptions with detail { dropdownId, options } or list your own event names in options_event_type. No request is made for you; supply every context upfront or provide the options in the event.',
    contractPaths: ['form.rails.builder.methods'], props: ['optionsByContext', 'contextSelector', 'clearOnContextChange', 'optionsEventType'],
  }, {
    id: 'dropdown.react-form-libraries', platforms: ['react'],
    questions: ['Can I use Dropdown with react-hook-form?', 'Does the React Dropdown submit a value?'],
    answer: 'Spread register("country") onto Dropdown. It accepts name and onChange, and calls onChange with { target: { name, value } } in addition to any onSelect. value is the selected option object, an array for multiSelect and null or [] when cleared, so read value.value in form state. The ref from register resolves to the kit imperative handle, not an input, and no named input is rendered; the React kit has no native form submission.',
    props: ['name', 'onChange', 'onSelect', 'multiSelect'],
  }],
  text_input: [{
    id: 'text-input.builder-options', platforms: ['rails'],
    questions: ['How do I add maxlength to f.text_field?', 'Do builder input_options override the input?'],
    answer: 'Pass maxlength: 255 as a builder keyword outside props, or in props.input_options. The builder merges input_options into the Rails helper input last, so it overrides the keyword and props-derived options; classname is appended to class and data is merged key by key.',
    example: '<%= f.text_field :email, maxlength: 255, autocomplete: "email", props: { label: "Email", required: true, error: @user.errors[:email].to_sentence } %>',
    contractPaths: ['form.rails.builder.methods'], props: ['inputOptions'],
  }],
  textarea: [{
    id: 'textarea.builder-required', platforms: ['rails'],
    questions: ['Can a Rails textarea be required?', 'Why is required missing from the Rails kit prop list?'],
    answer: 'f.text_area accepts required: true as an HTML keyword and forwards props.required to the Rails helper. This builder behavior is separate from the standalone Textarea Rails kit prop list.',
    contractPaths: ['form.rails.builder.methods'], props: ['required'],
  }],
  typeahead: [{
    id: 'typeahead.builder-rendering', platforms: ['rails'],
    questions: ['Why do errors or input_options behave differently in Typeahead?', 'Does the Typeahead builder accept html_options?'],
    answer: 'The builder ignores its positional _options and _html_options. The kit uses React rendering for pills, is_multi: false, wrapped, input_display: "none", or createable; otherwise it renders the native Rails search field. The native template does not forward error to its nested text_input.',
    contractPaths: ['form.rails.builder.methods'], props: ['error', 'inputOptions', 'isMulti'],
  }],
};

export function usageFaqsForKit(kit, form) {
  const common = form ? COMMON_FORM_FAQS.filter((faq) => kit !== 'button' || ['forms.setup', 'forms.turbo', 'forms.simple-form'].includes(faq.id)) : [];
  return [...common, ...(KIT_USAGE_FAQS[kit] || [])];
}
