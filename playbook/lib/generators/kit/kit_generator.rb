# frozen_string_literal: true

class KitGenerator < Rails::Generators::NamedBase
  desc "This generator creates a new Playbook Kit"
  source_root File.expand_path("templates", __dir__)
  class_option :props, type: :array, default: []

  def create_templates
    kit_name = name.strip.downcase
    @kit_name_uppercase = kit_name.upcase
    @kit_name_lowercase = kit_name
    @kit_name_capitalize = kit_name.capitalize
    @kit_name_underscore = kit_name.parameterize.underscore
    @kit_name_pascal = kit_name.titleize.gsub(/\s+/, "")

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
      return
    else
      # Add kit to Playbook menu ==========================
      open("app/pb_kits/playbook/data/menu.yml", "a") do |f|
        f.puts "  - #{@kit_name_underscore}"
      end
      say_status  "complete",
                  "#{@kit_name_capitalize} kit added to Playbook menu.",
                  :green

      # Generate SCSS files ==============================
      template "kit_scss.erb", "#{full_kit_directory}/_#{@kit_name_underscore}.scss"
      open("app/pb_kits/playbook/_playbook.scss", "a") do |f|
        f.puts "\n@" + "import " + "\'" + "pb_#{@kit_name_underscore}/#{@kit_name_underscore}" + "\';"
      end
      say_status  "complete",
                  "#{@kit_name_capitalize} kit stylesheet successfully created and imported.",
                  :green

      # Ask user if Rails version should be generated ======
      if yes?("Create RAILS #{@kit_name_underscore} kit? (y/N)")
        @rails_kit = true
        template "kit_ruby.erb", "#{full_kit_directory}/#{@kit_name_underscore}.rb"
        template "kit_html.erb", "#{full_kit_directory}/_#{@kit_name_underscore}.html.erb"
        template "kit_example_rails.erb", "#{full_kit_directory}/docs/_#{@kit_name_underscore}_default.html.erb"
        template "kit_ruby_spec.erb", "spec/pb_kits/playbook/kits/#{@kit_name_underscore}_spec.rb"
        say_status  "complete",
                    "#{@kit_name_capitalize} rails kit successfully created.",
                    :green
      end

      # Ask user if React version should be generated ======
      if yes?("Create REACT #{@kit_name_pascal} kit? (y/N)")
        @react_kit = true
        template "kit_jsx.erb", "#{full_kit_directory}/_#{@kit_name_underscore}.jsx"
        template "kit_jsx_test.erb", "#{full_kit_directory}/#{@kit_name_underscore}.test.jsx"
        template "kit_example_react.erb", "#{full_kit_directory}/docs/_#{@kit_name_underscore}_default.jsx"
        template "kit_js.erb", "#{full_kit_directory}/docs/index.js"

        re_array = File.readlines("app/pb_kits/playbook/packs/react-examples.js")

        example_components = re_array.select { |a| a =~ /import\s\*\sas/ }
        example_components << "import * as #{@kit_name_pascal} from 'pb_#{@kit_name_underscore}/docs'\n"
        example_components.sort! { |a, b| a.split("* as ")[1] <=> b.split("* as ")[1] }

        webpack_components = re_array.select { |a| a =~ /\.\.\./ }
        webpack_components << "  ...#{@kit_name_pascal},\n"
        webpack_components.sort!

        sorted_file_array = re_array[0..(re_array.index("// KIT EXAMPLES\n") + 1)]
        sorted_file_array += example_components
        sorted_file_array << "\n"
        sorted_file_array << "WebpackerReact.setup({\n"
        sorted_file_array += webpack_components
        sorted_file_array << "})\n"

        File.open("app/pb_kits/playbook/packs/react-examples.js", "w+") { |f| f.write(sorted_file_array.join) }

        file_array = File.readlines("app/pb_kits/playbook/index.js")
        start = file_array.index("// vvv React Component JSX Imports from the React Kits vvv\n")
        finish = file_array.index("// ^^^ React Component JSX Imports from the React Kits ^^^\n")
        components = file_array[(start + 1)..(finish - 1)]

        components << "export #{@kit_name_pascal} from './pb_#{@kit_name_underscore}/_#{@kit_name_underscore}.jsx'\n"
        components.sort!
        file_array = file_array[0..start] + components + file_array[finish..-1]

        File.open("app/pb_kits/playbook/index.js", "w+") { |f| f.write(file_array.join) }

        say_status  "complete",
                    "#{@kit_name_capitalize} react kit successfully created.",
                    :green
      end

      # Create kit example.yml
      template "kit_example_yml.erb", "#{full_kit_directory}/docs/example.yml"

      `rubocop --safe-auto-correct #{full_kit_directory}`
    end
  end
end