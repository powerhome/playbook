# frozen_string_literal: true

require "yaml"
require "redcarpet"
require "rouge"
require "will_paginate"
require "playbook/pagination_renderer"
require "will_paginate/array" # Needed to show a fake pagination example

require_relative "application_controller"

class PagesController < ApplicationController
  before_action :set_js, only: %i[visual_guidelines]
  before_action :set_kit, only: %i[kit_show_rails kit_show_react kit_show_swift]
  before_action :ensure_kit_type_exists, only: %i[kit_show_rails kit_show_react kit_show_swift]
  before_action :set_category, only: %i[kit_category_show_rails kit_category_show_react]
  before_action :delete_dark_mode_cookie, only: %i[home getting_started visual_guidelines]

  include Playbook::PbDocHelper
  include Playbook::PbKitHelper

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

  def getting_started
    render "pages/getting_started/index"
  end

  def getting_started_rails
    @rails_getting_started = Rails.root.join("app/views/pages/getting_started_partials/_rails_getting_started.md").read
    render "pages/getting_started/rails"
  end

  def getting_started_react
    @react_getting_started = Rails.root.join("app/views/pages/getting_started_partials/_react_getting_started.md").read
    render "pages/getting_started/react"
  end

  def getting_started_rails_react
    @rails_react_getting_started = Rails.root.join("app/views/pages/getting_started_partials/_rails_react_getting_started.md").read
    render "pages/getting_started/rails_react"
  end

  def getting_started_html_css
    @html_css_getting_started = Rails.root.join("app/views/pages/getting_started_partials/_html_css_getting_started.md").read
    render "pages/getting_started/html"
  end

  def changelog
    @data = Playbook::Engine.root.join("CHANGELOG.md").read
  end

  def home; end

  def kits
    params[:type] ||= "react"
    @type = params[:type]
    @users = Array.new(9) { Faker::Name.name }.paginate(page: params[:page], per_page: 2)
    render layout: "layouts/kits"
  end

  def all_kit_examples
    params[:type] ||= "react"
    @type = params[:type]
    render layout: "layouts/kits"
  end

  def kit_category_show_rails
    params[:type] ||= "rails"
    @type = params[:type]
    render template: "pages/kit_category_show", layout: "layouts/kits"
  end

  def kit_category_show_react
    render template: "pages/kit_category_show", layout: "layouts/kits"
  end

  def kit_show_rails
    @type = "rails"
    @users = Array.new(9) { Faker::Name.name }.paginate(page: params[:page], per_page: 2)
    render "pages/kit_show", layout: "layouts/kits"
  end

  def kit_show_react
    @type = "react"
    render template: "pages/kit_show", layout: "layouts/kits"
  end

  def kit_show_swift
    @type = "swift"
    render template: "pages/kit_show", layout: "layouts/kits"
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

  def rails_pg_render
    render inline: erb_code_params
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
    render "pages/rails_in_react", layout: "layouts/kits"
  end

  def kit_show_demo
    @kit = params[:name]
    @examples = kit_examples
    render "pages/kit_show_demo", layout: "layouts/kits"
  end

  def kit_show_new
    @kit = params[:name]
    @examples = kit_examples
    render "pages/kit_show_new", layout: "layouts/kits"
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
    formatter = Rouge::Formatters::HTML.new
    lexer = Rouge::Lexer.find("react")
    kit_examples = {}
    Dir.glob(Rails.root.join("app/views/pages/code_snippets/*.txt")).each do |example_path|
      example_txt = File.read(example_path)

      formatted_example_txt = formatter.format(lexer.lex(example_txt))
      kit_examples[example_path.split("/").last.sub(".txt", "")] = formatted_example_txt
    end
    @kit_examples_json = kit_examples
    render "pages/visual_guidelines", layout: "layouts/visual_guidelines"
  end

  def get_source(example)
    read_kit_file("_#{example}.jsx")
  end

  helper_method :get_source

private

  def set_js
    @application_js.concat ["visual_guidelines"]
  end

  def set_category
    categories = MENU["kits"].map { |link| link.first.first if link.is_a?(Hash) }.compact
    @category = params[:name]
    if categories.flatten.include?(@category)
      @category_kits = MENU["kits"].map { |link| link.first.last if link.is_a?(Hash) && link.first.first == @category }.compact.flatten
      @kits = params[:name]
    else
      redirect_to root_path, flash: { error: "That kit does not exist" }
    end
  end

  def set_kit
    menu = MENU["kits"].map { |link| link.is_a?(Hash) ? link.first.last : link }
    if menu.flatten.include?(params[:name])
      @kit = params[:name]
    else
      redirect_to root_path, flash: { error: "That kit does not exist" }
    end
  end

  def ensure_kit_type_exists
    # TODO: unsure why we cannot simply use the helpers that are included in ApplicationController - fix this
    is_rails_kit = action_name == "kit_show_rails"
    files = is_rails_kit ? File.join("**", "*.erb") : File.join("**", "*.jsx")
    kit_files = Dir.glob(files, base: "#{Playbook::Engine.root}/app/pb_kits/playbook/pb_#{@kit}/docs").present?
    redirect_to action: action_name unless kit_files.present?
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
end
