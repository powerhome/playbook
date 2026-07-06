# frozen_string_literal: true

require "json"
require "yaml"

class KitGenerator < Rails::Generators::NamedBase
  desc "This generator creates a new Playbook Kit"
  source_root File.expand_path("templates", __dir__)
  class_option :category, type: :string, default: "", desc: "Adds category name"
  class_option :description, type: :string, default: "", desc: "Adds website description copy"
  class_option :category_description, type: :string, default: "", desc: "Adds description copy when creating a new category"
  class_option :props, type: :array, default: []
  class_option :rails, type: :boolean, default: false, desc: "Creates the boilerplate files for Rails"
  class_option :react, type: :boolean, default: false, desc: "Creates the boilerplate files for React"
  class_option :swift, type: :boolean, default: false, desc: "Creates the boilerplate files for Swift"
  class_option :beta, type: :boolean, default: true, desc: "Adds status flag to determine if kit is in beta"
  class_option :icons_used, type: :boolean, default: false, desc: "Adds flag to determine if kit uses the icon kit"
  class_option :react_rendered, type: :boolean, default: false, desc: "Adds flag to determine if kit is rendered in react"
  class_option :enhanced_element_used, type: :boolean, default: false, desc: "Adds flag to determine if kit uses the enhanced element kit"

  REACT_EXAMPLES_PATH = "app/javascript/playbook-doc.js"
  REACT_INDEX_PATH = "app/javascript/kits.js"
  MENU_PATH = "../playbook-website/config/menu.yml"
  BASE_PROPS = %w[id classname data aria htmlOptions children].freeze
  PLAYGROUND_CHILDREN_KITS = %w[
    badge background body button caption card collapsible detail dialog flex link list message nav overlay pill popover title tooltip
  ].freeze
  PROP_TYPE_ALIASES = {
    "bool" => "boolean",
    "hash" => "object",
    "hashprop" => "object",
    "obj" => "object",
    "integer" => "number",
    "int" => "number",
    "one_of" => "enum",
  }.freeze

  def create_templates
    kit_name = name.strip.downcase
    all_kits = options[:rails] == false && options[:react] == false && options[:swift] == false
    @rails_kit = all_kits ? true : options[:rails]
    @react_kit = all_kits ? true : options[:react]
    @swift_kit = all_kits ? true : options[:swift]
    @kit_status = options[:beta] ? "beta" : "stable"
    @kit_name_underscore = kit_name.parameterize.underscore
    @kit_name_uppercase = @kit_name_underscore.upcase
    @kit_name_lowercase = @kit_name_underscore
    @kit_name_capitalize = @kit_name_underscore.humanize.titleize
    @kit_name_pascal = @kit_name_underscore.camelize
    @kit_description = options[:description].presence || "#{@kit_name_capitalize} component"
    @kit_category = options[:category].to_s.strip
    @kit_category_capitalize = @kit_category.humanize.titleize

    @icons_used = options[:icons_used]
    @react_rendered = options[:react_rendered]
    @enhanced_element_used = options[:enhanced_element_used]

    @custom_props = parse_props(options[:props])
    @kit_props = (BASE_PROPS.map { |prop| parse_prop("#{prop}:string") } + @custom_props)
                 .uniq { |prop| prop[:react_name] }
                 .sort_by { |prop| prop[:react_name] }
    @unique_props = @custom_props.sort_by { |prop| prop[:react_name] }
    @platform_list = platform_list

    full_kit_directory = "app/pb_kits/playbook/pb_#{@kit_name_underscore}"

    # Check if kit already exists =======================
    if File.directory?(full_kit_directory)
      say_status  "#{@kit_name_capitalize} kit already exists.",
                  "Please choose another name or manually make changes to the existing kit.",
                  :red
      nil
    else

      # If category prop given, validate against existing categories in Playbook menu =========
      if @kit_category.nil? || @kit_category.empty?
        say_status  "No category given.",
                    "Proceeding to generate files.",
                    :yellow
      elsif menu_category?(@kit_category)
        say_status  "#{@kit_category_capitalize} matches an existing category.",
                    "Proceeding to generate files.",
                    :green
      else
        say_status  "#{@kit_category_capitalize} does not match an existing category.",
                    "Proceeding to generate files.",
                    :yellow
      end

      # Generate SCSS files ==============================
      unless platforms == "swift_only"
        template "kit_scss.erb", "#{full_kit_directory}/_#{@kit_name_underscore}.scss"
        add_scss_import

        say_status  "complete",
                    "#{@kit_name_capitalize} kit stylesheet successfully created and imported.",
                    :green
      end

      # Code for Rails kit
      if @rails_kit
        template "kit_ruby.erb", "#{full_kit_directory}/#{@kit_name_underscore}.rb"
        template "kit_html.erb", "#{full_kit_directory}/#{@kit_name_underscore}.html.erb"
        template "kit_example_rails.erb", "#{full_kit_directory}/docs/_#{@kit_name_underscore}_default.html.erb"
        template "kit_ruby_spec.erb", "spec/pb_kits/playbook/kits/#{@kit_name_underscore}_spec.rb"
        say_status  "complete",
                    "#{@kit_name_capitalize} rails kit successfully created.",
                    :green
      end

      # Code for React kit
      if @react_kit
        template "kit_jsx.erb", "#{full_kit_directory}/_#{@kit_name_underscore}.tsx"
        template "kit_jsx_test.erb", "#{full_kit_directory}/#{@kit_name_underscore}.test.jsx"
        template "kit_example_react.erb", "#{full_kit_directory}/docs/_#{@kit_name_underscore}_default.jsx"
        template "kit_js.erb", "#{full_kit_directory}/docs/index.js"

        react_imports_page(
          path: REACT_EXAMPLES_PATH.to_s,
          import_statement: "import * as #{@kit_name_pascal} from '../pb_kits/playbook/pb_#{@kit_name_underscore}/docs'\n",
          registry_statement: "  ...#{@kit_name_pascal},\n",
          import_area_indicator: "// KIT EXAMPLES\n"
        )

        react_export_page(
          path: REACT_INDEX_PATH.to_s,
          export_statement: "export { default as #{@kit_name_pascal} } from '../pb_kits/playbook/pb_#{@kit_name_underscore}/_#{@kit_name_underscore}'\n",
          start_comment: "// vvv React Component JSX Imports from the React Kits vvv\n",
          end_comment: "// ^^^ React Component JSX Imports from the React Kits ^^^\n"
        )

        say_status  "complete",
                    "#{@kit_name_capitalize} react kit successfully created.",
                    :green
      end

      # Code for Swift kit
      template "kit_example_swift.erb", "#{full_kit_directory}/docs/_#{@kit_name_underscore}_default_swift.md" if @swift_kit

      # Create kit example.yml
      template "kit_example_yml.erb", "#{full_kit_directory}/docs/example.yml"
      create_file "#{full_kit_directory}/docs/_description.md", "#{@kit_description}\n"
      create_file "#{full_kit_directory}/kit.schema.json", "#{JSON.pretty_generate(kit_schema)}\n" unless platforms == "swift_only"
      create_file "#{full_kit_directory}/docs/_playground.json", "#{JSON.pretty_generate(playground_config)}\n" if @react_kit

      run "rubocop -A #{full_kit_directory}", abort_on_failure: false if @rails_kit

      add_kit_to_menu
    end
  end

private

  def platforms
    if @react_kit && @rails_kit && @swift_kit
      "all"
    elsif @react_kit && @rails_kit
      "web"
    elsif @react_kit && @swift_kit
      "react_swift"
    elsif @rails_kit && @swift_kit
      "rails_swift"
    elsif @react_kit
      "react_only"
    elsif @rails_kit
      "rails_only"
    elsif @swift_kit
      "swift_only"
    end
  end

  def platform_list
    list = []
    list << "rails" if @rails_kit
    list << "react" if @react_kit
    list << "swift" if @swift_kit
    list
  end

  def parse_props(props)
    Array(props).map { |raw_prop| parse_prop(raw_prop) }
                .reject { |prop| BASE_PROPS.include?(prop[:raw_name]) || BASE_PROPS.include?(prop[:react_name]) }
  end

  def parse_prop(raw_prop)
    raw_name, raw_type, raw_values = raw_prop.to_s.split(":", 3)
    raw_name = raw_name.to_s.strip
    type = normalize_type(raw_type)
    values = raw_values.to_s.split(/[|,]/).map(&:strip).reject(&:empty?)
    values = %w[option_1 option_2] if type == "enum" && values.empty?

    {
      raw_name: raw_name,
      ruby_name: raw_name.underscore,
      react_name: raw_name == "classname" ? "className" : raw_name.camelize(:lower),
      type: type,
      values: values,
    }
  end

  def normalize_type(raw_type)
    type = raw_type.to_s.strip.downcase
    type = "string" if type.empty?
    PROP_TYPE_ALIASES.fetch(type, type)
  end

  def add_scss_import
    scss_file = "app/entrypoints/playbook.scss"
    import_line = "@import 'kits/pb_#{@kit_name_underscore}/#{@kit_name_underscore}';\n"
    lines = File.exist?(scss_file) ? File.readlines(scss_file) : []
    return if lines.include?(import_line)

    lines << import_line
    utilities_lines = lines.select { |line| line.include?("utilities") }
    remaining_lines = lines.reject { |line| line.include?("utilities") }.uniq.sort
    File.write(scss_file, (remaining_lines + utilities_lines).join)
  end

  def menu_category?(category)
    yaml_data = load_yaml_file(MENU_PATH)
    yaml_data["kits"].is_a?(Array) && yaml_data["kits"].any? { |kit| kit["category"] == category }
  end

  def load_yaml_file(path)
    YAML.load_file(path, aliases: true)
  rescue ArgumentError
    YAML.load_file(path)
  end

  def add_kit_to_menu
    category = @kit_category.presence || @kit_name_underscore
    menu = File.read(MENU_PATH)
    block = menu_component_block

    updated_menu = if menu_category?(category)
                     insert_component_into_category(menu, category, block)
                   else
                     "#{menu.chomp}\n#{menu_category_block(category, block)}"
                   end

    File.write(MENU_PATH, updated_menu)

    say_status  "complete",
                "#{@kit_name_capitalize} kit added to Playbook menu under #{category.humanize.titleize}.",
                :green
  end

  def insert_component_into_category(menu, category, block)
    lines = menu.lines
    category_index = lines.index { |line| line.match?(/\A- category: #{Regexp.escape(category)}\s*\z/) }
    return "#{menu.chomp}\n#{menu_category_block(category, block)}" unless category_index

    next_category_index = lines[(category_index + 1)..]&.index { |line| line.start_with?("- category: ") }
    insert_index = next_category_index ? category_index + 1 + next_category_index : lines.length

    lines.insert(insert_index, block)
    lines.join
  end

  def menu_category_block(category, component_block)
    description = options[:category_description].presence || "#{category.humanize.titleize} components."
    [
      "- category: #{category}",
      "  description: #{description.to_json}",
      "  components:",
      component_block.chomp,
      "",
    ].join("\n")
  end

  def menu_component_block
    [
      "  - name: #{@kit_name_underscore}",
      "    platforms:",
      *@platform_list.map { |platform| "    - #{platform}" },
      "    description: #{@kit_description.to_json}",
      "    status: #{@kit_status}",
      "    icons_used: #{@icons_used}",
      "    react_rendered: #{@react_rendered}",
      "    enhanced_element_used: #{@enhanced_element_used}",
      "",
    ].join("\n")
  end

  def kit_schema
    schema = {
      "$schema" => "https://playbook.powerapp.cloud/schemas/kit-schema.json",
      "name" => @kit_name_pascal,
      "description" => @kit_description,
      "platforms" => @platform_list.reject { |platform| platform == "swift" },
      "props" => schema_props,
      "globalProps" => true,
      "usage" => schema_usage,
    }
    schema["platforms"] = @platform_list if schema["platforms"].empty?
    schema
  end

  def schema_props
    @unique_props.to_h do |prop|
      schema_prop = {
        "type" => schema_type(prop),
        "platforms" => @platform_list.reject { |platform| platform == "swift" },
      }
      schema_prop["values"] = prop[:values] if prop[:type] == "enum"
      default = default_for(prop)
      schema_prop["default"] = default unless default.nil?
      [prop[:react_name], schema_prop]
    end
  end

  def schema_type(prop)
    case prop[:type]
    when "boolean" then "boolean"
    when "number", "numeric" then "number"
    when "array" then "array"
    when "object" then "GenericObject"
    when "date" then "Date"
    when "function" then "function"
    when "enum" then "enum"
    else "string"
    end
  end

  def schema_usage
    usage = {}
    if @react_kit
      usage["react"] = {
        "import" => "import { #{@kit_name_pascal} } from 'playbook-ui'",
        "example" => "<#{@kit_name_pascal}#{react_usage_props} />",
      }
    end
    if @rails_kit
      usage["rails"] = {
        "import" => nil,
        "example" => "<%= pb_rails(\"#{@kit_name_underscore}\"#{rails_usage_props}) %>",
      }
    end
    usage
  end

  def react_usage_props
    example_props = @unique_props.select { |prop| prop[:type] == "enum" }.first(2)
    return "" if example_props.empty?

    " #{example_props.map { |prop| "#{prop[:react_name]}=\"#{prop[:values].first}\"" }.join(' ')}"
  end

  def rails_usage_props
    example_props = @unique_props.select { |prop| prop[:type] == "enum" }.first(2)
    return "" if example_props.empty?

    props = example_props.map { |prop| "#{prop[:ruby_name]}: \"#{prop[:values].first}\"" }.join(", ")
    ", props: { #{props} }"
  end

  def playground_config
    config = {
      "template" => playground_template,
      "propTargets" => {},
      "defaults" => @unique_props.filter_map do |prop|
        default = default_for(prop)
        [prop[:react_name], default] unless default.nil?
      end.to_h,
    }

    if playground_has_children?
      config["children"] = {
        "editable" => true,
        "default" => "#{@kit_name_capitalize} content",
      }
    end

    config["groups"] = [{ "name" => "Props", "props" => @unique_props.map { |prop| prop[:react_name] } }] if @unique_props.any?
    default_preset = { "name" => "Default", "props" => {} }
    default_preset["children"] = "#{@kit_name_capitalize} content" if playground_has_children?
    config["presets"] = [default_preset]
    config["conditionals"] = {}
    config["hints"] = {}
    config
  end

  def playground_template
    if playground_has_children?
      "<#{@kit_name_pascal}{{props}}>{{children}}</#{@kit_name_pascal}>"
    else
      "<#{@kit_name_pascal}{{props}} />"
    end
  end

  def playground_has_children?
    @react_kit || PLAYGROUND_CHILDREN_KITS.include?(@kit_name_underscore) || @unique_props.any? { |prop| prop[:react_name] == "children" }
  end

  def default_for(prop)
    case prop[:type]
    when "boolean" then false
    when "enum" then prop[:values].first
    end
  end

  def react_imports_page(path:, import_statement:, registry_statement:, import_area_indicator:)
    re_array = File.readlines(path)

    example_components = re_array.select { |a| a =~ /import\s\*\sas/ }
    example_components << import_statement
    example_components.sort! { |a, b| a.split("* as ")[1] <=> b.split("* as ")[1] }

    registry_components = re_array.select { |a| a =~ /\.\.\./ }
    registry_components << registry_statement
    registry_components.sort!

    sorted_file_array = re_array[0..(re_array.index(import_area_indicator) + 1)]
    sorted_file_array += example_components
    sorted_file_array << "\n"
    sorted_file_array << "ComponentRegistry.registerComponents({\n"
    sorted_file_array += registry_components
    sorted_file_array << "})\n"

    File.open(path, "w+") { |f| f.write(sorted_file_array.join) }
  end

  def react_export_page(path:, export_statement:, start_comment:, end_comment:)
    file_array = File.readlines(path)
    start = file_array.index(start_comment)
    finish = file_array.index(end_comment)
    components = file_array[(start + 1)..(finish - 1)]

    components << export_statement
    components.sort!
    file_array = file_array[0..start] + components + file_array[finish..]

    File.open(path, "w+") { |f| f.write(file_array.join) }
  end
end
