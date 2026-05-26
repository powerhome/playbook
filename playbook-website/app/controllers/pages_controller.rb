# frozen_string_literal: true

require "will_paginate"
require "playbook/pagination_renderer"
require "will_paginate/array"
require "ostruct"

class PagesController < ApplicationController
  include ::ViteRails::TagHelpers
  rescue_from ActionView::MissingTemplate, :with => :page_not_found

  def application_beta
    @kits = MENU["kits"]
    @dark = cookies[:dark_mode] == "true"
    @type = params[:platform] || params[:type] || "react"
    @kit = params[:name]
    @params = params

    # Special handling for advanced_table sections
    # Detect if this is an advanced_table section route by checking the request path
    is_advanced_table_section = request.path.include?("/kits/advanced_table/")

    # For advanced_table routes, params[:name] is the section name
    # For query param routes, params[:section] is the section name
    section_param = is_advanced_table_section ? params[:name] : params[:section]

    if section_param.present? && (is_advanced_table_section || params[:section].present?)
      # Find the section in all_kits
      # For advanced_table sections, we need to set @kit to "advanced_table"
      parent_kit = is_advanced_table_section ? "advanced_table" : @kit

      matching_kit = all_kits.find do |kit|
        kit[:parent] == parent_kit && kit[:name] == section_param
      end

      if matching_kit
        @kit_parent = matching_kit[:parent]
        @kit_section = matching_kit[:kit_section]

        # For advanced_table sections, we need to override @kit to be the parent
        # so that file reading works correctly
        @kit = @kit_parent if is_advanced_table_section

        # For advanced_table, get examples from parent kit but filter by kit_section
        if @kit_parent == "advanced_table" && @kit_section.present?
          all_examples = pb_doc_kit_examples(@kit_parent, @type)
          # Filter examples to only include those in the kit_section array
          @examples = all_examples.select do |example|
            @kit_section.include?(example.values.first)
          end
        else
          @examples = pb_doc_kit_examples(@kit, @type)
        end
      else
        @examples = pb_doc_kit_examples(@kit, @type)
      end
    else
      @examples = pb_doc_kit_examples(@kit, @type)
    end

    assign_advanced_table_doc_mocks

    # Pagination data is only used when rendering Rails ERB examples inline.
    if @type == "rails"
      @users = Array.new(9) { Faker::Name.name }.paginate(page: will_paginate_page, per_page: 2)
      @extra_users = Array.new(2000) { Faker::Name.name }.paginate(page: will_paginate_page, per_page: 2)
    end

    @css = view_context.vite_asset_path("site_styles/main.scss")

    # Read kit description from _description.md file
    kit_description = read_kit_file("_description.md")

    # Read kit sections from _sections.yml file if it exists
    kit_sections = read_kit_sections

    # Get available props from kit.schema.json
    available_props = nil
    begin
      schema_path = Playbook::Engine.root.join("app/pb_kits/playbook/pb_#{@kit}/kit.schema.json")
      available_props = File.read(schema_path) if File.exist?(schema_path)
    rescue => e
      Rails.logger.error("Error reading kit schema: #{e.message}")
    end

    # Get kit schema and global props schema for playground
    kit_schema = read_kit_schema(@kit)
    global_props_schema = read_global_props_schema
    playground_config = read_playground_config(@kit)

    # first example from each kit
    examples = @examples.map do |example|
      example_key = example.keys.first.to_s
      source_code = get_source(example_key)
      description = get_description(example_key)
      {
        example_key: example_key,
        title: example.values.first,
        source: source_code,
        description: description,
        rendered: rendered_example(example_key),
        highlighted_source: (@type == "rails" ? render_code(source_code, "erb") : nil),
      }
    end

    on_changelog = request.path.include?("changelog")
    on_guides    = request.path.include?("guides")
    on_icons     = request.path.include?("icons")
    on_home      = !@kit.present? && !on_changelog && !on_guides && !on_icons

    # Changelog — needed on changelog page AND as part of the general /kits.json payload
    # (the Changelog React component loads via ComponentsLoader which fetches /kits.json).
    # File reads are wrapped in Rails.cache so the disk I/O only happens once per boot.
    changelog_content          = nil
    changelog_releases         = nil
    swift_changelog_content    = nil
    swift_changelog_releases   = nil
    figma_changelog_content    = nil
    figma_changelog_releases   = nil

    if on_changelog || on_home
      changelog_content = Rails.cache.fetch("changelog_file_content") do
        Playbook::Engine.root.join("CHANGELOG.md").read
      end
      changelog_releases = Rails.cache.fetch("changelog_releases") do
        paginate_changelog(changelog_content)
      end

      swift_changelog_content = Rails.cache.fetch("swift_changelog_file_content") do
        Playbook::Engine.root.join("SWIFT_CHANGELOG.md").read
      end
      swift_changelog_releases = Rails.cache.fetch("swift_changelog_releases") do
        paginate_changelog(swift_changelog_content)
      end

      figma_changelog_content = Rails.cache.fetch("figma_changelog_file_content") do
        Playbook::Engine.root.join("FIGMA_CHANGELOG.md").read
      end
      figma_changelog_releases = Rails.cache.fetch("figma_changelog_releases") do
        paginate_changelog(figma_changelog_content)
      end
    end

    # Guide content — only read on guides pages.
    getting_started_content    = nil
    design_guidelines_content  = nil
    guide_page_content         = nil

    if on_guides
      getting_started_content   = File.read(Rails.root.join("app/views/guides/getting_started.html.md"))
      design_guidelines_content = File.read(Rails.root.join("app/views/guides/design_guidelines.md"))

      if params[:page].present?
        parent = if request.path.include?("getting_started")
                   "getting_started"
                 elsif request.path.include?("design_guidelines")
                   "design_guidelines"
                 end

        if parent
          search_path = File.join(Rails.root, "/app/views/guides/#{parent}")
          file_path   = Dir.glob("#{search_path}/#{params[:page]}*.md").first
          guide_page_content = File.read(file_path) if file_path && File.exist?(file_path)
        end
      end
    end

    # Landing posts for the home page hero (changelog_content already read above when on_home).
    landing_posts = on_home ? extract_changelog_data(changelog_content) : nil

    # Icon data — only parse on the icons page.
    icon_banner_image_url = nil
    icon_categories       = nil
    icons_by_category     = nil

    if on_icons
      icon_data             = JSON.parse(File.read(Rails.root.join("app/assets/icons.json")))
      icons_by_category     = icon_data.group_by { |icon| icon["category"] }
      icon_categories       = icons_by_category.keys.sort.map do |category|
        {
          text: category,
          link: "##{category.parameterize}",
          value: category.parameterize,
          label: category,
        }
      end
      icon_banner_image_url = view_context.vite_asset_path("images/icon-banner.svg")
    end

    respond_to do |format|
      format.html { render layout: "application_beta", inline: "" }
      format.json do
        render json: {
          kits: @kits,
          dark: @dark,
          type: @type,
          examples: examples,
          kit: @kit,
          kit_description: kit_description,
          kit_sections: kit_sections,
          available_props: available_props,
          kit_schema: kit_schema,
          global_props_schema: global_props_schema,
          playground_config: playground_config,
          params: @params,
          category: @category,
          css: @css,
          kits_with_status: helpers.aggregate_kits_with_status,
          PBversion: Playbook::VERSION,
          search_list: helpers.search_list,
          getting_started: DOCS[:getting_started],
          design_guidelines: DOCS[:design_guidelines],
          icons: DOCS[:icons],
          icon_banner_image_url: icon_banner_image_url,
          icon_categories: icon_categories,
          icon_kit_url: "https://playbook.powerapp.cloud/kits/icon/react",
          icons_by_category: icons_by_category,
          whats_new: DOCS[:whats_new],
          building_blocks: BUILDING_BLOCKS,
          global_props_and_tokens: GLOBAL_PROPS_AND_TOKENS,
          changelog_content: changelog_content,
          changelog_releases: changelog_releases,
          swift_changelog_content: swift_changelog_content,
          swift_changelog_releases: swift_changelog_releases,
          figma_changelog_content: figma_changelog_content,
          figma_changelog_releases: figma_changelog_releases,
          getting_started_content: getting_started_content,
          design_guidelines_content: design_guidelines_content,
          guide_page_content: guide_page_content,
          table_data: @beta_table_data,
          table_data_with_id: @beta_table_data_with_id,
          table_data_no_subrows: @beta_table_data_no_subrows,
          table_data_pagination: @beta_table_data_pagination,
          table_data_infinite_scroll: @beta_table_data_infinite_scroll,
          table_data_inline_loading: @beta_table_data_inline_loading,
          table_data_inline_loading_empty_children: @beta_table_data_inline_loading_empty_children,
          landing_posts: landing_posts,
        }
      end
    end
  end

  def get_source(example)
    extension = case @type
                when "rails"
                  "html.erb"
                when "swift"
                  "swift"
                else
                  "jsx"
                end
    read_kit_file("_#{example}.#{extension}")
  end

  def rendered_example(example_key)
    return nil unless @type == "rails"

    kit_name = @kit_parent == "advanced_table" ? @kit_parent : @kit
    example_path = ::Playbook.kit_path(kit_name, "docs", "_#{example_key}.html.erb")
    return nil unless example_path.exist?

    erb_content = example_path.read
    view_context.render(inline: erb_content)
  rescue => e
    Rails.logger.error("Error rendering Rails example #{example_key}: #{e.message}")
    nil
  end

  def get_description(example)
    read_kit_file("_#{example}.md")
  end

  helper_method :get_source, :get_description

private

  # will_paginate expects a numeric page; guide routes use params[:page] for the markdown slug.
  def will_paginate_page
    p = params[:page]
    return 1 if p.blank?

    p.to_s.match?(/\A\d+\z/) ? p.to_i : 1
  end

  def aggregate_kits
    MENU["kits"]
  end

  def all_kits
    group_components = []
    aggregate_kits.each do |kit|
      group_components.push(kit["components"].map do |component|
        {
          name: component["name"],
          parent: component["parent"],
          kit_section: component["kit_section"] || [],
          status: component["status"],
          platforms_status: component["platforms_status"],
          icons_used: component["icons_used"],
          react_rendered: component["react_rendered"],
          enhanced_element_used: component["enhanced_element_used"],
        }
      end)
    end
    group_components.flatten
  end

  def pb_doc_kit_path(kit, *args)
    Playbook.kit_path(kit, "docs", *args)
  end

  def pb_doc_kit_examples(kit, type)
    example_file = pb_doc_kit_path(kit, "example.yml")
    if File.exist?(example_file)
      examples_list = YAML.load_file(example_file)
                          .inject({}) { |item, (k, v)| item[k.to_sym] = v; item }
      examples_list.dig(:examples, type) || []
    else
      []
    end
  end

  def to_url_format(text)
    text.gsub(/[^a-zA-Z0-9]+/, "-").strip.gsub(/\s+/, "-")
  end

  def extract_changelog_data(changelog)
    releases = []

    changelog.split(/^# /).each do |section|
      break if releases.size == 2

      next unless section.strip.length.positive?

      title_match = section.match(/(.+?)\n/)
      next unless title_match

      title = title_match[1].strip

      date_match = section.match(/####? (.+?)\n/)
      date = date_match ? date_match[1].strip : nil

      image_match = section.match(/!\[.+?\]\((.+?)\)/)
      next unless image_match

      image = image_match[1].strip

      description_match = section.match(/!\[.*?\]\(.*?\)\n\n(.*?)\n\n\[.*?\]\(.*?\)/m)
      description = description_match ? description_match[1].strip : nil

      link = to_url_format(title).to_s

      releases << {
        title: title,
        date: date,
        image: image,
        description: description,
        link: link,
      }
    end

    releases
  end

  def paginate_changelog(changelog)
    return [] unless changelog.is_a?(String) && changelog.present?

    releases = []
    lines = changelog.lines
    current_section = []
    current_title = nil

    lines.each do |line|
      if line.start_with?("# ") && line.strip.length > 2
        if current_title && current_section.any?
          releases << {
            content: current_section.join,
          }
        end
        current_title = line.strip[2..]
        current_section = [line]
      else
        current_section << line
      end
    end

    if current_title && current_section.any?
      releases << {
        content: current_section.join,
      }
    end

    releases
  end

  def read_kit_file(*args)
    # For advanced_table sections, read from the parent kit directory
    kit_name = @kit_parent == "advanced_table" ? @kit_parent : @kit
    path = ::Playbook.kit_path(kit_name, "docs", *args)
    path.exist? ? path.read : ""
  end

  def read_kit_sections
    # Read _sections.yml file if it exists
    kit_name = @kit_parent == "advanced_table" ? @kit_parent : @kit
    sections_path = ::Playbook.kit_path(kit_name, "docs", "_sections.yml")

    return nil unless sections_path.exist?

    begin
      sections_data = YAML.load_file(sections_path)
      sections_data&.dig("sections")
    rescue => e
      Rails.logger.error("Error reading sections file: #{e.message}")
      nil
    end
  end

  def read_kit_schema(kit_name)
    return nil unless kit_name.present?

    schema_path = ::Playbook.kit_path(kit_name, "", "kit.schema.json")
    return nil unless schema_path.exist?

    begin
      JSON.parse(schema_path.read)
    rescue => e
      Rails.logger.error("Error reading kit schema: #{e.message}")
      nil
    end
  end

  def read_global_props_schema
    schema_path = Playbook::Engine.root.join("app/pb_kits/playbook/utilities/global-props.schema.json")
    return nil unless File.exist?(schema_path)

    begin
      JSON.parse(File.read(schema_path))
    rescue => e
      Rails.logger.error("Error reading global props schema: #{e.message}")
      nil
    end
  end

  def read_playground_config(kit_name)
    return nil unless kit_name.present?

    config_path = ::Playbook.kit_path(kit_name, "docs", "_playground.json")
    return nil unless config_path.exist?

    begin
      JSON.parse(config_path.read)
    rescue => e
      Rails.logger.error("Error reading playground config: #{e.message}")
      nil
    end
  end

  # application_beta JSON + Rails prerendered examples: ERB under pb_advanced_table/docs expects
  # @table_data (OpenStruct), while the SPA passes plain JSON via @beta_table_* keys.
  def assign_advanced_table_doc_mocks
    return unless @kit.to_s == "advanced_table" || @kit_parent.to_s == "advanced_table"

    @beta_table_data = advanced_table_mock_data_beta if @beta_table_data.nil?
    @beta_table_data_with_id = advanced_table_mock_data_with_id_beta if @beta_table_data_with_id.nil?
    @beta_table_data_no_subrows = advanced_table_mock_data_no_subrows_beta if @beta_table_data_no_subrows.nil?
    @beta_table_data_pagination = advanced_table_pagination_mock_data if @beta_table_data_pagination.nil?
    @beta_table_data_infinite_scroll = advanced_table_infinite_scroll_mock_data if @beta_table_data_infinite_scroll.nil?
    @beta_table_data_inline_loading = advanced_table_mock_data_inline_loading_beta if @beta_table_data_inline_loading.nil?
    @beta_table_data_inline_loading_empty_children = advanced_table_mock_data_inline_loading_empty_children_beta if @beta_table_data_inline_loading_empty_children.nil?

    return unless @type.to_s == "rails"

    @table_data = advanced_table_mock_data if @table_data.nil?
    @table_data_with_id = advanced_table_mock_data_with_id if @table_data_with_id.nil?
    @table_data_no_subrows = advanced_table_mock_data_no_subrows if @table_data_no_subrows.nil?
    @table_data_pagination = advanced_table_pagination_mock_data if @table_data_pagination.nil?
    @table_data_infinite_scroll = advanced_table_infinite_scroll_mock_data if @table_data_infinite_scroll.nil?
    @table_data_inline_loading = advanced_table_mock_data_inline_loading if @table_data_inline_loading.nil?
    @table_data_inline_loading_empty_children = advanced_table_mock_data_inline_loading_empty_children if @table_data_inline_loading_empty_children.nil?
  end

  def advanced_table_mock_data
    advanced_table_mock_data = File.read(Rails.root.join("app/components/playbook/pb_docs/advanced_table_mock_data.json"))
    JSON.parse(advanced_table_mock_data, object_class: OpenStruct)
  end

  def advanced_table_mock_data_with_id
    advanced_table_mock_data_with_id = File.read(Rails.root.join("app/components/playbook/pb_docs/advanced_table_mock_data_with_id.json"))
    JSON.parse(advanced_table_mock_data_with_id, object_class: OpenStruct)
  end

  def advanced_table_mock_data_no_subrows
    advanced_table_mock_data_no_subrows = File.read(Rails.root.join("app/components/playbook/pb_docs/advanced_table_mock_data_no_subrows.json"))
    JSON.parse(advanced_table_mock_data_no_subrows, object_class: OpenStruct)
  end

  def advanced_table_mock_data_beta
    advanced_table_mock_data = File.read(Rails.root.join("app/components/playbook/pb_docs/advanced_table_mock_data.json"))
    JSON.parse(advanced_table_mock_data)
  end

  def advanced_table_mock_data_with_id_beta
    advanced_table_mock_data_with_id = File.read(Rails.root.join("app/components/playbook/pb_docs/advanced_table_mock_data_with_id.json"))
    JSON.parse(advanced_table_mock_data_with_id)
  end

  def advanced_table_mock_data_no_subrows_beta
    advanced_table_mock_data_no_subrows = File.read(Rails.root.join("app/components/playbook/pb_docs/advanced_table_mock_data_no_subrows.json"))
    JSON.parse(advanced_table_mock_data_no_subrows)
  end

  def advanced_table_pagination_mock_data
    file_path = Playbook::Engine.root.join("app/pb_kits/playbook/pb_advanced_table/docs/advanced_table_pagination_mock_data.json")
    return nil unless File.exist?(file_path)

    JSON.parse(File.read(file_path))
  rescue
    nil
  end

  def advanced_table_infinite_scroll_mock_data
    file_path = Playbook::Engine.root.join("app/pb_kits/playbook/pb_advanced_table/docs/advanced_table_mock_data_infinite_scroll.json")
    return nil unless File.exist?(file_path)

    JSON.parse(File.read(file_path))
  rescue
    nil
  end

  def advanced_table_mock_data_inline_loading
    file_path = Playbook::Engine.root.join("app/pb_kits/playbook/pb_advanced_table/docs/advanced_table_mock_data_inline_loading.json")
    return nil unless File.exist?(file_path)

    JSON.parse(File.read(file_path), object_class: OpenStruct)
  rescue
    nil
  end

  def advanced_table_mock_data_inline_loading_empty_children
    file_path = Playbook::Engine.root.join("app/pb_kits/playbook/pb_advanced_table/docs/advanced_table_mock_data_inline_loading_empty_children.json")
    return nil unless File.exist?(file_path)

    JSON.parse(File.read(file_path), object_class: OpenStruct)
  rescue
    nil
  end

  def advanced_table_mock_data_inline_loading_beta
    file_path = Playbook::Engine.root.join("app/pb_kits/playbook/pb_advanced_table/docs/advanced_table_mock_data_inline_loading.json")
    return nil unless File.exist?(file_path)

    JSON.parse(File.read(file_path))
  rescue
    nil
  end

  def advanced_table_mock_data_inline_loading_empty_children_beta
    file_path = Playbook::Engine.root.join("app/pb_kits/playbook/pb_advanced_table/docs/advanced_table_mock_data_inline_loading_empty_children.json")
    return nil unless File.exist?(file_path)

    JSON.parse(File.read(file_path))
  rescue
    nil
  end

  def page_not_found
    redirect_to root_path, flash: { error: "The kit (#{params[:name]}) was not found." }
  end
end
