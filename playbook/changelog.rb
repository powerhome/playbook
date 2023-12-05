# frozen_string_literal: true

require "date"

## Function to capitalize words except for certain articles
def titleize(sentence)
  lowercase_words = %w[a an the and but or for nor on at to from by]
  sentence.split.each_with_index.map { |w, i| lowercase_words.include?(w.downcase) && i.positive? ? w : w.capitalize }.join(" ")
end

# Read the changelog content from a file
raw_changelog = File.read("changelog.md")

# Extract the latest release section
latest_release_boundary = /\n(?=## \[\d+\.\d+\.\d+\])|\n(?=# )/
latest_release = raw_changelog.split(latest_release_boundary).first

# Define placeholders
fancy_title = "# Awesome Release Title Here!"
image_placeholder = "![Image Description](image_url)"
current_date = "##### #{Date.today.strftime('%B %d, %Y')}"
feature_description = "Your feature description goes here."

# Format the latest release
formatted_release = latest_release
formatted_release.sub!(/^## \[\d+\.\d+\.\d+\]\(.*?\) \(\d{4}-\d{2}-\d{2}\)/, "#{fancy_title}\n\n#{current_date}\n\n#{image_placeholder}\n\n#{feature_description}")

# Move the full changelog link to the end of the section
full_changelog_link = formatted_release.match(/\[Full Changelog\]\(.+\)/).to_s
formatted_release.gsub!(/\[Full Changelog\]\(.+\)/, "")
formatted_release << "\n\n#{full_changelog_link}" unless full_changelog_link.empty?

# Remove ticket numbers, emojis, and PR number/user references
formatted_release.gsub!(/\\\[\w+-\d+\\\]\s?/, "") # Remove ticket numbers
formatted_release.gsub!(/[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/, "") # Remove Unicode emojis
formatted_release.gsub!(/\[\#\d+\].*?\)\s+\(\[.*?\]\)/, "") # Remove PR number and user references

# Apply titleize to each PR title in the release notes
formatted_release.gsub!(/(?<=-\s).+/) { |match| titleize(match) }

# Remove leading spaces from each PR title after bullet points
# Adjusted to also remove any leading spaces after bullet point and emoji/number removal
formatted_release.gsub!(/-\s+/, "- ")

# Write the new changelog to a file
File.write("new-changelog.md", formatted_release)
