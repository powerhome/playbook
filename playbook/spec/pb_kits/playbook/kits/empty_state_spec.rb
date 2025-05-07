# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_empty_state/empty_state"

RSpec.describe Playbook::PbEmptyState::EmptyState do
  subject { described_class }

  it { is_expected.to define_string_prop(:description) }
  it { is_expected.to define_string_prop(:header) }
  it { is_expected.to define_string_prop(:image) }
  it { is_expected.to define_string_prop(:link_button) }
  it { is_expected.to define_string_prop(:link_button_url) }
  it { is_expected.to define_string_prop(:primary_button) }
  it { is_expected.to define_string_prop(:primary_button_url) }

  describe "default enum props" do
    it "defaults alignment to 'center'" do
      expect(subject.new.alignment).to eq "center"
    end

    it "defaults orientation to 'vertical'" do
      expect(subject.new.orientation).to eq "vertical"
    end

    it "defaults size to 'md'" do
      expect(subject.new.size).to eq "md"
    end
  end

  describe "#classname" do
    it "returns the base kit classname" do
      expect(subject.new({}).classname).to eq "pb_empty_state_kit"
    end
  end

  describe "#config" do
    it "returns the default md/vertical settings" do
      kit = subject.new({})
      cfg = kit.config

      expect(cfg[:image_width]).to     eq "140px"
      expect(cfg[:title_size]).to      eq 3
      expect(cfg[:title_padding]).to   eq "xs"
      expect(cfg[:description_pad]).to eq "md"
      expect(cfg[:button_size]).to     eq "md"
      expect(cfg[:button_margin]).to   eq "sm"
      expect(cfg[:scss_class]).to      eq "md-state-vertical"
      expect(cfg[:flex_direction]).to  eq "column"
    end

    it "returns the correct sm/horizontal settings" do
      kit = subject.new(size: "sm", orientation: "horizontal")
      cfg = kit.config

      expect(cfg[:image_width]).to     eq "100px"
      expect(cfg[:title_size]).to      eq 4
      expect(cfg[:title_padding]).to   eq "xxs"
      expect(cfg[:description_pad]).to eq "sm"
      expect(cfg[:button_size]).to     eq "sm"
      expect(cfg[:button_margin]).to   eq "xs"
      expect(cfg[:scss_class]).to      eq "sm-state-horizontal"
      expect(cfg[:flex_direction]).to  eq "row"
    end
  end

  describe "#padding_size" do
    it "is 'xs' when size is 'sm'" do
      expect(subject.new(size: "sm").padding_size).to eq "xs"
    end

    it "is 'xl' for sizes other than 'sm'" do
      %w[md lg].each do |s|
        expect(subject.new(size: s).padding_size).to eq "xl"
      end
    end
  end

  describe "#flex_align" do
    it "returns 'start' for left alignment" do
      expect(subject.new(alignment: "left").flex_align).to eq "start"
    end

    it "returns 'end' for right alignment" do
      expect(subject.new(alignment: "right").flex_align).to eq "end"
    end

    it "returns 'center' for center alignment (and default)" do
      expect(subject.new(alignment: "center").flex_align).to eq "center"
      expect(subject.new.flex_align).to eq "center"
    end
  end

  describe "#default_image_data_uri" do
    it "returns a data URI that begins with the SVG prefix" do
      uri = subject.new({}).default_image_data_uri
      expect(uri).to start_with("data:image/svg+xml,")
      expect(uri).to include("%3Csvg")
    end
  end
end
