# frozen_string_literal: true

require "rails_helper"
require "cgi"

RSpec.describe Playbook::Forms::Builder, type: :kit do
  before do
    helper.extend Playbook::PbKitHelper
    helper.define_singleton_method :users_path do |*|
      "/users"
    end
  end

  def render_form_with(model, &block)
    helper.pb_rails "form", props: { options: { model: model, url: "/users" } }, &block
  end

  def build_model(attributes:, errors: {})
    model_name = double(
      name: "User",
      singular_route_key: "user",
      route_key: "users",
      param_key: "user",
      i18n_key: :user,
      human: "User"
    )
    errors_proxy = double("errors")
    allow(errors_proxy).to receive(:full_messages_for) do |attr|
      Array(errors[attr] || errors[attr.to_sym])
    end
    allow(errors_proxy).to receive(:any?) { errors.any? }

    model = double("model", model_name: model_name, persisted?: true, to_key: [1], to_param: "1", id: 1)
    allow(model).to receive(:to_model).and_return(model)
    allow(model).to receive(:errors).and_return(errors_proxy)

    model_class = double("UserClass", model_name: model_name)
    allow(model_class).to receive(:respond_to?).with(:human_attribute_name).and_return(true)
    allow(model_class).to receive(:human_attribute_name) { |attr| attr.to_s.humanize }
    allow(model).to receive(:class).and_return(model_class)

    attributes.each do |key, value|
      allow(model).to receive(key).and_return(value)
      allow(model).to receive("#{key}_before_type_cast").and_return(value)
    end

    # FormBuilder may ask for other methods
    allow(model).to receive(:respond_to?) do |method_name, *|
      attributes.key?(method_name.to_sym) ||
        attributes.key?(method_name.to_s) ||
        %i[errors to_model model_name persisted? to_key to_param id class].include?(method_name.to_sym)
    end

    model
  end

  describe "#date_picker" do
    it "auto-populates default_date from the model attribute without forcing UTC" do
      starts_at = Time.utc(2026, 8, 18, 19, 37, 0)
      model = build_model(attributes: { starts_at: starts_at })

      rendered = render_form_with(model) do |form|
        form.date_picker :starts_at, props: { label: true }
      end

      expect(rendered).to include(starts_at.iso8601)
      expect(rendered).to include("data-default-value")
    end

    it "preserves the model timezone offset for date-sensitive values" do
      starts_at = Time.new(2026, 8, 18, 0, 30, 0, "-04:00")
      model = build_model(attributes: { starts_at: starts_at })

      rendered = render_form_with(model) do |form|
        form.date_picker :starts_at, props: { label: true }
      end

      expect(rendered).to include(starts_at.iso8601)
      expect(rendered).not_to include(starts_at.utc.iso8601)
    end

    it "auto-populates error from the model" do
      model = build_model(
        attributes: { starts_at: nil },
        errors: { starts_at: ["Starts at can't be blank"] }
      )

      rendered = render_form_with(model) do |form|
        form.date_picker :starts_at, props: { label: true }
      end

      expect(CGI.unescapeHTML(rendered)).to include("Starts at can't be blank")
    end

    it "does not override an explicit default_date or error" do
      model = build_model(
        attributes: { starts_at: Time.utc(2026, 1, 1) },
        errors: { starts_at: ["from model"] }
      )

      rendered = render_form_with(model) do |form|
        form.date_picker :starts_at, props: {
          label: true,
          default_date: "2099-01-01T00:00:00Z",
          error: "custom error",
        }
      end

      expect(rendered).to include("2099-01-01T00:00:00Z")
      expect(rendered).to include("custom error")
      expect(rendered).not_to include("from model")
    end
  end

  describe "#time_picker" do
    it "auto-populates default_time from the model attribute" do
      opens_at = Time.utc(2026, 8, 18, 9, 30, 0)
      model = build_model(attributes: { opens_at: opens_at })

      rendered = render_form_with(model) do |form|
        form.time_picker :opens_at, props: { label: true }
      end

      expect(rendered).to include('data-default-time="09:30"').or include("09:30")
    end
  end

  describe "#text_field" do
    it "auto-populates error from the model" do
      model = build_model(
        attributes: { name: "Gary" },
        errors: { name: ["Name is invalid"] }
      )

      rendered = render_form_with(model) do |form|
        form.text_field :name, props: { label: true }
      end

      expect(rendered).to include("Name is invalid")
    end
  end

  describe "#phone_number_field" do
    it "auto-populates value from the model attribute" do
      model = build_model(attributes: { phone: "+15551234567" })

      rendered = render_form_with(model) do |form|
        form.phone_number_field :phone, props: { label: true }
      end

      expect(rendered).to include("+15551234567")
    end
  end

  describe "#dropdown_field" do
    let(:dropdown_options) do
      [
        { label: "Open", value: "open", id: "open" },
        { label: "Closed", value: "closed", id: "closed" },
      ]
    end

    it "auto-populates default_value from the model attribute matched to options" do
      model = build_model(attributes: { status: "open" })

      rendered = render_form_with(model) do |form|
        form.dropdown_field :status, props: {
          label: true,
          options: dropdown_options,
        }
      end

      expect(rendered).to include('data-default-value="open"')
    end

    it "does not pass an unmatched id through as default_value" do
      model = build_model(attributes: { status: "unknown" })

      expect do
        render_form_with(model) do |form|
          form.dropdown_field :status, props: {
            label: true,
            options: dropdown_options,
          }
        end
      end.not_to raise_error
    end

    it "does not pass a bare id when options are blank" do
      model = build_model(attributes: { status: "open" })

      expect do
        render_form_with(model) do |form|
          form.dropdown_field :status, props: { label: true }
        end
      end.not_to raise_error
    end

    it "resolves an array of ids to option hashes for multi_select" do
      model = build_model(attributes: { status: %w[open missing] })

      rendered = render_form_with(model) do |form|
        form.dropdown_field :status, props: {
          label: true,
          multi_select: true,
          options: dropdown_options,
        }
      end

      expect(rendered).to include('data-default-value="open"')
    end
  end

  describe "#multi_level_select" do
    it "auto-populates selected_ids from the model attribute" do
      model = build_model(attributes: { department_ids: %w[101 102] })

      rendered = render_form_with(model) do |form|
        form.multi_level_select :department_ids, props: {
          label: true,
          tree_data: [{ label: "People", value: "People", id: "101" }],
        }
      end

      expect(rendered).to include("101").and include("102")
    end

    it "stringifies integer ids so they match tree_data ids" do
      model = build_model(attributes: { department_ids: [101, 102] })

      rendered = render_form_with(model) do |form|
        form.multi_level_select :department_ids, props: {
          label: true,
          tree_data: [{ label: "People", value: "People", id: "101" }],
        }
      end

      expect(rendered).to include('data-selected-ids="[&quot;101&quot;,&quot;102&quot;]"')
    end
  end

  describe "#typeahead" do
    it "auto-populates default_options when the attribute is a single option hash" do
      option = { label: "Gary", value: "1" }
      model = build_model(attributes: { owner: option })

      rendered = render_form_with(model) do |form|
        form.typeahead :owner, props: { label: true, options: [option], pills: true }
      end

      expect(CGI.unescapeHTML(rendered)).to include("Gary")
    end

    it "auto-populates default_options when the attribute is an array of option hashes" do
      options = [{ label: "Gary", value: "1" }, { label: "Carlos", value: "2" }]
      model = build_model(attributes: { owners: options })

      rendered = render_form_with(model) do |form|
        form.typeahead :owners, props: { label: true, options: options, pills: true }
      end

      unescaped = CGI.unescapeHTML(rendered)
      expect(unescaped).to include("Gary")
      expect(unescaped).to include("Carlos")
    end

    it "does not invent default_options from a bare id" do
      model = build_model(attributes: { owner_id: "42" })

      rendered = render_form_with(model) do |form|
        form.typeahead :owner_id, props: { label: true }
      end

      expect(rendered).not_to include("data-default-options")
      expect(CGI.unescapeHTML(rendered)).not_to include('"value":"42"')
    end

    it "does not auto-bind a mixed array that is not all option hashes" do
      model = build_model(attributes: { owners: [{ label: "Gary", value: "1" }, "2"] })

      rendered = render_form_with(model) do |form|
        form.typeahead :owners, props: { label: true }
      end

      expect(rendered).not_to include("data-default-options")
    end
  end

  describe "#star_rating_field" do
    it "auto-populates default_value from the model attribute" do
      model = build_model(attributes: { rating: 4 })

      rendered = render_form_with(model) do |form|
        form.star_rating_field :rating, props: { label: true }
      end

      expect(rendered).to include("4").or include('data-default-value="4"')
    end
  end
end
