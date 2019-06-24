class KitGenerator < Rails::Generators::NamedBase
  desc "This generator creates a new Playbook Kit"
  source_root File.expand_path("../templates/", __FILE__)
  class_option :props, type: :array, default: []

  def create_templates
    kit_name = name.strip.downcase
    @kit_name_uppercase = kit_name.upcase
    @kit_name_lowercase = kit_name
    @kit_name_capitalize = kit_name.capitalize
    @kit_name_underscore = kit_name.parameterize.underscore
    @kit_name_pascal = kit_name.titleize.gsub(/\s+/, '')

    # Check if kit already exists =======================
    if File.directory?("app/pb_kits/playbook/pb_#{@kit_name_underscore}")
      say_status  "#{@kit_name_capitalize} kit already exists.",
          "Please choose another name or manually make changes to the existing kit.",
          :red
      return
    else
      # Add kit to Playbook meu ==========================
      open('config/data/menu.yml', 'a') { |f|
        f.puts "  - #{@kit_name_underscore}"
      }
      say_status  "complete",
          "#{@kit_name_capitalize} kit added to Playbook menu.",
          :green

      # Generate SCSS files ==============================
      template "kit_scss.erb", "app/pb_kits/playbook/pb_#{@kit_name_underscore}/_#{@kit_name_underscore}.scss"
      open('app/pb_kits/playbook/packs/site_styles/_kit_style_index.scss', 'a') { |f|
        f.puts "@"+ "import "+ "\'" +"../../pb_#{@kit_name_underscore}/#{@kit_name_underscore}"+"\';"
      }
      say_status  "complete",
          "#{@kit_name_capitalize} kit stylesheet successfully created and imported.",
          :green

      # Ask user if Rails version should be generated ======
      if yes?("Create RAILS #{@kit_name_underscore} kit? (y/N)")
        @rails_kit = true
        template "kit_ruby.erb", "app/pb_kits/playbook/pb_#{@kit_name_underscore}/#{@kit_name_underscore}.rb"
        template "kit_html.erb", "app/pb_kits/playbook/pb_#{@kit_name_underscore}/_#{@kit_name_underscore}.html.erb"
        template "kit_example_rails.erb", "app/pb_kits/playbook/pb_#{@kit_name_underscore}/docs/_#{@kit_name_underscore}_default.html.erb"
        say_status  "complete",
            "#{@kit_name_capitalize} rails kit successfully created.",
            :green
      end

      # Ask user if React version should be generated ======
      if yes?("Create REACT #{@kit_name_pascal} kit? (y/N)")
        @react_kit = true
        template "kit_jsx.erb", "app/pb_kits/playbook/pb_#{@kit_name_underscore}/_#{@kit_name_underscore}.jsx"
        template "kit_example_react.erb", "app/pb_kits/playbook/pb_#{@kit_name_underscore}/docs/_#{@kit_name_underscore}_default.jsx"
        template "kit_js.erb", "app/pb_kits/playbook/pb_#{@kit_name_underscore}/docs/index.js"
        template "kit_pack.erb", "app/pb_kits/playbook/packs/pb_#{@kit_name_underscore}.js"

        # Import in all kits.js  =========================
        append_to_file('app/pb_kits/playbook/packs/kits.js') do
          "import \"./pb_#{@kit_name_underscore}.js\";\n"
        end

        # Import kit examples  ===========================
        append_to_file('app/pb_kits/playbook/packs/examples.js') do
          "\nimport * as #{@kit_name_pascal} from \"pb_#{@kit_name_underscore}/docs\";\nWebpackerReact.setup (#{@kit_name_pascal});\n"
        end

        say_status  "complete",
            "#{@kit_name_capitalize} react kit successfully created.",
            :green
      end

      # Create kit example.yml
      template "kit_example_yml.erb", "app/pb_kits/playbook/pb_#{@kit_name_underscore}/docs/example.yml"
    end
  end
end
