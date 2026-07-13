# frozen_string_literal: true

require "playbook/version"

module Playbook
  # Formats the latest CHANGELOG.md release into a Connect-ready markdown message.
  module ConnectMessageGenerator
    CHANGELOG_PATH = File.expand_path("../../CHANGELOG.md", __dir__)
    OUTPUT_PATH = File.expand_path("../../connect_message_formatted.md", __dir__)
    FULL_CHANGELOG_LINK = "See [here](https://playbook.powerapp.cloud/changelog) for full Changelog"

    SECTION_HEADERS = {
      "**New Kits:**" => "🆕 New Kits:",
      "**Kit Enhancements:**" => "✨ Kit Enhancements:",
      "**Improvements:**" => "🔥 Improvements:",
      "**Fixed Bugs:**" => "🐛 Fixed Bugs:",
      "**Breaking Changes:**" => "💥 Breaking Changes:",
      "**Other:**" => "📦 Other:",
    }.freeze

    EMOJI_REGEX = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/
    TICKET_REGEX = /\\\[\w+-\d+\\\]\s?|\[\w+-\d+\]\s?/
    PR_AND_AUTHOR_REGEX = %r{\s+\[.*?\]\(https://github\.com/.*?\)\s+\(\[.*?\]\)}
    MARKDOWN_LINK_REGEX = /\[.*?\]\(.*?\)\s*/
    LOWERCASE_WORDS = %w[a an the and but or for nor on at to from by].freeze

  module_function

    def run!(changelog_path: CHANGELOG_PATH, output_path: OUTPUT_PATH)
      abort "CHANGELOG.md not found at #{changelog_path}" unless File.exist?(changelog_path)

      latest_release = extract_latest_release(File.read(changelog_path))
      abort "Could not find a release section in CHANGELOG.md" if latest_release.strip.empty?

      formatted = format_for_connect(latest_release)
      File.write(output_path, formatted)
      puts "Connect message saved to #{File.basename(output_path)}"
    end

    def extract_latest_release(raw_changelog)
      raw_changelog.split(/\n(?=# )/).first.to_s
    end

    def format_for_connect(latest_release)
      text = latest_release.dup
      text.gsub!(TICKET_REGEX, "")
      text.gsub!(EMOJI_REGEX, "")
      text.gsub!(PR_AND_AUTHOR_REGEX, "")
      text.gsub!(/^\*\*Merged pull requests:\*\*.*?(?=^\*\*|$)/m, "")
      text.gsub!(/^!\[.*?\]\(.*?\)\s*$/, "")
      text.gsub!(/^\[Full Changelog\]\(.*?\)\s*$/, "")
      # Keep "version full list of changes:" without the GitHub tree link.
      text.gsub!(%r{^\[(\d+\.\d+[^\]]*)\]\(https://github\.com/.*?\)\s*full list of changes:\s*$}, '\1 full list of changes:')

      SECTION_HEADERS.each do |markdown_header, emoji_header|
        text.gsub!(/^#{Regexp.escape(markdown_header)}$/, emoji_header)
      end

      text.gsub!(MARKDOWN_LINK_REGEX, "")
      text.gsub!(/\(\s*\)/, "")
      text.gsub!(/(?<=-\s).+/) { |match| titleize(match.strip) }
      text.gsub!(/-\s+/, "- ")

      text = group_by_headers(text)
      text = text.gsub(/\n{3,}/, "\n\n").strip
      "#{text}\n\n#{FULL_CHANGELOG_LINK}\n"
    end

    def group_by_headers(text)
      lines = text.split("\n")
      grouped_sections = {}
      header_order = []
      preamble = []
      current_header = nil

      lines.each do |line|
        if line.match?(/^(🆕|✨|🔥|🐛|💥|📦|\*\*).*:/)
          current_header = line
          unless grouped_sections.key?(current_header)
            grouped_sections[current_header] = []
            header_order << current_header
          end
        elsif current_header
          grouped_sections[current_header] << line
        else
          preamble << line
        end
      end

      result = preamble.join("\n")
      header_order.each do |header|
        result += "\n" unless result.empty? || result.end_with?("\n\n")
        result += "\n#{header}\n"
        result += grouped_sections[header].join("\n")
      end
      result
    end

    def titleize(sentence)
      sentence.split.each_with_index.map do |word, index|
        LOWERCASE_WORDS.include?(word.downcase) && index.positive? ? word : word.capitalize
      end.join(" ")
    end
  end
end
