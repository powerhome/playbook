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
    template "sample_rails_index.erb", "app/views/playbook/samples/#{@sample_name_underscore}/index.html.erb"
    template "sample_react_index.erb", "app/views/playbook/samples/#{@sample_name_underscore}/index.jsx"
  end

  def update_yaml
    category = options[:category].strip.downcase.underscore
    samples_yaml = YAML.load_file("app/pb_kits/playbook/data/samples.yml")

    if samples_yaml[category]
      samples_yaml[category].push(@sample_name_underscore)
    else
      samples_yaml[category] = [@sample_name_underscore]
    end

    File.open("app/pb_kits/playbook/data/samples.yml", "w") { |out| YAML.dump(samples_yaml, out) }
  end

  def js_imports
    append_to_file("app/pb_kits/playbook/packs/samples.js") do
      "\nimport #{@react_comp} from '../../../views/playbook/samples/#{@sample_name_underscore}/index.jsx'\n"
    end
    append_to_file("app/pb_kits/playbook/packs/samples.js") do
      "WebpackerReact.setup({ #{@react_comp} })\n"
    end
  end
end
