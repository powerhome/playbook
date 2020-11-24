# frozen_string_literal: true

module Playbook
  module PbSampleHelper
    def get_raw_code(sample, type)
      if type == "rails"
        ext = "html.erb"
      elsif type == "react"
        ext = "jsx"
      end

      read_source_file "app/views/playbook/samples", sample, "index.#{ext}"
    end

    def get_sample_code_content(sample, type)
      if type == "rails"
        rouge_type = "erb"
      elsif type == "react"
        rouge_type = "react"
      end
      code = get_raw_code(sample, type)
      raw rouge(code, rouge_type)
    end

    def render_sample_ui(sample, type)
      if type == "rails"
        render template: "playbook/samples/#{sample}/index.html.erb"
      elsif type == "react"
        react_component(sample.titleize.delete(" ").to_s)
      end
    end
  end
end
