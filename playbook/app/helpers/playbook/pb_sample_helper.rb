# frozen_string_literal: true

module Playbook
  module PbSampleHelper
    def kits_used(sample)
      code = get_raw_code(sample, "rails")
      kits_array = code.scan(%r{pb_rails\("(\w+)(?:"|/)})
      kits_array.uniq
    end

    def get_raw_code(sample, type)
      if type == "rails"
        ext = "html.erb"
      elsif type == "react"
        ext = "jsx"
      end

      sample = Playbook::Engine.root.join("app/views/playbook/samples", sample, "index.#{ext}")
      sample.exist? ? sample.read : ""
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

    def get_category(sample)
      cat = ""
      SAMPLES.each do |category, samples|
        cat = category if samples.include?(sample)
      end
      cat
    end

    def get_samples(kit)
      all_samples = []

      SAMPLES.each do |_category, sample|
        all_samples.push(sample)
      end

      output = ""
      samples_using_kit = []
      all_samples[0].each do |sample|
        filepath = "#{Playbook::Engine.root}/app/views/playbook/samples/#{sample}/index.html.erb"
        output = `grep -l 'pb_rails(\"#{kit}' #{filepath}`
        samples_using_kit.push(sample) if output.chomp == filepath
      end
      samples_using_kit
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
