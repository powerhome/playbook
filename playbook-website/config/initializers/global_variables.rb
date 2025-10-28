# frozen_string_literal: true

MENU = Rails.cache.fetch("menu_yml") { YAML.load_file(Rails.root.join("config/menu.yml")) }
BUILDING_BLOCKS = Rails.cache.fetch("building_blocks_yml") { YAML.load_file(Rails.root.join("config/building_blocks.yml")) }
GLOBAL_PROPS_AND_TOKENS = Rails.cache.fetch("global_props_and_tokens_yml") { YAML.load_file(Rails.root.join("config/global_props_and_tokens.yml")) }

require "markdown_helper"
search_path = File.join(Rails.root, "/app/views/guides")
navigation = {}
Dir.glob("#{search_path}/**/*.md") do |filename|
  dir_path = File.dirname(filename)
  dir = File.basename(dir_path)
  title = File.basename(filename).sub(/(?<=.)\..*/, "")
  front_matter = FrontMatterParser::Parser.parse_file(filename).front_matter
  display_title = front_matter.try(:title) || front_matter["title"] || title.split(".")[0].tr("_", " ").titleize
  url = "#{dir}/#{title}"

  # Creates Top Level if None Exist
  dir_hash = {
    "#{dir}": { url: "", title: "", filepath: "", frontmatter: {}, pages: [] },
  }
  navigation.merge!(dir_hash) unless navigation[:"#{dir}"] || dir == "guides"

  if dir == "guides"
    # LOGIC FOR TOP LEVEL PARENT
    directory = navigation[:"#{title}"]
    directory[:filepath] = filename
    directory[:title] = display_title
    directory[:frontmatter] = front_matter
    directory[:url] = url
  else
    # LOGIC FOR DOC PAGES
    directory = navigation[:"#{dir}"]
    directory[:pages] << {
      url: "guides/#{url}",
      title: display_title,
      page_id: title,
      filepath: filename,
      frontmatter: front_matter,
    }
  end
end

# Manually Set custom names for Changelog

navigation[:whats_new] = {
  url: "",
  title: "",
  filepath: "",
  frontmatter: {},
  pages: [
    {
      url: "changelog/web",
      title: "Web Changelog",
      page_id: "CHANGELOG",
      frontmatter: {},
    },
    {
      url: "changelog/swift",
      title: "Swift Changelog",
      page_id: "SWIFT",
      frontmatter: {},
    },
    {
      url: "changelog/figma",
      title: "Figma Changelog",
      page_id: "FIGMA",
      frontmatter: {},
    },
  ],
}

# Move these pages to the end of the Getting Started page
page_names = ["HTML&_CSS", "figma_setup", "how_to_theme", "dependencies", "icons"]

move_pages = navigation[:getting_started][:pages].select { |page| page_names.include?(page[:page_id]) }
navigation[:getting_started][:pages].reject! { |page| page_names.include?(page[:page_id]) }
navigation[:getting_started][:pages].concat(move_pages)

DOCS = navigation
