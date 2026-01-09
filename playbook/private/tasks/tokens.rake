# frozen_string_literal: true

require "json"
require "open3"

namespace :tokens do
  desc "Generate colors.json from SCSS tokens using Sass compiler"
  task :generate_colors do
    scss_source = File.join(__dir__, "../../app/pb_kits/playbook/tokens/exports/_colors.module.scss")
    output_path = File.join(__dir__, "../../lib/playbook/tokens/colors.json")
    load_path = File.join(__dir__, "../../app/pb_kits/playbook")

    puts "Compiling SCSS with Sass..."

    # Compile SCSS using Sass CLI (via yarn/npx)
    # This resolves ALL values: variables, mix(), lighten(), darken(), rgba(), etc.
    playbook_root = File.join(__dir__, "../..")
    css_output, stderr, status = Open3.capture3(
      "yarn", "sass",
      "--load-path=#{load_path}",
      "--no-source-map",
      scss_source,
      chdir: playbook_root
    )

    unless status.success?
      puts "Error compiling SCSS:"
      puts stderr
      exit 1
    end

    puts "Parsing :export block..."

    # Extract the :export block from compiled CSS
    # Format: :export { key: value; key2: value2; }
    export_match = css_output.match(/:export\s*\{([^}]+)\}/m)

    unless export_match
      puts "Error: Could not find :export block in compiled CSS"
      puts "CSS output:"
      puts css_output
      exit 1
    end

    export_content = export_match[1]

    # Parse key-value pairs from the export block
    # Format: "  key: value;" or "  key: #hexvalue;"
    colors = {}
    export_content.scan(/([a-zA-Z_][a-zA-Z0-9_-]*):\s*([^;]+);/).each do |key, value|
      # Clean up the value (trim whitespace)
      clean_value = value.strip

      # Convert key to snake_case symbol-friendly format
      clean_key = key.strip.tr("-", "_")

      colors[clean_key] = clean_value
    end

    if colors.empty?
      puts "Error: No colors extracted from :export block"
      exit 1
    end

    # Ensure output directory exists
    FileUtils.mkdir_p(File.dirname(output_path))

    # Write JSON file (sorted keys for consistent diffs)
    sorted_colors = colors.sort.to_h
    File.write(output_path, JSON.pretty_generate(sorted_colors))

    puts "✓ Generated #{output_path}"
    puts "✓ Exported #{colors.size} color tokens"
    puts ""
    puts "Sample values:"
    %w[royal card_dark hover_light success_secondary data_4].each do |key|
      puts "  #{key}: #{colors[key]}" if colors[key]
    end
  end

  desc "Verify colors.json matches current SCSS (for CI)"
  task :verify_colors do
    json_path = File.join(__dir__, "../../lib/playbook/tokens/colors.json")

    unless File.exist?(json_path)
      puts "Error: colors.json does not exist. Run 'rake tokens:generate_colors' first."
      exit 1
    end

    # Store current JSON
    current_json = File.read(json_path)

    # Regenerate
    Rake::Task["tokens:generate_colors"].invoke

    # Compare
    new_json = File.read(json_path)

    if current_json == new_json
      puts "✓ colors.json is up to date"
    else
      puts "✗ colors.json is out of sync with SCSS!"
      puts "  Run 'rake tokens:generate_colors' and commit the changes."
      # Restore original to not modify working directory
      File.write(json_path, current_json)
      exit 1
    end
  end
end
