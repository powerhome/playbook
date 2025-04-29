# frozen_string_literal: true

require "will_paginate"
require "playbook/pagination_renderer"
require "will_paginate/array"
require "parser/current"
require "erb"
require "ostruct"

class PagesController < ApplicationController
  include ::ViteRails::TagHelpers
  rescue_from ActionView::MissingTemplate, :with => :page_not_found

  before_action :set_js, only: %i[visual_guidelines]
  before_action :set_kit, only: %i[kit_show_rails kit_show_react kit_show_swift]
  before_action :ensure_kit_type_exists, only: %i[kit_show_rails kit_show_react kit_show_swift]
  before_action :set_category, only: %i[kit_category_show_rails kit_category_show_react kit_category_show_swift]
  before_action :delete_dark_mode_cookie, only: %i[home getting_started visual_guidelines]
  before_action :set_show_sidebar, only: %i[kits kit_category_show_rails kit_category_show_react kit_category_show_swift kit_show_react kit_show_rails kit_show_swift rails_in_react kit_show_demo visual_guidelines home]

  def application_beta
    @kits = MENU["kits"]
    @dark = cookies[:dark_mode] == "true"
    @type = params[:type] || "react"
    @kit = params[:name]
    @params = params
    @examples = pb_doc_kit_examples(@kit, @type)
    @css = view_context.vite_asset_path("site_styles/main.scss")

    # first example from each kit
    examples = @examples.map do |example|
      example_key = example.keys.first.to_s
      source_code = get_source(example_key)
      { example_key: example_key, title: example.values.first, source: source_code }
    end

    respond_to do |format|
      format.html { render layout: "application_beta", inline: "" }
      format.json { render json: { kits: @kits, dark: @dark, type: @type, examples: examples, kit: @kit, params: @params, css: @css } }
    end
  end

  def disable_dark_mode
    cookies[:dark_mode] = {
      value: "false",
    }
    redirect_back(fallback_location: root_path)
  end

  def enable_dark_mode
    cookies[:dark_mode] = {
      value: "true",
    }
    redirect_back(fallback_location: root_path)
  end

  def home
    @data = Playbook::Engine.root.join("CHANGELOG.md").read
    @structured_data = extract_changelog_data(@data)
  end

  def changelog_web
    @data = Playbook::Engine.root.join("CHANGELOG.md").read
    @page_title = "What's New"
    @page = "changelog_web"
    @show_sidebar = true
    @link_extension = "https://github.com/powerhome/playbook/blob/master/playbook/CHANGELOG.md"
    render layout: "changelog"
  end

  def changelog_swift
    @data = Playbook::Engine.root.join("SWIFT_CHANGELOG.md").read
    @page_title = "What's New"
    @page = "changelog_swift"
    @show_sidebar = true
    @link_extension = "https://github.com/powerhome/playbook/blob/master/playbook/SWIFT_CHANGELOG.md"
    render layout: "changelog"
  end

  def changelog_figma
    @data = Playbook::Engine.root.join("FIGMA_CHANGELOG.md").read
    @page_title = "What's New"
    @page = "changelog_figma"
    @show_sidebar = true
    @link_extension = "https://github.com/powerhome/playbook/blob/master/playbook/FIGMA_CHANGELOG.md"
    render layout: "changelog"
  end

  def changelog; end

  def drawer_page
    render "pages/drawer_page", layout: "layouts/fullscreen"
  end

  def icons
    @data = Playbook::Engine.root.join("../playbook-website/app/views/guides/getting_started/icons.md").read
    @page_title = "Icon Integration"
    @show_sidebar = true
    @link_extension = "https://github.com/powerhome/playbook/blob/master/playbook-website/app/views/guides/getting_started/icons.md"
    render layout: "icons"
  end

  def icons_font_awesome
    @data = Playbook::Engine.root.join("../playbook-website/app/views/guides/getting_started/icons/font_awesome.md").read
    @page_title = "Icon Integration"
    @show_sidebar = true
    @link_extension = "https://github.com/powerhome/playbook/blob/master/playbook-website/app/views/guides/getting_started/icons/font_awesome.md"
    render layout: "icons"
  end

  def icons_playbook
    @data = Playbook::Engine.root.join("../playbook-website/app/views/guides/getting_started/icons/playbook.md").read
    @page_title = "Icon Integration"
    @show_sidebar = true
    @link_extension = "https://github.com/powerhome/playbook/blob/master/playbook-website/app/views/guides/getting_started/icons/playbook.md"
    render layout: "icons"
  end

  def icons_custom
    @data = Playbook::Engine.root.join("../playbook-website/app/views/guides/getting_started/icons/custom.md").read
    @page_title = "Icon Integration"
    @show_sidebar = true
    @link_extension = "https://github.com/powerhome/playbook/blob/master/playbook-website/app/views/guides/getting_started/icons/custom.md"
    render layout: "icons"
  end

  def kits
    params[:type] ||= "react"
    @type = params[:type]
    @users = Array.new(9) { Faker::Name.name }.paginate(page: params[:page], per_page: 2)
    @table_data = advanced_table_mock_data
    @table_data_with_id = advanced_table_mock_data_with_id
    @table_data_no_subrows = advanced_table_mock_data_no_subrows
  end

  def kit_category_show_rails
    params[:type] ||= "rails"
    @type = params[:type]
    @users = Array.new(9) { Faker::Name.name }.paginate(page: params[:page], per_page: 2)
    @table_data = advanced_table_mock_data
    @table_data_with_id = advanced_table_mock_data_with_id
    @table_data_no_subrows = advanced_table_mock_data_no_subrows
    render template: "pages/kit_category_show"
  end

  def kit_category_show_react
    render template: "pages/kit_category_show"
  end

  def kit_show_rails
    @type = "rails"
    @users = Array.new(9) { Faker::Name.name }.paginate(page: params[:page], per_page: 2)
    @table_data = advanced_table_mock_data if @kit == "advanced_table"
    @table_data_with_id = advanced_table_mock_data_with_id if @kit == "advanced_table"
    @table_data_no_subrows = advanced_table_mock_data_no_subrows if @kit == "advanced_table"
    render "pages/kit_show"
  end

  def kit_show_react
    @type = "react"
    render template: "pages/kit_show"
  end

  def kit_show_swift
    @type = "swift"
    render "pages/kit_show"
  end

  def kit_collection_show_rails
    @users = Array.new(9) { Faker::Name.name }.paginate(page: params[:page], per_page: 2)
    handle_kit_collection("rails")
  end

  def kit_collection_show_react
    handle_kit_collection("react")
  end

  def kit_playground_rails
    @kit = "avatar"
    @examples = pb_doc_kit_examples(@kit, "rails")
    @raw_example = view_context.pb_rails("docs/kit_example", props: {
                                           kit: @kit,
                                           example_title: @examples.first.values.first,
                                           example_key: @examples.first.keys.first,
                                           type: "rails",
                                           dark: false,
                                           code_only: true,
                                         })
    render "pages/rails_in_react_playground", layout: "layouts/fullscreen"
  end

  def parse_erb(code)
    parsed = code.scan(/<%=?\s*(.*?)\s*%>/m).flatten.join("\n")
    Parser::CurrentRuby.parse(parsed)
  end

  def detect_ruby_methods(root_node)
    stack = [root_node] # Initialize the stack with the root node
    methods = []
    until stack.empty?
      node = stack.pop # Get the current node from the stack

      next unless node.is_a?(Parser::AST::Node)

      # Check if the current node is a `:send` node and has `:system` as the method name
      methods.push(node.children[1]) if node.type == :send
      # Push all child nodes onto the stack
      stack.concat(node.children)
    end
    methods
  end

  def white_list
    %i[<< to_s pb_rails +@ freeze]
  end

  # Define methods outside of the main method
  def add_xstr_node(node, xstr_nodes)
    xstr_nodes << node if node.type == :xstr
  end

  def add_gvar_node(node, gvar_nodes)
    gvar_nodes << node if node.type == :gvar
  end

  def traverse_node_gvar(node, xstr_nodes)
    case node
    when Parser::AST::Node
      add_gvar_node(node, xstr_nodes)
      # Recur for each child node
      node.children.each do |child|
        traverse_node_gvar(child, xstr_nodes)
      end
    end
  end

  def detect_gvar_nodes(ast_node)
    gvar_nodes = []
    # Start traversing from the root node
    traverse_node_gvar(ast_node, gvar_nodes)
    gvar_nodes
  end

  def traverse_node(node, xstr_nodes)
    case node
    when Parser::AST::Node
      add_xstr_node(node, xstr_nodes)
      # Recur for each child node
      node.children.each do |child|
        traverse_node(child, xstr_nodes)
      end
    end
  end

  def detect_xstr_nodes(ast_node)
    xstr_nodes = []
    # Start traversing from the root node
    traverse_node(ast_node, xstr_nodes)
    xstr_nodes
  end

  def is_erb_safe?(code)
    node = parse_erb(code)
    detect_gvar_nodes(parse_erb(erb_code_params)).empty? &&
      detect_ruby_methods(node) - white_list == [] &&
      detect_xstr_nodes(parse_erb(erb_code_params)).empty?
  end

  def unsafe_code
    detect_ruby_methods(parse_erb(erb_code_params)).uniq - white_list
  end

  def playground_response
    if is_erb_safe?(erb_code_params)
      erb_code_params
    elsif unsafe_code.any?
      "The code provided can't be run please remove these methods: #{unsafe_code.join(', ')}"
    else
      "The code provided can't be run. Only use pb_rails."
    end
  end

  def rails_pg_render
    render inline: playground_response
  rescue => e
    render json: { error: e }, status: 400
  end

  def rails_in_react
    @kit = params[:name]
    @examples = pb_doc_kit_examples(@kit, "rails")
    @raw_example = view_context.pb_rails("docs/kit_example", props: {
                                           kit: @kit,
                                           example_title: @examples.first.values.first,
                                           example_key: @examples.first.keys.first,
                                           show_code: false,
                                           type: "rails",
                                           dark: false,
                                           show_raw: true,
                                         })
    render "pages/rails_in_react"
  end

  def rails_raw
    @kit = params[:name]
    example = pb_doc_kit_examples(@kit, "rails").first
    raw_example = view_context.pb_rails("docs/kit_example", props: {
                                          kit: @kit,
                                          example_title: example.values.first,
                                          example_key: example.keys.first,
                                          show_code: false,
                                          type: "rails",
                                          dark: false,
                                          show_raw: true,
                                        })
    render inline: raw_example, layout: false
  end

  # TODO: rename this method once all guidelines are completed
  def visual_guidelines
    kit_examples = {}
    Dir.glob(Rails.root.join("app/views/pages/code_snippets/*.txt")).each do |example_path|
      example_txt = File.read(example_path)
      formatted_example_txt = render_code(example_txt, "react")
      kit_examples[example_path.split("/").last.sub(".txt", "")] = formatted_example_txt
    end
    @kit_examples_json = kit_examples
    render "pages/visual_guidelines"
  end

  def get_source(example)
    read_kit_file("_#{example}.jsx")
  end

  helper_method :get_source

private

  def missing_rails_kit?
    helpers.pb_doc_has_kit_type?(params[:name], "rails") == false
  end

  def missing_react_kit?
    helpers.pb_doc_has_kit_type?(params[:name], "react") == false
  end

  def missing_swift_kit?
    helpers.pb_doc_has_kit_type?(params[:name], "swift") == false
  end

  def aggregate_kits
    MENU["kits"]
  end

  def categories
    aggregate_kits.map { |item| item["category"] }
  end

  def all_kits
    group_components = []
    aggregate_kits.each do |kit|
      group_components.push(kit["components"].map do |component|
        {
          name: component["name"],
          status: component["status"],
          icons_used: component["icons_used"],
          react_rendered: component["react_rendered"],
          enhanced_element_used: component["enhanced_element_used"],
        }
      end)
    end
    group_components.flatten
  end

  def set_js
    @application_js.concat ["visual_guidelines"]
  end

  def set_category
    @category = params[:category]
    if categories.include?(@category) && helpers.category_has_kits?(category_kits: kit_categories, type: params[:type])
      @category_kits = kit_categories
      @kits = params[:name]
    else
      redirect_to root_path, flash: { error: "That kit does not exist" }
    end
  end

  def kit_categories
    @category = params[:category]
    components = aggregate_kits.find { |item| item["category"] == @category }["components"]
    filter_kits_by_status(components, status: "beta").map { |component| component["name"] }
  end

  def filter_kits_by_status(components, status: nil)
    components.reject { |component| status && component["status"] == status }
  end

  def set_kit
    matching_kit = all_kits.find { |kit| kit[:name] == params[:name] }

    if matching_kit
      @kit = matching_kit[:name]
      @kit_status = matching_kit[:status]
      @icons_used = matching_kit[:icons_used]
      @react_rendered = matching_kit[:react_rendered]
      @enhanced_element_used = matching_kit[:enhanced_element_used]
    else
      redirect_to root_path, flash: { error: "That kit does not exist" }
    end
  end

  def set_show_sidebar
    @show_sidebar = true
  end

  def ensure_kit_type_exists
    if action_name === "kit_show_rails"
      redirect_to action: "kit_show_react" if missing_rails_kit? && missing_react_kit? == false
    elsif action_name === "kit_show_react"
      redirect_to action: "kit_show_rails" if missing_react_kit? && missing_rails_kit? == false
      redirect_to action: "kit_show_swift" if missing_react_kit? && missing_rails_kit? && missing_swift_kit? == false
    elsif action_name === "kit_show_swift"
      redirect_to action: "kit_show_react" if missing_swift_kit?
    end
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

  def kit_examples
    pb_doc_kit_examples(params[:name], "rails")
  end

  def erb_code_params
    params.require(:erb_code)
  end

  def read_kit_file(*args)
    path = ::Playbook.kit_path(@kit, "docs", *args)
    path.exist? ? path.read : ""
  end

  def handle_kit_collection(type)
    @kits = params[:names].split("%26")
    @kits_array = @kits.first.split("&")
    params[:name] ||= @kits_array[0]
    @selected_kit = params[:name]
    @variants = params[:variants].present? ? params[:variants].split("&") : []
    @type = type

    render template: "pages/kit_collection", layout: "layouts/fullscreen"
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

  def page_not_found
    redirect_to root_path, flash: { error: "The kit (#{params[:name]}) was not found." }
  end
end
