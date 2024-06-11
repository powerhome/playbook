# frozen_string_literal: true

MENU = Rails.cache.fetch("menu_yml") { YAML.load_file(Rails.root.join("config/menu.yml")) }
SAMPLES = Rails.cache.fetch("samples_yml") { YAML.load_file(Rails.root.join("config/samples.yml")) }

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
      url: "changelog_web",
      title: "Web Changelog",
      page_id: "CHANGELOG",
      filepath: "/Users/mark.rosenberg/projects/playbook/playbook-website/../playbook/CHANGELOG.md",
      frontmatter: {},
    },
    {
      url: "changelog_figma",
      title: "Figma Changelog",
      page_id: "FIGMA",
      filepath: "/Users/mark.rosenberg/projects/playbook/playbook-website/../playbook/FIGMA.md",
      frontmatter: {},
    },
  ],
}

# Move HTML figma to the end

move_pages = navigation[:getting_started][:pages].select { |page| ["HTML&_CSS", "Figma_setup", "figma_setup"].include?(page[:page_id]) }
navigation[:getting_started][:pages].reject! { |page| ["HTML&_CSS", "Figma_setup", "figma_setup"].include?(page[:page_id]) }
navigation[:getting_started][:pages].concat(move_pages)

DOCS = navigation
