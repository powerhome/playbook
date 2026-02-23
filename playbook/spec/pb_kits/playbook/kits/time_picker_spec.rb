# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_time_picker/time_picker"

RSpec.describe Playbook::PbTimePicker::TimePicker do
  subject { Playbook::PbTimePicker::TimePicker }

  describe "#classname" do
    it "returns the base classname" do
      instance = subject.new({})
      expect(instance.classname).to include("pb_time_picker")
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

  describe "#time_picker_react_props" do
    it "returns default props" do
      instance = subject.new({ id: "test-picker" })
      props = instance.time_picker_react_props

      expect(props[:id]).to eq("test-picker")
      expect(props[:label]).to eq("Time Picker")
      expect(props[:timeFormat]).to eq("AMPM")
      expect(props[:showTimezone]).to eq(false)
      expect(props[:required]).to eq(false)
      expect(props[:disabled]).to eq(false)
      expect(props[:dark]).to eq(false)
      expect(props[:requiredIndicator]).to eq(false)
    end

    it "includes error when provided" do
      instance = subject.new({ error: "Please select a time" })
      props = instance.time_picker_react_props

      expect(props[:error]).to eq("Please select a time")
    end

    it "includes disabled when true" do
      instance = subject.new({ disabled: true })
      props = instance.time_picker_react_props

      expect(props[:disabled]).to eq(true)
    end

    it "includes dark when true" do
      instance = subject.new({ dark: true })
      props = instance.time_picker_react_props

      expect(props[:dark]).to eq(true)
    end

    it "includes defaultTime when provided" do
      instance = subject.new({ default_time: "14:30" })
      props = instance.time_picker_react_props

      expect(props[:defaultTime]).to eq("14:30")
    end

    it "includes minTime and maxTime when provided" do
      instance = subject.new({ min_time: "09:00", max_time: "17:00" })
      props = instance.time_picker_react_props

      expect(props[:minTime]).to eq("09:00")
      expect(props[:maxTime]).to eq("17:00")
    end

    it "includes validationMessage when provided" do
      instance = subject.new({ validation_message: "Time is required" })
      props = instance.time_picker_react_props

      expect(props[:validationMessage]).to eq("Time is required")
    end

    it "does not include validationMessage when empty" do
      instance = subject.new({ validation_message: "" })
      props = instance.time_picker_react_props

      expect(props[:validationMessage]).to eq("")
    end

    it "includes 24hour time format when specified" do
      instance = subject.new({ time_format: "24hour" })
      props = instance.time_picker_react_props

      expect(props[:timeFormat]).to eq("24hour")
    end

    it "includes showTimezone when true" do
      instance = subject.new({ show_timezone: true })
      props = instance.time_picker_react_props

      expect(props[:showTimezone]).to eq(true)
    end

    it "includes required when true" do
      instance = subject.new({ required: true })
      props = instance.time_picker_react_props

      expect(props[:required]).to eq(true)
    end

    it "includes name when provided" do
      instance = subject.new({ name: "appointment_time" })
      props = instance.time_picker_react_props

      expect(props[:name]).to eq("appointment_time")
    end

    it "includes value when provided" do
      instance = subject.new({ value: "10:30" })
      props = instance.time_picker_react_props

      expect(props[:value]).to eq("10:30")
    end

    it "includes className from classname method" do
      instance = subject.new({ id: "test-picker" })
      props = instance.time_picker_react_props

      expect(props[:className]).to include("pb_time_picker")
    end

    it "includes data when provided" do
      instance = subject.new({ data: { testid: "time-picker-test" } })
      props = instance.time_picker_react_props

      expect(props[:data]).to eq({ testid: "time-picker-test" })
    end

    it "includes htmlOptions when provided" do
      instance = subject.new({ html_options: { style: "margin-top: 10px" } })
      props = instance.time_picker_react_props

      expect(props[:htmlOptions]).to eq({ style: "margin-top: 10px" })
    end

    it "includes requiredIndicator when true" do
      instance = subject.new({ required_indicator: true })
      props = instance.time_picker_react_props

      expect(props[:requiredIndicator]).to eq(true)
    end
  end
end
