# frozen_string_literal: true

require "yaml"

class SampleGenerator < Rails::Generators::NamedBase
  desc "This generator creates a new Full Page Sample"

  def create_indexes
    sample_name = name.strip.downcase
    @sample_name_underscore = sample_name.parameterize.underscore
    create_file "app/views/playbook/samples/#{@sample_name_underscore}/index.html.erb"
    create_file "app/views/playbook/samples/#{@sample_name_underscore}/index.jsx"
  end

  def update_yaml
    samples_yaml = YAML.load_file("app/pb_kits/playbook/data/samples.yml")
    samples_yaml["samples"].push(@sample_name_underscore)
    File.open("app/pb_kits/playbook/data/samples.yml", "w") { |out| YAML.dump(samples_yaml, out) }
  end
end
