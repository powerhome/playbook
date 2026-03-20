# frozen_string_literal: true

require "benchmark"

require_relative "../../app/pb_kits/playbook/pb_body/body"
require_relative "../../app/pb_kits/playbook/pb_badge/badge"
require_relative "../../app/pb_kits/playbook/pb_flex/flex"

RSpec.describe "Performance" do
  describe "classname generation" do
    it "is fast with no global props set" do
      component = Playbook::PbBody::Body.new(id: "test")
      # Warm up
      5.times { component.classname }

      iterations = 1000
      time = Benchmark.realtime do
        iterations.times { component.classname }
      end

      avg_ms = (time / iterations) * 1000
      puts "\n  classname (no global props): #{avg_ms.round(4)}ms avg"
      expect(avg_ms).to be < 1.0, "classname generation without global props took #{avg_ms.round(4)}ms (expected < 1.0ms)"
    end

    it "is fast with several global props set" do
      component = Playbook::PbBody::Body.new(
        id: "test",
        dark: true,
        shadow: "deep",
        margin_bottom: "sm",
        padding: "md",
        display: "flex",
        flex_direction: "column",
        align_items: "center",
        justify_content: "spaceBetween"
      )
      # Warm up
      5.times { component.classname }

      iterations = 1000
      time = Benchmark.realtime do
        iterations.times { component.classname }
      end

      avg_ms = (time / iterations) * 1000
      puts "\n  classname (many global props): #{avg_ms.round(4)}ms avg"
      expect(avg_ms).to be < 2.0, "classname generation with many global props took #{avg_ms.round(4)}ms (expected < 2.0ms)"
    end

    it "skips unset props via values.key? guard" do
      component_bare = Playbook::PbBody::Body.new(id: "test")
      component_loaded = Playbook::PbBody::Body.new(
        id: "test",
        dark: true,
        shadow: "deep",
        margin_bottom: "sm",
        padding: "md"
      )

      # Warm up
      5.times { component_bare.classname }
      5.times { component_loaded.classname }

      iterations = 1000
      bare_time = Benchmark.realtime { iterations.times { component_bare.classname } }
      loaded_time = Benchmark.realtime { iterations.times { component_loaded.classname } }

      bare_ms = (bare_time / iterations) * 1000
      loaded_ms = (loaded_time / iterations) * 1000

      puts "\n  bare classname:   #{bare_ms.round(4)}ms"
      puts "  loaded classname: #{loaded_ms.round(4)}ms"
      puts "  ratio:            #{(loaded_ms / bare_ms).round(1)}x"

      # Bare should be significantly faster since guards skip all work
      expect(bare_ms).to be < loaded_ms
    end
  end

  describe "component classname output correctness" do
    it "produces correct classnames with global props" do
      component = Playbook::PbBody::Body.new(
        id: "test",
        dark: true,
        shadow: "deep"
      )
      classname = component.classname
      expect(classname).to include("dark")
      expect(classname).to include("shadow_deep")
    end

    it "produces clean classnames without global props" do
      component = Playbook::PbBody::Body.new(id: "test")
      classname = component.classname
      expect(classname).not_to include("shadow_")
      expect(classname).not_to include("dark")
      expect(classname).not_to include("display_")
    end
  end
end
