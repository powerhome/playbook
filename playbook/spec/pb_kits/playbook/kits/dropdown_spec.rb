# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_dropdown/dropdown"

RSpec.describe Playbook::PbDropdown::Dropdown do
  subject { Playbook::PbDropdown::Dropdown }

  it { is_expected.to define_array_prop(:options).with_default([]) }
  it { is_expected.to define_string_prop(:label) }
  it { is_expected.to define_string_prop(:name) }
  it { is_expected.to define_boolean_prop(:required).with_default(false) }
  it { is_expected.to define_string_prop(:blank_selection).with_default("") }
  it { is_expected.to define_enum_prop(:variant).with_values("default", "subtle", "quickpick").with_default("default") }
  it { is_expected.to define_boolean_prop(:separators).with_default(true) }
  it { is_expected.to define_string_prop(:default_value) }
  it { is_expected.to define_boolean_prop(:autocomplete) }
  it { is_expected.to define_boolean_prop(:searchbar) }
  it { is_expected.to define_boolean_prop(:multi_select).with_default(false) }
  it { is_expected.to define_hash_prop(:form_pill_props).with_default({}) }
  it { is_expected.to define_boolean_prop(:range_ends_today).with_default(false) }
  it { is_expected.to define_string_prop(:controls_start_id).with_default("") }
  it { is_expected.to define_string_prop(:controls_end_id).with_default("") }
  it { is_expected.to define_string_prop(:start_date_id).with_default("start_date_id") }
  it { is_expected.to define_string_prop(:start_date_name).with_default("start_date_name") }
  it { is_expected.to define_string_prop(:end_date_id).with_default("end_date_id") }
  it { is_expected.to define_string_prop(:end_date_name).with_default("end_date_name") }
  it { is_expected.to define_hash_prop(:custom_quick_pick_dates).with_default({}) }
  it { is_expected.to define_boolean_prop(:clearable).with_default(true) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_dropdown_default"
      expect(subject.new(dark: true).classname).to eq "pb_dropdown_default dark"
      expect(subject.new(margin: "lg").classname).to eq "pb_dropdown_default m_lg"
      expect(subject.new(classname: "additional_class").classname).to eq "pb_dropdown_default additional_class"
    end
  end

  describe "#options_with_blank" do
    it "includes blank selection option if blank_selection is present" do
      dropdown = subject.new(blank_selection: "Select an option", options: [{ id: 1, label: "Option 1", value: "1" }])
      expect(dropdown.send(:options_with_blank)).to include({ id: "", value: "", label: "Select an option" })
    end

    it "does not include blank selection option if blank_selection is not present" do
      dropdown = subject.new(options: [{ id: 1, label: "Option 1", value: "1" }])
      expect(dropdown.send(:options_with_blank)).not_to include({ id: "", value: "", label: "" })
    end
  end

  describe "#multi_select" do
    it "includes pb_dropdown_multi_select when multi_select is true" do
      dropdown = subject.new(multi_select: true)
      expect(dropdown.data).to include(pb_dropdown: true, pb_dropdown_multi_select: true)
    end
    it "does not include pb_dropdown_multi_select when multi_select is false" do
      dropdown = subject.new(multi_select: false)
      expect(dropdown.data).not_to include(pb_dropdown_multi_select: true)
    end
    it "includes pb_dropdown_multi_select when multi_select is true and autocomplete is true" do
      dropdown = subject.new(multi_select: true, autocomplete: true)
      expect(dropdown.data).to include(pb_dropdown: true, pb_dropdown_multi_select: true)
    end
    it "Renders form pill props when form_pills_props used and multi_select is true" do
      dropdown = subject.new(multi_select: true, form_pill_props: { size: "small" })
      expect(dropdown.data[:form_pill_props]).to eq("{\"size\":\"small\"}")
    end
    it "Renders form pill when multi_select is true" do
      dropdown = subject.new(multi_select: true)
      expect(dropdown.data[:form_pill_props]).to eq("{}")
    end
    it "Renders default_value when used" do
      dropdown = subject.new(multi_select: true, default_value: [{ id: 1, label: "Option 1", value: "1" }])
      expect(dropdown.send(:input_default_value)).to eq("1")
    end
  end

  describe "#required with multi_select" do
    it "includes pb_dropdown_multi_select and required attributes when both are true" do
      dropdown = subject.new(multi_select: true, required: true, name: "test_field")
      expect(dropdown.data).to include(pb_dropdown: true, pb_dropdown_multi_select: true)
      expect(dropdown.required).to be true
    end

    it "supports multi_select with multiple default values" do
      dropdown = subject.new(
        multi_select: true,
        default_value: [
          { id: 1, label: "Option 1", value: "1" },
          { id: 2, label: "Option 2", value: "2" },
        ]
      )
      expect(dropdown.send(:input_default_value)).to eq("1,2")
    end

    it "configures component correctly for validation clearing after first selection" do
      dropdown = subject.new(
        multi_select: true,
        required: true,
        name: "office_locations",
        options: [
          { id: "office_1", label: "Office 1", value: "office_1" },
          { id: "office_2", label: "Office 2", value: "office_2" },
        ]
      )
      # Verify the component has the necessary data attributes for JavaScript validation
      expect(dropdown.data[:pb_dropdown_multi_select]).to be true
      expect(dropdown.required).to be true
      # Verify multi_select is set correctly for JavaScript to detect
      expect(dropdown.multi_select).to be true
    end

    it "handles options without id field by using value as fallback" do
      dropdown = subject.new(
        multi_select: true,
        required: true,
        name: "test_field",
        options: [
          { label: "Option 1", value: "value_1" },
          { label: "Option 2", value: "value_2" },
        ]
      )
      # Verify component still works with options that only have label and value
      expect(dropdown.data[:pb_dropdown_multi_select]).to be true
      expect(dropdown.required).to be true
      expect(dropdown.options.length).to eq(2)
    end

    it "handles mixed options with and without id fields" do
      dropdown = subject.new(
        multi_select: true,
        options: [
          { id: "id_1", label: "Option 1", value: "value_1" },
          { label: "Option 2", value: "value_2" },
        ]
      )
      expect(dropdown.options.length).to eq(2)
      expect(dropdown.options.first).to include(:id, :label, :value)
      expect(dropdown.options.last).to include(:label, :value)
      expect(dropdown.options.last).not_to have_key(:id)
    end

    it "properly configures name attribute with array notation for multi_select" do
      dropdown = subject.new(multi_select: true, name: "test_field")
      # The name should be configured to support array notation in the template
      expect(dropdown.name).to eq("test_field")
      expect(dropdown.multi_select).to be true
    end
  end

  describe "quickpick variant" do
    it "includes variant in data attributes" do
      dropdown = subject.new(variant: "quickpick")
      expect(dropdown.data).to include(pb_dropdown_variant: "quickpick")
    end

    it "includes clearable in data attributes" do
      dropdown = subject.new(variant: "quickpick", clearable: false)
      expect(dropdown.data).to include(pb_dropdown_clearable: false)
    end

    it "defaults clearable to true" do
      dropdown = subject.new(variant: "quickpick")
      expect(dropdown.data).to include(pb_dropdown_clearable: true)
    end

    it "includes start_date_id and end_date_id in data when variant is quickpick" do
      dropdown = subject.new(variant: "quickpick")
      expect(dropdown.data).to include(
        start_date_id: "start_date_id",
        end_date_id: "end_date_id"
      )
    end

    it "uses custom start_date_id and end_date_id when provided" do
      dropdown = subject.new(
        variant: "quickpick",
        start_date_id: "custom_start",
        end_date_id: "custom_end"
      )
      expect(dropdown.data).to include(
        start_date_id: "custom_start",
        end_date_id: "custom_end"
      )
    end

    it "includes controls_start_id and controls_end_id when provided" do
      dropdown = subject.new(
        variant: "quickpick",
        controls_start_id: "start-picker",
        controls_end_id: "end-picker"
      )
      expect(dropdown.data).to include(
        controls_start_id: "start-picker",
        controls_end_id: "end-picker"
      )
    end

    it "does not include controls_start_id and controls_end_id when empty" do
      dropdown = subject.new(variant: "quickpick")
      expect(dropdown.data).not_to have_key(:controls_start_id)
      expect(dropdown.data).not_to have_key(:controls_end_id)
    end

    it "does not include quickpick data attributes when variant is not quickpick" do
      dropdown = subject.new(variant: "default")
      expect(dropdown.data).not_to have_key(:start_date_id)
      expect(dropdown.data).not_to have_key(:end_date_id)
    end

    it "supports default_value with quickpick variant" do
      dropdown = subject.new(
        variant: "quickpick",
        default_value: "This Month"
      )
      expect(dropdown.send(:input_default_value)).to eq("quickpick-this-month")
    end

    it "supports range_ends_today option" do
      dropdown = subject.new(
        variant: "quickpick",
        range_ends_today: true
      )
      expect(dropdown.range_ends_today).to be true
    end

    it "generates quickpick options automatically" do
      dropdown = subject.new(variant: "quickpick")
      options = dropdown.send(:quickpick_options)
      expect(options).to be_an(Array)
      expect(options.length).to eq(10)
      expect(options.first).to include(:id, :label, :value, :formatted_start_date, :formatted_end_date)
    end

    it "generates quickpick options with range_ends_today" do
      dropdown = subject.new(variant: "quickpick", range_ends_today: true)
      options = dropdown.send(:quickpick_options)
      # Verify "This Month" ends today instead of end of month
      this_month_option = options.find { |opt| opt[:label] == "This Month" }
      expect(this_month_option[:formatted_end_date]).to eq(Date.today.strftime("%m/%d/%Y"))
    end

    it "supports blank_selection with quickpick to clear date inputs" do
      dropdown = subject.new(
        variant: "quickpick",
        blank_selection: "Select a date range",
        start_date_id: "custom_start",
        end_date_id: "custom_end"
      )
      # Verify blank selection option is included
      options = dropdown.send(:options_with_blank)
      blank_option = options.first
      expect(blank_option).to include(id: "", value: "", label: "Select a date range")
      # Verify blank option does not have date fields
      expect(blank_option).not_to have_key(:formatted_start_date)
      expect(blank_option).not_to have_key(:formatted_end_date)
    end

    it "supports custom_quick_pick_dates to override default options" do
      dropdown = subject.new(
        variant: "quickpick",
        custom_quick_pick_dates: {
          dates: [
            { label: "Last 15 months", value: { time_period: "months", amount: 15 } },
            { label: "Custom Range", value: ["06/01/2022", "06/07/2022"] },
          ],
        }
      )
      options = dropdown.send(:quickpick_options)
      expect(options.length).to eq(2)
      expect(options.first[:label]).to eq("Last 15 months")
      expect(options.last[:label]).to eq("Custom Range")
    end

    it "supports custom_quick_pick_dates with override false to append to defaults" do
      dropdown = subject.new(
        variant: "quickpick",
        custom_quick_pick_dates: {
          override: false,
          dates: [
            { label: "Custom Option", value: { time_period: "days", amount: 30 } },
          ],
        }
      )
      options = dropdown.send(:quickpick_options)
      # Should have 10 defaults + 1 custom = 11 options
      expect(options.length).to eq(11)
      expect(options.first[:label]).to eq("Today")
      expect(options.last[:label]).to eq("Custom Option")
    end

    it "custom_quick_pick_dates generates correct date values for time_period" do
      dropdown = subject.new(
        variant: "quickpick",
        custom_quick_pick_dates: {
          dates: [
            { label: "Last 7 days", value: { time_period: "days", amount: 7 } },
          ],
        }
      )
      options = dropdown.send(:quickpick_options)
      option = options.first
      expect(option[:label]).to eq("Last 7 days")
      expect(option[:value]).to be_an(Array)
      expect(option[:value].length).to eq(2)
      expect(option[:formatted_end_date]).to eq(Date.today.strftime("%m/%d/%Y"))
    end

    it "custom_quick_pick_dates generates correct date values for explicit date array" do
      dropdown = subject.new(
        variant: "quickpick",
        custom_quick_pick_dates: {
          dates: [
            { label: "First Week of June 2022", value: ["06/01/2022", "06/07/2022"] },
          ],
        }
      )
      options = dropdown.send(:quickpick_options)
      option = options.first
      expect(option[:label]).to eq("First Week of June 2022")
      expect(option[:formatted_start_date]).to eq("06/01/2022")
      expect(option[:formatted_end_date]).to eq("06/07/2022")
    end

    it "custom_quick_pick_dates supports various time_period values" do
      dropdown = subject.new(
        variant: "quickpick",
        custom_quick_pick_dates: {
          dates: [
            { label: "Last 2 weeks", value: { time_period: "weeks", amount: 2 } },
            { label: "Last 3 months", value: { time_period: "months", amount: 3 } },
            { label: "Last 2 quarters", value: { time_period: "quarters", amount: 2 } },
            { label: "Last 1 year", value: { time_period: "years", amount: 1 } },
          ],
        }
      )
      options = dropdown.send(:quickpick_options)
      expect(options.length).to eq(4)
      options.each do |option|
        expect(option).to include(:id, :label, :value, :formatted_start_date, :formatted_end_date)
        expect(option[:formatted_end_date]).to eq(Date.today.strftime("%m/%d/%Y"))
      end
    end

    it "custom_quick_pick_dates works with string keys" do
      dropdown = subject.new(
        variant: "quickpick",
        custom_quick_pick_dates: {
          "dates" => [
            { "label" => "Custom", "value" => { "time_period" => "days", "amount" => 5 } },
          ],
        }
      )
      options = dropdown.send(:quickpick_options)
      expect(options.length).to eq(1)
      expect(options.first[:label]).to eq("Custom")
    end
  end
end
