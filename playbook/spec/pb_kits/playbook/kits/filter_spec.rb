# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_filter/filter"

RSpec.describe Playbook::PbFilter::Filter do
  subject { Playbook::PbFilter::Filter }

  it {
    is_expected.to define_prop(:filters)
      .of_type(Playbook::Props::HashArray)
  }
  it {
    is_expected.to define_prop(:sort_menu)
      .of_type(Playbook::Props::HashArray)
  }
  it {
    is_expected.to define_prop(:interactive_filters)
      .of_type(Playbook::Props::HashArray)
  }
  it {
    is_expected.to define_prop(:results)
      .of_type(Playbook::Props::Numeric)
  }
  it {
    is_expected.to define_enum_prop(:template)
      .with_default("default")
      .with_values("default", "single", "filter_only", "sort_only")
  }
  it {
    is_expected.to define_enum_prop(:placement)
      .with_default("bottom-start")
      .with_values("top", "right", "bottom", "left", "top-start", "top-end", "bottom-start", "bottom-end", "right-start", "right-end", "left-start", "left-end")
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_filter_kit"
      expect(subject.new(dark: true).classname).to eq "pb_filter_kit dark"
    end
  end

  describe "#interactive_config_for" do
    it "returns the matching interactive filter config by name" do
      filter = subject.new(
        interactive_filters: [
          { name: "Status", type: "dropdown", target_input: "status-filter" },
          { name: "Start Date", type: "date-picker", target_input: "start-date-filter" },
        ]
      )

      expect(filter.interactive_config_for("Status")[:target_input]).to eq "status-filter"
      expect(filter.interactive_config_for("Start Date")[:type]).to eq "date-picker"
      expect(filter.interactive_config_for("Missing")).to be_nil
    end
  end

  describe "#interactive_display_value" do
    it "uses option labels for select and dropdown configs", :aggregate_failures do
      filter = subject.new({})
      select_config = {
        type: "select",
        options: [
          { value: "open", text: "Open Text" },
          { value: "closed", text: "Closed Text" },
        ],
      }.with_indifferent_access
      dropdown_config = {
        type: "dropdown",
        options: [
          { value: "open", label: "Open Label" },
          { value: "closed", label: "Closed Label" },
        ],
      }.with_indifferent_access

      expect(filter.interactive_display_value(select_config, "closed")).to eq "Closed Text"
      expect(filter.interactive_display_value(dropdown_config, "open")).to eq "Open Label"
    end

    it "falls back to the raw value when there is no matching option" do
      filter = subject.new({})
      config = { type: "select", options: [{ value: "open", text: "Open" }] }.with_indifferent_access

      expect(filter.interactive_display_value(config, "unknown")).to eq "unknown"
    end

    it "uses generated quickpick labels without explicit options" do
      filter = subject.new({})
      config = { type: "dropdown", variant: "quickpick" }.with_indifferent_access

      expect(filter.interactive_display_value(config, "quickpick-this-week")).to eq "This Week"
    end
  end

  describe "#interactive_options" do
    it "generates quickpick options when a dropdown interactive filter has the quickpick variant" do
      filter = subject.new({})
      config = { type: "dropdown", variant: "quickpick" }.with_indifferent_access
      options = filter.interactive_options(config)

      expect(options.map { |option| option[:id] }).to include("quickpick-this-week", "quickpick-last-month")
    end

    it "prefers dropdown option ids for interactive option values" do
      filter = subject.new({})
      config = { type: "dropdown" }.with_indifferent_access
      option = { id: "option-id", value: "submitted-value", label: "Submitted Value" }

      expect(filter.interactive_option_value(config, option)).to eq "option-id"
    end
  end

  describe "single sort option", type: :kit do
    before { helper.extend Playbook::PbKitHelper }

    let(:single_sort_menu) do
      [
        { item: "Popularity", link: "?q[sorts]=managers_popularity+asc", active: true, direction: "desc" },
      ]
    end

    it "is true only when one sort option is available", :aggregate_failures do
      expect(subject.new({}).single_sort_option?).to be false
      expect(subject.new(sort_menu: single_sort_menu).single_sort_option?).to be true
      expect(subject.new(sort_menu: single_sort_menu + [{ item: "Name", link: "?q[sorts]=name+asc" }]).single_sort_option?).to be false
    end

    it "links the sort button and skips the popover" do
      html = helper.pb_rails("filter", props: {
                               id: "one",
                               sort_menu: single_sort_menu,
                               template: "sort_only",
                             })

      expect(html).to have_tag("a#sort-buttonone[href='?q[sorts]=managers_popularity+asc']", text: /Popularity/)
      expect(html).not_to have_tag("#sort-filter-btn-tooltipone")
    end

    it "keeps the sort popover when multiple options are available" do
      html = helper.pb_rails("filter", props: {
                               id: "many",
                               sort_menu: single_sort_menu + [{ item: "Name", link: "?q[sorts]=name+asc", active: false }],
                               template: "sort_only",
                             })

      expect(html).to have_tag("button#sort-buttonmany", text: /Popularity/)
      expect(html).to have_tag("#sort-filter-btn-tooltipmany")
      expect(html).to have_tag("a[href='?q[sorts]=name+asc']", text: /Name/)
    end
  end
end
