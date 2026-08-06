# frozen_string_literal: true

require "tmpdir"
require_relative "../../../../app/pb_kits/playbook/pb_icon/icon"

RSpec.describe Playbook::PbIcon::Icon do
  subject { Playbook::PbIcon::Icon }

  xit "border" do
    is_expected.to define_prop(:border)
      .of_type(Playbook::Props::Boolean)
  end
  it {
    is_expected.to define_prop(:fixed_width)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_enum_prop(:flip)
      .with_values("horizontal", "vertical", "both", nil)
  }
  it { is_expected.to define_prop(:icon) }
  it {
    is_expected.to define_prop(:custom_icon)
      .of_type(Playbook::Props::String)
      .with_default(nil)
  }
  it {
    is_expected.to define_prop(:inverse)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_prop(:list_item)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_enum_prop(:pull)
      .with_values("left", "right", nil)
  }
  it {
    is_expected.to define_prop(:pulse)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_enum_prop(:rotation)
      .with_values(90, 180, 270, nil)
  }
  it {
    is_expected.to define_enum_prop(:size)
      .with_values("lg", "xs", "sm", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x", nil)
  }
  it {
    is_expected.to define_prop(:spin)
      .of_type(Playbook::Props::Boolean)
  }
  it {
    is_expected.to define_prop(:color)
      .of_type(Playbook::Props::String)
      .with_default(nil)
  }

  describe "#custom_icon" do
    it "returns an icon with custom data-collapsible-main attribute", :aggregate_failures do
      icon = "user.svg"
      data = { collapsible_main: true }
      id = "iconid"

      expect(subject.new(icon: icon, data: data).data).to eq({ collapsible_main: true })
      expect(subject.new(icon: icon, id: id).id).to eq("iconid")
    end
  end

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      icon = "user"
      pull = "right"
      rotation = 90
      size = "sm"

      expect(subject.new(icon: icon).classname).to include("user")
      expect(subject.new(icon: icon, border: true, fixed_width: false).classname).to include("border")
      expect(subject.new(icon: icon, flip: "horizontal").classname).to include("horizontal")
      expect(subject.new(icon: icon, inverse: true).classname).to include("inverse")
      expect(subject.new(icon: icon, list_item: true).classname).to include("li")
      expect(subject.new(icon: icon, pull: pull).classname).to include("pull", pull)
      expect(subject.new(icon: icon, pulse: true).classname).to include("pulse")
      expect(subject.new(icon: icon, rotation: rotation).classname).to include("rotate", "90")
      expect(subject.new(icon: icon, size: size).classname).to include(size)
      expect(subject.new(icon: icon, spin: true).classname).to include("spin")
      expect(subject.new(icon: icon, classname: "additional_class").classname).to include("additional_class")
    end
    it "includes color class when color prop is provided", :aggregate_failures do
      icon = "user"
      color = "primary"

      expect(subject.new(icon: icon, color: color).classname).to include "color_primary"
    end
    it "does not include color class when color prop is not provided", :aggregate_failures do
      icon = "user"

      expect(subject.new(icon: icon).classname).not_to include "color_"
    end
  end

  # A custom_icon / icon value can originate from application input, so the SVG
  # source loader must never treat it as a shell command, a path outside the
  # application, or a non-http scheme. See #svg_content / #read_svg_content.
  describe "secure custom SVG loading" do
    it "reads an SVG that lives inside an allowed root" do
      svg_path = Playbook::Engine.root.join("app/pb_kits/playbook/utilities/icons/clock.svg").to_s

      expect(subject.new(custom_icon: svg_path).send(:read_svg_content, svg_path)).to include("<svg")
    end

    it "never executes a shell command supplied as an icon source", :aggregate_failures do
      Dir.mktmpdir do |dir|
        sentinel = File.join(dir, "pb_icon_rce_sentinel")
        payload = "|touch #{sentinel} #.svg"

        result = subject.new(custom_icon: payload).send(:read_svg_content, payload)

        expect(result).to eq("")
        expect(File).not_to exist(sentinel)
      end
    end

    it "refuses to read files outside the allowed roots (path traversal)" do
      Dir.mktmpdir do |dir|
        outside_svg = File.join(dir, "secret.svg")
        File.write(outside_svg, "<svg>secret</svg>")

        expect(subject.new(custom_icon: outside_svg).send(:read_svg_content, outside_svg)).to eq("")
      end
    end

    it "reads an SVG from a mounted engine whose root is outside Rails.root" do
      Dir.mktmpdir do |engine_dir|
        engine_svg = File.join(engine_dir, "logo.svg")
        File.write(engine_svg, "<svg>engine</svg>")
        Class.new(Rails::Engine) { define_singleton_method(:root) { Pathname.new(engine_dir) } }

        expect(subject.new(custom_icon: engine_svg).send(:read_svg_content, engine_svg)).to include("<svg")
      end
    end

    it "refuses to read a non-svg file even when it lives inside an allowed root" do
      Dir.mktmpdir do |engine_dir|
        secret = File.join(engine_dir, "master.key")
        File.write(secret, "fake_secret_key_base")
        Class.new(Rails::Engine) { define_singleton_method(:root) { Pathname.new(engine_dir) } }

        expect(subject.new(custom_icon: secret).send(:read_svg_content, secret)).to eq("")
      end
    end

    it "refuses non-http url schemes", :aggregate_failures do
      %w[file:///etc/passwd ftp://example.com/icon.svg].each do |source|
        expect(subject.new(custom_icon: source).send(:read_svg_content, source)).to eq("")
      end
    end

    it "does not fetch remote http(s) SVG sources" do
      source = "https://example.com/icons/widget.svg"

      expect(subject.new(custom_icon: source).send(:read_svg_content, source)).to eq("")
    end

    it "refuses a .svg symlink that resolves to a non-svg file" do
      Dir.mktmpdir do |engine_dir|
        secret = File.join(engine_dir, "master.key")
        File.write(secret, "fake_secret_key_base")
        link = File.join(engine_dir, "fake.svg")
        File.symlink(secret, link)
        Class.new(Rails::Engine) { define_singleton_method(:root) { Pathname.new(engine_dir) } }

        expect(subject.new(custom_icon: link).send(:read_svg_content, link)).to eq("")
      end
    end
  end

  describe "#valid_emoji?" do
    it "accepts pictographic emoji and keycap sequences", :aggregate_failures do
      expect(subject.new(icon: "😀").valid_emoji?).to be(true)
      expect(subject.new(icon: "👍").valid_emoji?).to be(true)
      expect(subject.new(icon: "1️⃣").valid_emoji?).to be(true)
    end

    it "rejects bare emoji keycap bases and HTML-like payloads", :aggregate_failures do
      expect(subject.new(icon: "1").valid_emoji?).to be(false)
      expect(subject.new(icon: "#").valid_emoji?).to be(false)
      expect(subject.new(icon: "*").valid_emoji?).to be(false)
      expect(subject.new(icon: "1<img src=x onerror=alert(1)>").valid_emoji?).to be(false)
      expect(subject.new(icon: "user").valid_emoji?).to be(false)
      expect(subject.new(icon: "&#128525;").valid_emoji?).to be(false)
      expect(subject.new(icon: "&lt;script&gt;").valid_emoji?).to be(false)
    end
  end
end
