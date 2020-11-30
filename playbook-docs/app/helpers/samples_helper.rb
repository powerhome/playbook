# frozen_string_literal: true

module SamplesHelper
  def get_raw_code(sample, type)
    sample_source_path(sample, type).read
  end

  def get_sample_code_content(sample, type)
    file_path = sample_source_path(sample, type)
    render file: file_path, language: File.extname(file_path)[1..-1]
  end

  def render_sample_ui(sample, type)
    if type == "rails"
      render file: sample_source_path(sample, type)
    elsif type == "react"
      react_component(sample.titleize.delete(" ").to_s)
    end
  end

  private

  def sample_source_path(sample, type)
    ext = type.eql?("rails") ? "html.erb" : "jsx"
    Rails.root.join("app/samples/#{sample}/index.#{ext}")
  end
end
