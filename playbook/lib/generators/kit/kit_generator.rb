# frozen_string_literal: true

require "yaml"

# rubocop:disable Style/StringConcatenation
class KitGenerator < Rails::Generators::NamedBase
  desc "This generator creates a new Playbook Kit"
  source_root File.expand_path("templates", __dir__)
  class_option :category, type: :string, default: "", desc: "Adds category name"
  class_option :props, type: :array, default: []
  class_option :rails, type: :boolean, default: false, desc: "Creates the boilerplate files for Rails"
  class_option :react, type: :boolean, default: false, desc: "Creates the boilerplate files for React"
  class_option :swift, type: :boolean, default: false, desc: "Creates the boilerplate files for Swift"
  class_option :beta, type: :boolean, default: true, desc: "Adds status flag to determine if kit is in beta"
  class_option :icons_used, type: :boolean, default: false, desc: "Adds flag to determine if kit uses the icon kit"
  class_option :react_rendered, type: :boolean, default: false, desc: "Adds flag to determine if kit is rendered in react"
  class_option :enhanced_element_used, type: :boolean, default: false, desc: "Adds flag to determine if kit uses the enhanced element kit"

  REACT_EXAMPLES_PATH = "app/entrypoints/playbook-doc.js"
  REACT_INDEX_PATH = "app/javascript/kits.js"

  def create_templates
    kit_name = name.strip.downcase
    all_kits = options[:rails] == false && options[:react] == false && options[:swift] == false
    @rails_kit = all_kits ? true : options[:rails]
    @react_kit = all_kits ? true : options[:react]
    @swift_kit = all_kits ? true : options[:swift]
    @kit_status = options[:beta] ? "beta" : "stable"
    @kit_name_uppercase = kit_name.upcase
    @kit_name_lowercase = kit_name
    @kit_name_capitalize = kit_name.capitalize
    @kit_name_underscore = kit_name.parameterize.underscore
    @kit_name_pascal = kit_name.titleize.gsub(/\s+/, "")
    @kit_category = options[:category]
    @kit_category_capitalize = options[:category].capitalize

    @icons_used = options[:icons_used]
    @react_rendered = options[:react_rendered]
    @enhanced_element_used = options[:enhanced_element_used]

    kit_props = options[:props].concat(%w[id:string classname:string data:object aria:object])
    @kit_props = kit_props.map { |hash| [hash.partition(":").first, hash.partition(":").last] }.to_h
    @kit_props = @kit_props.sort.to_h
    @unique_props = @kit_props.symbolize_keys.without(:id, :classname, :data, :aria)

    @kit_class_init = []
    @kit_props.each do |key, _val|
      @kit_class_init.push("#{key.parameterize.underscore}: default_configuration".to_sym)
    end

    @kit_class_val = []
    @kit_props.each do |key, _value|
      @kit_class_val.push("self.configured_#{key.parameterize.underscore} = #{key.parameterize.underscore}")
    end

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
      else
        file_path = "../playbook-website/config/menu.yml"
        yaml_data = YAML.load_file(file_path, aliases: true)
        existing_categories = yaml_data["kits"].map { |kit| kit["category"] } if yaml_data["kits"].is_a?(Array)
        if existing_categories && !existing_categories.include?(options[:category])
          say_status  "#{@kit_category_capitalize} does not match an existing category.",
                      "Please choose another category or manually sort without using the category flag.",
                      :red
          exit 1
        else
          say_status  "#{@kit_category_capitalize} matches an existing category.",
                      "Proceeding to generate files.",
                      :green
        end
      end

      # Generate SCSS files ==============================
      unless platforms == "swift_only"
        template "kit_scss.erb", "#{full_kit_directory}/_#{@kit_name_underscore}.scss"
        open("app/entrypoints/playbook.scss", "a") do |f|
          f.puts "\n@" + "import " + "\'" + "kits/pb_#{@kit_name_underscore}/#{@kit_name_underscore}" + "\';"
        end
        scss_file = "app/entrypoints/playbook.scss"

        # Sort kit names alphabetically
        lines = File.readlines(scss_file)
        utilities_lines = lines.select { |line| line.include?("utilities") }
        remaining_lines = lines.reject { |line| line.include?("utilities") }.sort
        sorted_lines = remaining_lines + utilities_lines
        File.open(scss_file, "w") { |f| f.puts sorted_lines.join }

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
          import_statement: "import * as #{@kit_name_pascal} from 'kits/pb_#{@kit_name_underscore}/docs'\n",
          registry_statement: "  ...#{@kit_name_pascal},\n",
          import_area_indicator: "// KIT EXAMPLES\n"
        )

        react_export_page(
          path: REACT_INDEX_PATH.to_s,
          export_statement: "export { default as #{@kit_name_pascal}} from '../pb_kits/playbook/pb_#{@kit_name_underscore}/_#{@kit_name_underscore}'\n",
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

      `rubocop --safe-auto-correct #{full_kit_directory}`

      # Add kit with category given to Playbook menu (sort to category section) =============
      if !@kit_category.nil? && !@kit_category.empty?
        file_path = "../playbook-website/config/menu.yml"
        yaml_data = YAML.load_file(file_path, aliases: true)
        yaml_data["kits"].each do |kit|
          next unless kit["category"] == @kit_category

          new_kit = {
            "name" => @kit_name_underscore,
            "platforms" => platforms,
            "status" => @kit_status,
            "icons_used" => @icons_used,
            "react_rendered" => @react_rendered,
            "enhanced_element_used" => @enhanced_element_used,
          }
          kit["components"] << new_kit
          break
        end

        File.open(file_path, "w") do |f|
          f.write(yaml_data.to_yaml)
        end

        say_status  "complete",
                    "#{@kit_name_capitalize} kit added to Playbook menu under #{@kit_category_capitalize}.",
                    :green
      else
        # Add kit without category given to Playbook menu (append to end) ====================
        open("../playbook-website/config/menu.yml", "a") do |f|
          f.puts "- category: #{@kit_name_underscore}"
          f.puts "  components:"
          f.puts "    - name: #{@kit_name_underscore}"
          f.puts "      platforms: #{platforms}"
          f.puts "      status: #{@kit_status}"
          f.puts "      icons_used: #{@icons_used}"
          f.puts "      react_rendered: #{@react_rendered}"
          f.puts "      enhanced_element_used: #{@enhanced_element_used}"
        end

        say_status  "complete",
                    "#{@kit_name_capitalize} kit added to Playbook menu.",
                    :green
      end
    end
  end

  # rubocop:enable Style/StringConcatenation
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
