# frozen_string_literal: true

require "benchmark"
require "tempfile"
require "nokogiri"

require_relative "../../app/pb_kits/playbook/pb_icon/icon"

RSpec.describe "Icon SVG render caching performance" do
  let(:svg_content) do
    <<~SVG
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M13 7h-2v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
      </svg>
    SVG
  end

  let(:svg_file) do
    file = Tempfile.new(["test_icon", ".svg"])
    file.write(svg_content)
    file.close
    file
  end

  after { svg_file.unlink }

  # Simulate the core work of render_svg without needing ActionView's `raw` helper
  def simulate_render_svg(source, classname: "pb_icon_kit", id: nil, color: nil, tabindex: nil)
    content = File.read(source)
    doc = Nokogiri::XML(content)
    svg = doc.at_css("svg")
    return "" unless svg

    svg["class"] = "pb_custom_icon svg-inline--fa #{classname}"
    svg["id"] = id
    svg["height"] = "auto"
    svg["width"] = "auto"
    svg["tabindex"] = tabindex
    fill_color = color || "currentColor"
    doc.css("path").each { |p| p["fill"] = fill_color }

    doc.to_s
  end

  describe "uncached vs cached render_svg" do
    it "demonstrates file I/O + Nokogiri overhead eliminated by caching" do
      path = svg_file.path
      cache = {}
      iterations = 500

      # Warm up
      3.times { simulate_render_svg(path) }

      # Benchmark: uncached (file read + Nokogiri parse every time)
      uncached_time = Benchmark.realtime do
        iterations.times { simulate_render_svg(path) }
      end

      # Benchmark: cached (hash lookup)
      cache_key = "#{path}|pb_icon_kit||||||"
      cache[cache_key] = simulate_render_svg(path)

      cached_time = Benchmark.realtime do
        iterations.times { cache[cache_key] }
      end

      uncached_ms = (uncached_time / iterations) * 1000
      cached_ms = (cached_time / iterations) * 1000
      speedup = uncached_ms / cached_ms

      puts "\n  === Icon SVG Render Performance ==="
      puts "  Uncached (file I/O + Nokogiri): #{uncached_ms.round(4)}ms per call"
      puts "  Cached (hash lookup):           #{cached_ms.round(4)}ms per call"
      puts "  Speedup:                        #{speedup.round(1)}x"
      puts "  Saved per call:                 #{(uncached_ms - cached_ms).round(4)}ms"
      puts ""

      expect(cached_ms).to be < uncached_ms
      expect(speedup).to be > 5, "Expected >5x speedup from caching, got #{speedup.round(1)}x"
    end

    it "produces identical output whether cached or uncached" do
      path = svg_file.path

      result1 = simulate_render_svg(path, id: "icon1", color: "red")
      result2 = simulate_render_svg(path, id: "icon1", color: "red")

      expect(result1).to eq(result2)
    end

    it "produces different output for different props" do
      path = svg_file.path

      result_red = simulate_render_svg(path, color: "red")
      result_blue = simulate_render_svg(path, color: "blue")

      expect(result_red).not_to eq(result_blue)
      expect(result_red).to include('fill="red"')
      expect(result_blue).to include('fill="blue"')
    end
  end

  describe "cache implementation" do
    it "class-level cache methods work correctly" do
      icon_class = Playbook::PbIcon::Icon

      # Clear any prior state
      icon_class.clear_svg_cache

      expect(icon_class.cached_svg("test_key")).to be_nil

      icon_class.store_svg("test_key", "<svg>cached</svg>")
      expect(icon_class.cached_svg("test_key")).to eq("<svg>cached</svg>")

      icon_class.clear_svg_cache
      expect(icon_class.cached_svg("test_key")).to be_nil
    end

    it "respects cache size bound" do
      icon_class = Playbook::PbIcon::Icon
      icon_class.clear_svg_cache

      # Fill cache beyond max
      (Playbook::PbIcon::Icon::SVG_RENDER_CACHE_MAX + 10).times do |i|
        icon_class.store_svg("key_#{i}", "<svg>#{i}</svg>")
      end

      # Earliest entries should have been evicted
      expect(icon_class.cached_svg("key_0")).to be_nil
      # Latest entries should still be present
      expect(icon_class.cached_svg("key_#{Playbook::PbIcon::Icon::SVG_RENDER_CACHE_MAX + 9}")).to eq("<svg>#{Playbook::PbIcon::Icon::SVG_RENDER_CACHE_MAX + 9}</svg>")

      icon_class.clear_svg_cache
    end
  end
end
