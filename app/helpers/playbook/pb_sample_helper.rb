# frozen_string_literal: true

module Playbook
  module PbSampleHelper
    def has_sample_type?(sample, type)
      type ||= "rails"
      if type == "rails"
        Dir["../../views/playbook/samples/#{sample}/*.html.erb"].empty?
      elsif type == "react"
        Dir["../../views/playbook/samples/#{sample}/*.jsx"].empty?
      end
    end

    def pb_sample(sample: "", type: "rails")
      @type = type
      @sample = sample
    end

    def read_file(filename)
      if File.file?(filename)
        File.read(filename)
      else
        ""
      end
    end

    def get_raw_code(sample, type)
      if type == "rails"
        ext = "html.erb"
      elsif type == "react"
        ext = "jsx"
      end
      filename = "#{Playbook::Engine.root}/app/views/playbook/samples/#{sample}/index.#{ext}"
      contents = read_file(filename)
      contents
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
        react_component(sample.titleize.to_s)
      end
    end
  end
end
