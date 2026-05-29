# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_time_picker/time_picker"

RSpec.describe Playbook::PbTimePicker::TimePicker do
  subject { Playbook::PbTimePicker::TimePicker }

  describe "#classname" do
    it "returns the base classname" do
      instance = subject.new({})
      expect(instance.classname).to include("pb_time_picker")
    end

    it "includes default bottom margin when margin_bottom is not set" do
      instance = subject.new({})
      expect(instance.classname).to include("mb_sm")
    end

    it "omits default bottom margin when margin_bottom is set" do
      instance = subject.new({ margin_bottom: "none" })
      expect(instance.classname).not_to include("mb_sm")
    end

    it "includes error class when error is present" do
      instance = subject.new({ error: "Invalid time" })
      expect(instance.classname).to include("error")
    end

    it "does not include error class when error is not present" do
      instance = subject.new({})
      expect(instance.classname).not_to include("error")
    end

    it "includes disabled class when disabled is true" do
      instance = subject.new({ disabled: true })
      expect(instance.classname).to include("disabled")
    end

    it "does not include disabled class when disabled is false" do
      instance = subject.new({ disabled: false })
      expect(instance.classname).not_to include("disabled")
    end

    it "includes dark class when dark is true" do
      instance = subject.new({ dark: true })
      expect(instance.classname).to include("dark")
    end

    it "does not include dark class when dark is false" do
      instance = subject.new({ dark: false })
      expect(instance.classname).not_to include("dark")
    end
  end

  describe "#data" do
    it "includes enhanced element configuration" do
      instance = subject.new(
        {
          id: "test-picker",
          default_time: "14:30",
          min_time: "09:00",
          max_time: "17:00",
          validation_message: "Time is required",
          time_format: "24hour",
          show_timezone: true,
          required: true,
          disabled: true,
        }
      )

      expect(instance.data).to include(
        pb_time_picker: true,
        time_format: "24hour",
        default_time: "14:30",
        min_time: "09:00",
        max_time: "17:00",
        validation_message: "Time is required",
        show_timezone: "true",
        required: "true",
        disabled: "true",
        field_name: "test-picker-time"
      )
    end

    it "merges custom data attributes" do
      instance = subject.new({ data: { testid: "time-picker-test" } })
      expect(instance.data[:testid]).to eq("time-picker-test")
      expect(instance.data[:pb_time_picker]).to eq(true)
    end
  end

  describe "#picker_id" do
    it "uses the provided id" do
      instance = subject.new({ id: "custom-picker" })
      expect(instance.picker_id).to eq("custom-picker")
    end

    it "derives an id from the label when id is not provided" do
      instance = subject.new({ label: "Appointment Time" })
      expect(instance.picker_id).to eq("appointment_time")
    end
  end

  describe "#field_name" do
    it "uses the provided name" do
      instance = subject.new({ id: "test-picker", name: "appointment_time" })
      expect(instance.field_name).to eq("appointment_time")
    end

    it "falls back to picker id when name is not provided" do
      instance = subject.new({ id: "test-picker" })
      expect(instance.field_name).to eq("test-picker-time")
    end
  end

  describe "#formatted_input_options" do
    it "flattens nested data and aria hashes" do
      instance = subject.new(
        {
          input_options: {
            data: { custom: "value" },
            aria: { describedby: "hint" },
            tabindex: "0",
          },
        }
      )

      expect(instance.formatted_input_options).to eq(
        "data-custom" => "value",
        "aria-describedby" => "hint",
        tabindex: "0"
      )
    end
  end
end
