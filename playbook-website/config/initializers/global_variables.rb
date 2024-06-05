# frozen_string_literal: true

MENU = Rails.cache.fetch("menu_yml") { YAML.load_file(Rails.root.join("config/menu.yml")) }
SAMPLES = Rails.cache.fetch("samples_yml") { YAML.load_file(Rails.root.join("config/samples.yml")) }

require "markdown_helper"
search_path = File.join(Rails.root, "/app/views/guides")
playbook_path = File.join(Rails.root, "../playbook")
navigation = {}
Dir.glob([File.join(search_path, "**/*.md"), File.join(playbook_path, "**/*.md")]) do |filename|
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
    url = url.start_with?("playbook/") ? title.downcase : "guides/#{url}"
    directory[:pages] << {
      url: url,
      title: display_title,
      page_id: title,
      filepath: filename,
      frontmatter: front_matter,
    }
  end
end

# Move HTML figma to the end

move_pages = navigation[:getting_started][:pages].select { |page| ["HTML&_CSS", "Figma_setup", "figma_setup"].include?(page[:page_id]) }
navigation[:getting_started][:pages].reject! { |page| ["HTML&_CSS", "Figma_setup", "figma_setup"].include?(page[:page_id]) }
navigation[:getting_started][:pages].concat(move_pages)

DOCS = navigation
