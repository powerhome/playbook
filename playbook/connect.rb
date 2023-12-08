# frozen_string_literal: true

require "date"

# Function to capitalize words except for certain articles
def titleize(sentence)
  lowercase_words = %w[a an the and but or for nor on at to from by]
  sentence.split.each_with_index.map { |w, i| lowercase_words.include?(w.downcase) && i.positive? ? w : w.capitalize }.join(" ")
end

# Read the original changelog content
raw_changelog = File.read("CHANGELOG.md")

# Extract the latest release section
latest_release_boundary = /\n(?=## \[\d+\.\d+\.\d+\])|\n(?=# )/
latest_release = raw_changelog.split(latest_release_boundary).first

# Format for connect
connect_formatted = latest_release
connect_formatted.gsub!(/\\\[\w+-\d+\\\]\s?/, "") # Remove ticket numbers
connect_formatted.gsub!(/[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/, "") # Remove Unicode emojis
connect_formatted.gsub!(%r{\s+\[.*?\]\(https://github\.com/.*?\)\s+\(\[.*?\]\)}, "") # Remove PR number and user references
connect_formatted.gsub!(/(?<=-\s).+/) { |match| titleize(match) }
connect_formatted.gsub!(/-\s+/, "- ")
connect_formatted.gsub!(/^\*\*Merged pull requests:\*\*.*?(?=^\*\*|$)/m, "") # Remove "Merged pull requests" section

# Replace section titles with emojis
connect_formatted.gsub!(/^\*\*Kit Enhancements:\*\*/, "✨ Kit Enhancements:")
connect_formatted.gsub!(/^\*\*Fixed Bugs:\*\*/, "🐛 Fixed Bugs:")
connect_formatted.gsub!(/^\*\*Improvements:\*\*/, "🔥 Improvements:")

connect_formatted.gsub!(/\[.*?\]\(.*?\)\s*/, "") # Remove links and trailing space

connect_formatted.gsub!(/\(\s*\)/, "")

# Append link to full changelog
full_changelog_link = "See [here](https://playbook.powerapp.cloud/changelog) for full Changelog"
connect_formatted << "\n\n#{full_changelog_link}"

# Write the formatted content for connect
File.write("connect_message_formatted.md", connect_formatted)

puts "🎉 Connect message formatted and saved to connect_message_formatted.md 🎉"
