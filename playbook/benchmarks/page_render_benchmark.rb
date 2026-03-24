# frozen_string_literal: true

#
# Real-world page render benchmark: measures the wall-clock time to render
# ERB pages that use pb_rails() to instantiate and render real kit components,
# the same way a production Rails view does.
#
# Simulates three page complexities:
#   1. Simple page  — a handful of kits (card, body, title, badge)
#   2. Medium page  — a form layout with many kits and utility props
#   3. Complex page — a data table page with nested kits, repeated rows,
#                     and heavy utility prop usage
#
# Reports P50/P90/P99 percentiles for each page.
#
# Usage:
#   cd playbook && ASDF_RUBY_VERSION=3.3.6 ruby benchmarks/page_render_benchmark.rb
#

ENV["RAILS_ENV"] = "test"
ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)
require "bundler/setup"
require_relative "../spec/dummy/config/environment"

# ---------------------------------------------------------------------------
# Renderer setup
# ---------------------------------------------------------------------------

# Make pb_rails available to the view context used by the renderer
ApplicationController.helper Playbook::PbKitHelper

renderer = ApplicationController.renderer.new(
  http_host: "localhost",
  https: false
)

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
# Benchmark helpers
# ---------------------------------------------------------------------------

N = 100 # iterations for percentile measurement
WARMUP = 10

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

def measure_render(label, renderer, template)
  # Warmup
  WARMUP.times do
    renderer.render(inline: template, layout: false)
  end

  samples = []
  N.times do
    GC.start
    t0 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    renderer.render(inline: template, layout: false)
    t1 = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    samples << (t1 - t0) * 1_000_000 # microseconds
  end

  p50, p90, p99 = percentiles(samples, 50, 90, 99)
  min_val = samples.min
  max_val = samples.max

  $stderr.puts "  %-30s P50=%-10s P90=%-10s P99=%-10s Min=%-10s Max=%-10s" % [
    label, format_time(p50), format_time(p90), format_time(p99),
    format_time(min_val), format_time(max_val)
  ]
  { label: label, p50: p50, p90: p90, p99: p99, min: min_val, max: max_val }
end

def count_pb_rails(template)
  template.scan(/pb_rails/).length
end

# ---------------------------------------------------------------------------
# Run benchmarks
# ---------------------------------------------------------------------------

$stderr.puts "Ruby #{RUBY_VERSION}"
$stderr.puts "N=#{N} iterations per page, #{WARMUP} warmup"
$stderr.puts ""

$stderr.puts "=" * 78
$stderr.puts "PAGE RENDER BENCHMARK"
$stderr.puts "=" * 78
$stderr.puts ""

pages = {
  "Simple page" => { template: SIMPLE_PAGE, desc: "title + 3 cards with body/badge" },
  "Medium page" => { template: MEDIUM_PAGE, desc: "profile layout with flex, cards, forms, buttons" },
  "Complex page" => { template: COMPLEX_PAGE, desc: "12-row team table with avatar, badge, buttons per row" },
}

results = {}

pages.each do |name, config|
  kit_count = count_pb_rails(config[:template])
  $stderr.puts "--- #{name} (#{kit_count} pb_rails calls) ---"
  $stderr.puts "    #{config[:desc]}"
  $stderr.puts ""
  results[name] = measure_render(name, renderer, config[:template])
  results[name][:kit_count] = kit_count
  $stderr.puts ""
end

$stderr.puts "=" * 78
$stderr.puts "SUMMARY"
$stderr.puts "=" * 78
$stderr.puts ""
$stderr.puts "  %-30s %-8s %-12s %-12s %-12s" % ["Page", "Kits", "P50", "P90", "P99"]
$stderr.puts "  " + "-" * 74
results.each do |name, r|
  $stderr.puts "  %-30s %-8d %-12s %-12s %-12s" % [
    name, r[:kit_count], format_time(r[:p50]), format_time(r[:p90]), format_time(r[:p99])
  ]
end
$stderr.puts ""
