# frozen_string_literal: true

#
# Synthetic page-level integration benchmark for Playbook kit rendering.
#
# Renders inline ERB templates through ApplicationController.renderer with
# pb_rails() calls — exercising the same Kit.new → classname → ViewComponent
# render path that a real Rails view would, but using inline templates rather
# than file-backed views. This means template compilation overhead differs
# from production, but the kit infrastructure cost (Props, Classnames,
# utility modules, combined_html_options) is identical.
#
# Three page complexities are tested:
#   1. Simple  — a handful of kits (title, body, card, badge)
#   2. Medium  — a profile layout with flex, cards, forms, buttons
#   3. Complex — a 12-row data table with avatar, badge, buttons per row
#
# Kit call counting:
#
#   The benchmark reports two counts per page:
#
#   - "pb_rails in source" — literal pb_rails calls in the ERB template
#     text. Undercounts real work because loops (3.times, 12.times)
#     expand at render time.
#
#   - "runtime pb_rails calls" — the actual number of times
#     Playbook::PbKitHelper#pb_rails is invoked during one full render.
#     Measured via Ruby's TracePoint API: a :call event observer fires
#     for each invocation of pb_rails on Playbook::PbKitHelper during a
#     single render, then is disabled. This count includes nested
#     pb_rails calls from kit partials (e.g., Avatar internally renders
#     child components via pb_rails). Kit rendering that bypasses
#     pb_rails entirely (e.g., a direct ViewComponent render call)
#     would not be counted. For the standard Playbook kit set, pb_rails
#     is the primary rendering entry point.
#
#   The counting pass uses TracePoint, which observes method calls
#   without modifying any module, class, or method definition. Both
#   the counting pass and the timed pass use the same RENDERER (the
#   TracePoint is simply disabled before timing begins). No
#   instrumentation artifacts are present in the call path during
#   the timed benchmark.
#
# Timing methodology:
#
#   - WARMUP renders are run before timing begins (not measured).
#   - N timed iterations are collected without forced GC between them,
#     to approximate steady-state rendering conditions.
#   - P50 and P90 are reported. P99 is shown for completeness but should
#     be interpreted cautiously at N=200 (only 2 samples define it).
#
# Usage:
#   cd playbook && ASDF_RUBY_VERSION=3.3.6 ruby benchmarks/page_render_benchmark.rb
#

ENV["RAILS_ENV"] = "test"
ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)
require "bundler/setup"
require_relative "../spec/dummy/config/environment"

# ---------------------------------------------------------------------------
# Page templates (inline ERB)
# ---------------------------------------------------------------------------

SIMPLE_PAGE = <<~'ERB'
  <%= pb_rails("title", props: { text: "Dashboard", size: 1 }) %>
  <%= pb_rails("body", props: { text: "Welcome to the dashboard." }) %>
  <% 3.times do |i| %>
    <%= pb_rails("card", props: { padding: "md", margin_bottom: "sm" }) do %>
      <%= pb_rails("title", props: { text: "Card #{i + 1}", size: 3 }) %>
      <%= pb_rails("body", props: { text: "Card content goes here." }) %>
      <%= pb_rails("badge", props: { text: "Active", variant: "success" }) %>
    <% end %>
  <% end %>
ERB

MEDIUM_PAGE = <<~'ERB'
  <%= pb_rails("flex", props: { orientation: "column", gap: "md", padding: "lg" }) do %>
    <%= pb_rails("title", props: { text: "User Profile", size: 1, margin_bottom: "md" }) %>
    <%= pb_rails("card", props: { padding: "lg", margin_bottom: "md", shadow: "deep" }) do %>
      <%= pb_rails("flex", props: { gap: "sm", align: "center", margin_bottom: "md" }) do %>
        <%= pb_rails("title", props: { text: "Personal Information", size: 3 }) %>
        <%= pb_rails("badge", props: { text: "Verified", variant: "success" }) %>
      <% end %>
      <% 5.times do |i| %>
        <%= pb_rails("flex", props: { justify: "between", padding_y: "xs", margin_bottom: "xs" }) do %>
          <%= pb_rails("body", props: { text: "Field #{i + 1}", color: "light" }) %>
          <%= pb_rails("body", props: { text: "Value #{i + 1}" }) %>
        <% end %>
      <% end %>
    <% end %>

    <%= pb_rails("card", props: { padding: "lg", margin_bottom: "md" }) do %>
      <%= pb_rails("title", props: { text: "Activity", size: 3, margin_bottom: "sm" }) %>
      <% 6.times do |i| %>
        <%= pb_rails("flex", props: { gap: "sm", align: "center", padding_y: "xs" }) do %>
          <%= pb_rails("badge", props: { text: "#{(i + 1) * 10}%", variant: i > 3 ? "success" : "neutral" }) %>
          <%= pb_rails("body", props: { text: "Activity item #{i + 1} with some description text" }) %>
        <% end %>
      <% end %>
    <% end %>

    <%= pb_rails("flex", props: { gap: "sm", justify: "end", padding_top: "md" }) do %>
      <%= pb_rails("button", props: { text: "Cancel", variant: "link" }) %>
      <%= pb_rails("button", props: { text: "Save Changes", variant: "primary" }) %>
    <% end %>
  <% end %>
ERB

COMPLEX_PAGE = <<~'ERB'
  <%= pb_rails("flex", props: { orientation: "column", gap: "md", padding: "lg" }) do %>
    <%= pb_rails("flex", props: { justify: "between", align: "center", margin_bottom: "md" }) do %>
      <%= pb_rails("title", props: { text: "Team Members", size: 1 }) %>
      <%= pb_rails("flex", props: { gap: "sm" }) do %>
        <%= pb_rails("badge", props: { text: "24 members", variant: "primary" }) %>
        <%= pb_rails("badge", props: { text: "3 pending", variant: "warning" }) %>
        <%= pb_rails("button", props: { text: "Add Member", variant: "primary" }) %>
      <% end %>
    <% end %>

    <% statuses = %w[success warning error info neutral] %>
    <% roles = %w[Admin Editor Viewer Contributor Reviewer] %>

    <% 12.times do |row| %>
      <%= pb_rails("card", props: {
        padding: "sm",
        margin_bottom: "xs",
        border_radius: "lg",
        background: row.even? ? "white" : "light",
        cursor: "pointer",
        shadow: row == 0 ? "deep" : nil
      }.compact) do %>
        <%= pb_rails("flex", props: { justify: "between", align: "center", gap: "md" }) do %>
          <%= pb_rails("flex", props: { gap: "sm", align: "center" }) do %>
            <%= pb_rails("avatar", props: { name: "User #{row + 1}", size: "sm" }) %>
            <%= pb_rails("flex", props: { orientation: "column" }) do %>
              <%= pb_rails("title", props: { text: "Team Member #{row + 1}", size: 4 }) %>
              <%= pb_rails("body", props: { text: "member#{row + 1}@example.com", color: "light" }) %>
            <% end %>
          <% end %>

          <%= pb_rails("flex", props: { gap: "sm", align: "center" }) do %>
            <%= pb_rails("badge", props: { text: roles[row % 5], variant: statuses[row % 5] }) %>
            <%= pb_rails("body", props: {
              text: "Last active #{row + 1}d ago",
              color: "light"
            }) %>
          <% end %>

          <%= pb_rails("flex", props: { gap: "xs" }) do %>
            <%= pb_rails("button", props: { text: "Edit", variant: "secondary", size: "sm" }) %>
            <%= pb_rails("button", props: { text: "Remove", variant: "link", size: "sm" }) %>
          <% end %>
        <% end %>
      <% end %>
    <% end %>

    <%= pb_rails("flex", props: { justify: "between", align: "center", padding_top: "md", margin_top: "sm" }) do %>
      <%= pb_rails("body", props: { text: "Showing 12 of 24 members", color: "light" }) %>
      <%= pb_rails("flex", props: { gap: "xs" }) do %>
        <%= pb_rails("button", props: { text: "Previous", variant: "secondary" }) %>
        <%= pb_rails("button", props: { text: "Next", variant: "secondary" }) %>
      <% end %>
    <% end %>
  <% end %>
ERB

# ---------------------------------------------------------------------------
# Runtime pb_rails call counting — via TracePoint (zero mutation)
# ---------------------------------------------------------------------------
#
# To count how many times Playbook::PbKitHelper#pb_rails is invoked during a
# render, we use Ruby's TracePoint API to observe :call events. The filter
# checks both method_id (:pb_rails) and defined_class (Playbook::PbKitHelper)
# so we count only the Playbook helper, not any unrelated method that happens
# to share the name.
#
# TracePoint is non-invasive: no modules are prepended, no methods are
# redefined, no controller state is mutated. It is enabled for exactly one
# render per template, then disabled. Both the counting pass and the timed
# pass use the same RENDERER — the TracePoint is simply off during timing.

PB_RAILS_OWNER = Playbook::PbKitHelper

def count_runtime_pb_rails_calls(template)
  count = 0
  tp = TracePoint.new(:call) do |t|
    count += 1 if t.method_id == :pb_rails && t.defined_class == PB_RAILS_OWNER
  end

  tp.enable
  RENDERER.render(inline: template, layout: false)
  tp.disable

  count
end

def count_source_pb_rails(template)
  template.scan(/pb_rails/).length
end

# ---------------------------------------------------------------------------
# Timed benchmark renderer — clean, no instrumentation
# ---------------------------------------------------------------------------

ApplicationController.helper Playbook::PbKitHelper

RENDERER = ApplicationController.renderer.new(
  http_host: "localhost",
  https: false
)

# ---------------------------------------------------------------------------
# Benchmark helpers
# ---------------------------------------------------------------------------

N = 1000 # iterations for percentile measurement
WARMUP = 50

def percentiles(samples, *pcts)
  sorted = samples.sort
  pcts.map do |p|
    idx = (p / 100.0 * (sorted.length - 1)).round
    sorted[idx]
  end
end

def format_time(us)
  if us >= 1_000_000
    "%.2fs" % (us / 1_000_000.0)
  elsif us >= 1000
    "%.2fms" % (us / 1000.0)
  else
    "%.1fus" % us
  end
end

def measure_render(label, template)
  # Warmup — let the VM optimize, template caches fill, etc.
  WARMUP.times do
    RENDERER.render(inline: template, layout: false)
  end

  # Timed iterations — no forced GC, to approximate steady-state conditions.
  samples = []
  N.times do
    t0 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    RENDERER.render(inline: template, layout: false)
    t1 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    samples << (t1 - t0) * 1_000_000 # microseconds
  end

  p50, p90, p99 = percentiles(samples, 50, 90, 99)

  $stderr.puts "  %-30s P50=%-10s P90=%-10s P99=%-10s (P99 low-confidence at N=%d)" % [
    label, format_time(p50), format_time(p90), format_time(p99), N
  ]
  { label: label, p50: p50, p90: p90, p99: p99 }
end

# ---------------------------------------------------------------------------
# Run benchmarks
# ---------------------------------------------------------------------------

$stderr.puts "Ruby #{RUBY_VERSION}"
$stderr.puts "N=#{N} timed iterations per page, #{WARMUP} warmup"
$stderr.puts ""

$stderr.puts "=" * 78
$stderr.puts "SYNTHETIC PAGE RENDER BENCHMARK"
$stderr.puts "=" * 78
$stderr.puts ""

pages = {
  "Simple page" => { template: SIMPLE_PAGE, desc: "title + 3 cards with body/badge" },
  "Medium page" => { template: MEDIUM_PAGE, desc: "profile layout with flex, cards, forms, buttons" },
  "Complex page" => { template: COMPLEX_PAGE, desc: "12-row team table with avatar, badge, buttons per row" },
}

# ---------------------------------------------------------------------------
# Phase 1: Count runtime pb_rails calls
# (TracePoint on the same RENDERER — disabled before Phase 2 timing begins)
# ---------------------------------------------------------------------------

$stderr.puts "--- Phase 1: Counting runtime pb_rails calls ---"
$stderr.puts "    (TracePoint observes Playbook::PbKitHelper#pb_rails — zero mutation)"
$stderr.puts ""

pages.each do |name, config|
  source_count = count_source_pb_rails(config[:template])
  runtime_count = count_runtime_pb_rails_calls(config[:template])
  config[:source_count] = source_count
  config[:runtime_count] = runtime_count

  $stderr.puts "  %-20s pb_rails in source: %-4d  runtime pb_rails calls: %-4d" % [
    name, source_count, runtime_count
  ]
end

$stderr.puts ""
$stderr.puts "  Runtime count = every Playbook::PbKitHelper#pb_rails invocation during"
$stderr.puts "  one render, including nested calls from kit partials. Does not count"
$stderr.puts "  kit rendering that bypasses pb_rails (e.g., direct ViewComponent render)."
$stderr.puts ""

# ---------------------------------------------------------------------------
# Phase 2: Timed benchmark (ApplicationController renderer, zero
# instrumentation in the call path)
# ---------------------------------------------------------------------------

$stderr.puts "--- Phase 2: Timed renders (#{N} iterations, #{WARMUP} warmup, no forced GC) ---"
$stderr.puts ""

results = {}

pages.each do |name, config|
  $stderr.puts "--- #{name} (#{config[:runtime_count]} runtime pb_rails calls) ---"
  $stderr.puts "    #{config[:desc]}"
  $stderr.puts ""
  results[name] = measure_render(name, config[:template])
  results[name][:source_count] = config[:source_count]
  results[name][:runtime_count] = config[:runtime_count]
  $stderr.puts ""
end

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------

$stderr.puts "=" * 78
$stderr.puts "SUMMARY"
$stderr.puts "=" * 78
$stderr.puts ""
$stderr.puts "  %-20s %-10s %-10s %-12s %-12s" % [
  "Page", "In source", "Runtime", "P50", "P90"
]
$stderr.puts "  %-20s %-10s %-10s %-12s %-12s" % [
  "", "(text)", "pb_rails", "", ""
]
$stderr.puts "  " + "-" * 64
results.each do |name, r|
  $stderr.puts "  %-20s %-10d %-10d %-12s %-12s" % [
    name, r[:source_count], r[:runtime_count],
    format_time(r[:p50]), format_time(r[:p90])
  ]
end
$stderr.puts ""
$stderr.puts "  Synthetic benchmark: inline ERB templates, not file-backed views."
$stderr.puts "  Template compilation overhead differs from production; kit"
$stderr.puts "  infrastructure cost (Props, Classnames, utility modules) is identical."
$stderr.puts ""
