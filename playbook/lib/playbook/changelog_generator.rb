# frozen_string_literal: true

require "date"
require "json"
require "net/http"
require "shellwords"
require "uri"

require "playbook/version"

module Playbook
  # Builds a website-ready release section from labeled GitHub PRs and prepends it to CHANGELOG.md.
  module ChangelogGenerator
    REPO = "powerhome/playbook"
    MAX_PER_SECTION = 25
    CHANGELOG_PATH = File.expand_path("../../CHANGELOG.md", __dir__)

    OTHER_HEADER = "**Other:**"
    RELEASE_IMAGE = "![release_image](https://github.com/user-attachments/assets/db119637-25e9-4157-9091-c5f7fdf034fc)"

    SECTIONS = [
      { header: "**New Kits:**", labels: ["new kit"] },
      { header: "**Kit Enhancements:**", labels: ["enhancement"] },
      { header: "**Improvements:**", labels: ["improvement"] },
      { header: "**Fixed Bugs:**", labels: ["bug"] },
      { header: "**Breaking Changes:**", labels: ["breaking"] },
      { header: OTHER_HEADER, labels: [] },
    ].freeze

    LABEL_TO_SECTION = SECTIONS.each_with_object({}) do |section, map|
      section[:labels].each { |label| map[label.downcase] = section[:header] }
    end.freeze

    EMOJI_REGEX = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/
    TICKET_REGEX = /\\\[\w+-\d+\\\]\s?|\[\w+-\d+\]\s?/
    LOWERCASE_WORDS = %w[a an the and but or for nor on at to from by].freeze

  module_function

    def run!(changelog_path: CHANGELOG_PATH)
      version = Playbook::VERSION
      previous_version = Playbook::PREVIOUS_VERSION
      existing = File.read(changelog_path)

      version_link = %r{\[#{Regexp.escape(version)}\]\(https://github\.com/powerhome/playbook/tree/#{Regexp.escape(version)}\)}
      abort "CHANGELOG.md already has a section for #{version}. Aborting." if existing.match?(version_link)

      ensure_github_auth!
      since_date = tag_date(previous_version)
      compare_from = resolve_compare_tag(version, previous_version)
      pulls = fetch_merged_pulls(since_date)

      grouped = Hash.new { |hash, key| hash[key] = [] }

      pulls.each do |pull_request|
        labels = Array(pull_request["labels"]).map { |label| (label.is_a?(Hash) ? label["name"] : label).to_s.downcase }
        header = labels.map { |label| LABEL_TO_SECTION[label] }.compact.first || OTHER_HEADER
        grouped[header] << pull_request if grouped[header].size < MAX_PER_SECTION
      end

      section = build_release_section(version, compare_from, grouped)
      File.write(changelog_path, "#{section}\n\n#{existing.lstrip}")
      puts "Prepended #{version} release section to CHANGELOG.md"
      puts "Edit the title, image, and description placeholders before publishing."
    end

    def ensure_github_auth!
      return if github_token

      abort <<~MSG
        GitHub authentication required.
        Set CHANGELOG_GITHUB_TOKEN, GH_TOKEN, or GITHUB_TOKEN
      MSG
    end

    def github_token
      %w[CHANGELOG_GITHUB_TOKEN GH_TOKEN GITHUB_TOKEN].each do |key|
        value = ENV[key].to_s.strip
        return value unless value.empty?
      end
      nil
    end

    def tag_date(version)
      [version, "v#{version}"].each do |tag|
        date = `git -C #{Shellwords.escape(git_root)} log -1 --format=%cI #{Shellwords.escape(tag)} 2>/dev/null`.strip
        next if date.empty?

        return sanitize_iso_date(Date.parse(date).iso8601)
      end

      warn "Could not resolve date for tag #{version}; using 30 days ago."
      sanitize_iso_date((Date.today - 30).iso8601)
    end

    def sanitize_iso_date(value)
      date = value.to_s.strip
      abort "Invalid date for GitHub search: #{date.inspect}" unless date.match?(/\A\d{4}-\d{2}-\d{2}\z/)

      date
    end

    def resolve_compare_tag(version, previous_version)
      tags = `git -C #{Shellwords.escape(git_root)} tag --sort=-creatordate`.split("\n").map(&:strip).reject(&:empty?)
      rc_pattern = /\Av?#{Regexp.escape(version)}-rc\.\d+\z/

      # Prefer the newest RC tag for this VERSION (e.g. v16.10.0-rc.3...16.10.0).
      newest_rc = tags.find { |tag| tag.match?(rc_pattern) }
      return newest_rc if newest_rc

      # Otherwise use the previous release tag if present.
      previous_candidates = [previous_version, "v#{previous_version}"]
      previous_tag = tags.find { |tag| previous_candidates.include?(tag) }
      return previous_tag if previous_tag

      previous_version
    end

    def git_root
      @git_root ||= begin
        root = `git -C #{Shellwords.escape(File.dirname(CHANGELOG_PATH))} rev-parse --show-toplevel 2>/dev/null`.strip
        root.empty? ? File.dirname(CHANGELOG_PATH) : root
      end
    end

    def fetch_merged_pulls(since_date)
      safe_date = sanitize_iso_date(since_date)
      query = URI.encode_www_form_component("repo:#{REPO} is:pr is:merged merged:>=#{safe_date}")
      items = []
      page = 1

      loop do
        uri = URI("https://api.github.com/search/issues?q=#{query}&per_page=100&page=#{page}&sort=created&order=desc")
        abort "Unexpected GitHub API host: #{uri.host}" unless uri.host == "api.github.com"

        body = JSON.parse(github_get(uri))
        batch = Array(body["items"])
        items.concat(batch)
        break if batch.size < 100 || page >= 10

        page += 1
      end

      items.select { |item| item["pull_request"] }.map do |item|
        {
          "number" => item["number"],
          "title" => item["title"],
          "user" => { "login" => item.dig("user", "login") },
          "labels" => Array(item["labels"]),
        }
      end
    end

    def github_get(uri)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      request = Net::HTTP::Get.new(uri)
      request["Accept"] = "application/vnd.github+json"
      request["User-Agent"] = "playbook-changelog"
      request["Authorization"] = "Bearer #{github_token}"

      response = http.request(request)
      abort "GitHub API error #{response.code}" unless response.is_a?(Net::HTTPSuccess)

      response.body
    end

    def build_release_section(version, compare_from, grouped)
      lines = []
      lines << "# Awesome Release Title Here!"
      lines << ""
      lines << "##### #{Date.today.strftime('%B %d, %Y')}"
      lines << ""
      lines << RELEASE_IMAGE
      lines << ""
      lines << "Your feature description goes here."
      lines << ""
      lines << "[#{version}](https://github.com/#{REPO}/tree/#{version}) full list of changes:"
      lines << ""

      SECTIONS.each do |section|
        prs = grouped[section[:header]]
        next if prs.nil? || prs.empty?

        lines << section[:header]
        lines << ""
        prs.each { |pull_request| lines << format_pr_line(pull_request) }
        lines << ""
      end

      lines << "[Full Changelog](https://github.com/#{REPO}/compare/#{compare_from}...#{version})"
      lines << ""
      lines.join("\n")
    end

    def format_pr_line(pull_request)
      number = pull_request["number"]
      author = pull_request.dig("user", "login") || "unknown"
      title = clean_title(pull_request["title"].to_s)
      "- #{title} [\\##{number}](https://github.com/#{REPO}/pull/#{number}) ([#{author}](https://github.com/#{author}))"
    end

    def clean_title(title)
      cleaned = title.gsub(TICKET_REGEX, "").gsub(EMOJI_REGEX, "").strip.gsub(/\s+/, " ")
      titleize(cleaned)
    end

    def titleize(sentence)
      sentence.split.each_with_index.map do |word, index|
        LOWERCASE_WORDS.include?(word.downcase) && index.positive? ? word : word.capitalize
      end.join(" ")
    end
  end
end
