# frozen_string_literal: true

#
# Kit Base Benchmark: measures the overhead of the base kit infrastructure
# (Props, Classnames, utility modules, combined_html_options) across
# representative kits of varying complexity.
#
# Reports P50/P90/P99 percentiles for timing and allocations/call.
#
# Usage:
#   cd playbook && ruby benchmarks/kit_base_benchmark.rb
#   OR via Docker:
#   docker compose run --rm web bash -lc 'cd /home/app/src/playbook && ruby benchmarks/kit_base_benchmark.rb'
#

ENV["RAILS_ENV"] = "test"
ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)
require "bundler/setup"
require_relative "../spec/dummy/config/environment"

# Warm icon path index for Icon benchmarks
if Rails.application.config.respond_to?(:icon_path)
  Rails.application.config.icon_path = "../../app/pb_kits/playbook/utilities/icons"
end
Playbook::PbIcon::Icon.icon_path_index

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

WARMUP = 50
N = 500 # iterations for percentile measurements
ALLOC_N = 200 # iterations for allocation measurements

def percentiles(samples, *pcts)
  sorted = samples.sort
  pcts.map do |p|
    idx = (p / 100.0 * (sorted.length - 1)).round
    sorted[idx]
  end
end

def format_us(us)
  if us >= 1000
    "%.2fms" % (us / 1000.0)
  else
    "%.1fus" % us
  end
end

def measure_timing(label)
  # warmup
  WARMUP.times { yield }

  samples = []
  N.times do
    GC.start
    GC.disable
    t0 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    yield
    t1 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    GC.enable
    samples << (t1 - t0) * 1_000_000 # microseconds
  end

  p50, p90, p99 = percentiles(samples, 50, 90, 99)
  $stderr.puts "  %-55s P50=%-10s P90=%-10s P99=%-10s" % [label, format_us(p50), format_us(p90), format_us(p99)]
  { label: label, p50: p50, p90: p90, p99: p99 }
end

def measure_allocs(label)
  # warmup
  WARMUP.times { yield }

  GC.start
  GC.disable
  before = GC.stat(:total_allocated_objects)
  ALLOC_N.times { yield }
  after = GC.stat(:total_allocated_objects)
  GC.enable

  per = (after - before).to_f / ALLOC_N
  $stderr.puts "  %-55s %5.1f allocs/call" % [label, per]
  { label: label, allocs: per }
end

# ---------------------------------------------------------------------------
# Kit configurations
# ---------------------------------------------------------------------------

BADGE_MINIMAL = { text: "Badge", variant: "neutral" }
BADGE_WITH_UTILS = { text: "Badge", variant: "neutral", margin: "md", padding: "sm", display: "inline_block", shadow: "deep", cursor: "pointer", z_index: "3" }

BODY_MINIMAL = { text: "Hello" }
BODY_WITH_UTILS = { text: "Hello", color: "light", margin: "lg", padding: "md", display: "flex", shadow: "deeper", text_align: "center", z_index: "5" }

ICON_MINIMAL = { icon: "clock", id: "bench", data: { testid: "clock" }, aria: { label: "clock" } }
ICON_WITH_UTILS = { icon: "clock", id: "bench", data: { testid: "clock" }, aria: { label: "clock" }, color: "blue", margin: "md", padding: "sm", display: "inline_block", shadow: "deep" }

CARD_MINIMAL = {}
CARD_WITH_UTILS = { margin: "xl", padding: "lg", display: "flex", shadow: "deepest", text_align: "center", border_radius: "lg", background: "light" }

KITS = {
  "Badge" => { klass: Playbook::PbBadge::Badge, minimal: BADGE_MINIMAL, with_utils: BADGE_WITH_UTILS },
  "Body" => { klass: Playbook::PbBody::Body, minimal: BODY_MINIMAL, with_utils: BODY_WITH_UTILS },
  "Icon" => { klass: Playbook::PbIcon::Icon, minimal: ICON_MINIMAL, with_utils: ICON_WITH_UTILS },
  "Card" => { klass: Playbook::PbCard::Card, minimal: CARD_MINIMAL, with_utils: CARD_WITH_UTILS },
}

# ---------------------------------------------------------------------------
# Run benchmarks
# ---------------------------------------------------------------------------

$stderr.puts "Ruby #{RUBY_VERSION}"
$stderr.puts "N=#{N} timing iterations, #{ALLOC_N} allocation iterations"
$stderr.puts ""

all_results = {}

KITS.each do |name, config|
  klass = config[:klass]
  minimal = config[:minimal]
  with_utils = config[:with_utils]

  $stderr.puts "=" * 78
  $stderr.puts "#{name} (#{klass.props.size} total props)"
  $stderr.puts "=" * 78
  $stderr.puts ""

  results = {}

  # --- Allocations ---
  $stderr.puts "--- Allocations ---"
  $stderr.puts ""

  results[:alloc_new_minimal] = measure_allocs("#{name}.new (minimal props)") {
    klass.new(**minimal)
  }

  results[:alloc_new_utils] = measure_allocs("#{name}.new (with utility props)") {
    klass.new(**with_utils)
  }

  inst_min = klass.new(**minimal)
  results[:alloc_classname_minimal] = measure_allocs("#{name}#classname (no utility props)") {
    inst_min.classname
  }

  inst_util = klass.new(**with_utils)
  results[:alloc_classname_utils] = measure_allocs("#{name}#classname (with utility props)") {
    inst_util.classname
  }

  results[:alloc_html_opts] = measure_allocs("#{name}#combined_html_options") {
    inst_min.combined_html_options
  }

  $stderr.puts ""

  # --- Timing ---
  $stderr.puts "--- Timing (P50/P90/P99) ---"
  $stderr.puts ""

  results[:time_new_minimal] = measure_timing("#{name}.new (minimal props)") {
    klass.new(**minimal)
  }

  results[:time_new_utils] = measure_timing("#{name}.new (with utility props)") {
    klass.new(**with_utils)
  }

  results[:time_classname_minimal] = measure_timing("#{name}#classname (no utility props)") {
    inst_min = klass.new(**minimal)
    inst_min.classname
  }

  results[:time_classname_utils] = measure_timing("#{name}#classname (with utility props)") {
    inst_util = klass.new(**with_utils)
    inst_util.classname
  }

  results[:time_html_opts] = measure_timing("#{name}#combined_html_options") {
    inst = klass.new(**minimal)
    inst.combined_html_options
  }

  # Icon-specific: render_svg (full pipeline)
  if name == "Icon"
    $stderr.puts ""
    $stderr.puts "--- Icon render_svg (full pipeline) ---"
    $stderr.puts ""

    results[:alloc_render_svg] = measure_allocs("Icon.new + render_svg") {
      Playbook::PbIcon::Icon.new(**minimal).render_svg
    }

    results[:time_render_svg] = measure_timing("Icon.new + render_svg") {
      Playbook::PbIcon::Icon.new(**minimal).render_svg
    }
  end

  all_results[name] = results
  $stderr.puts ""
end

# ---------------------------------------------------------------------------
# Summary table
# ---------------------------------------------------------------------------

$stderr.puts "=" * 78
$stderr.puts "SUMMARY: P90 Timing (microseconds)"
$stderr.puts "=" * 78
$stderr.puts ""
$stderr.puts "  %-12s %-15s %-15s %-18s %-18s %-15s" % ["Kit", ".new (min)", ".new (util)", ".classname (min)", ".classname (util)", "html_options"]

all_results.each do |name, results|
  $stderr.puts "  %-12s %-15s %-15s %-18s %-18s %-15s" % [
    name,
    format_us(results[:time_new_minimal][:p90]),
    format_us(results[:time_new_utils][:p90]),
    format_us(results[:time_classname_minimal][:p90]),
    format_us(results[:time_classname_utils][:p90]),
    format_us(results[:time_html_opts][:p90]),
  ]
end

$stderr.puts ""
$stderr.puts "  %-12s %-15s %-15s %-18s %-18s %-15s" % ["Kit", ".new (min)", ".new (util)", ".classname (min)", ".classname (util)", "html_options"]
$stderr.puts ""
$stderr.puts "SUMMARY: Allocations per call"
$stderr.puts ""

all_results.each do |name, results|
  $stderr.puts "  %-12s %-15s %-15s %-18s %-18s %-15s" % [
    name,
    "%.1f" % results[:alloc_new_minimal][:allocs],
    "%.1f" % results[:alloc_new_utils][:allocs],
    "%.1f" % results[:alloc_classname_minimal][:allocs],
    "%.1f" % results[:alloc_classname_utils][:allocs],
    "%.1f" % results[:alloc_html_opts][:allocs],
  ]
end

if all_results["Icon"]&.dig(:time_render_svg)
  $stderr.puts ""
  $stderr.puts "  Icon render_svg:  P90=%-10s  allocs=%.1f" % [
    format_us(all_results["Icon"][:time_render_svg][:p90]),
    all_results["Icon"][:alloc_render_svg][:allocs],
  ]
end

$stderr.puts ""
