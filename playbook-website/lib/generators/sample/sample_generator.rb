# frozen_string_literal: true

require "yaml"

class SampleGenerator < Rails::Generators::NamedBase
  desc "This generator creates a new Full Page Sample"
  source_root File.expand_path("templates", __dir__)
  class_option :category, type: :string, default: "full_page_samples"

  def create_indexes
    sample_name = name.strip.downcase
    @sample_name_underscore = sample_name.parameterize.underscore
    @react_comp = @sample_name_underscore.camelize
    template "sample_rails_index.erb", "app/views/samples/#{@sample_name_underscore}/index.html.erb"
    template "sample_react_index.erb", "app/views/samples/#{@sample_name_underscore}/index.jsx"
  end

  def update_yaml
    category = options[:category].strip.downcase.underscore
    if SAMPLES[category]
      SAMPLES[category].push(@sample_name_underscore)
    else
      SAMPLES[category] = [@sample_name_underscore]
    end

    Rails.root.join("config/samples.yml").open("w") do |samples|
      YAML.dump(SAMPLES, samples)
    end
  end

  def js_imports
    append_to_file(
      "app/javascript/packs/samples.js",
      "import #{@react_comp} from '../../views/samples/#{@sample_name_underscore}/index.jsx'\n",
      after: "// Sample Imports\n"
    )
    append_to_file(
      "app/javascript/packs/samples.js",
      "  #{@react_comp},\n",
      after: "WebpackerReact.setup({\n"
    )
  end
end
