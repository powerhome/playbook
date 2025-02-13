# frozen_string_literal: true

module SampleHelper
  def kits_used(sample)
    code = get_raw_code(sample, "rails")
    kits_array = code.scan(%r{pb_rails\("(\w+)(?:"|/)})
    kits_array.uniq
  end

  def get_raw_code(sample, type)
    case type
    when "rails"
      ext = "html.erb"
    when "react"
      ext = "jsx"
    end

    sample = Rails.root.join("app/views/samples", sample, "index.#{ext}")
    sample.exist? ? sample.read : ""
  end

  def get_sample_code_content(sample, type, start_code, end_code)
    case type
    when "rails"
      rouge_type = "erb"
    when "react"
      rouge_type = "react"
    end
    code = get_raw_code(sample, type)
    raw render_code(code, rouge_type, start_code, end_code)
  end

  def get_sample_code(sample, type, start_code, end_code)
    case type
    when "rails"
      rouge_type = "erb"
    when "react"
      rouge_type = "react"
    end
    code = get_raw_code(sample, type)
    raw render_code_with_markers(code, rouge_type, start_code, end_code)
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
      filepath = "#{Rails.root}/app/views/samples/#{sample}/index.html.erb"
      output = `grep -l 'pb_rails(\"#{kit}' #{filepath}`
      samples_using_kit.push(sample) if output.chomp == filepath
    end
    samples_using_kit
  end

  def render_sample_ui(sample, type)
    case type
    when "rails"
      render template: "samples/#{sample}/index"
    when "react"
      react_component(sample.titleize.delete(" ").to_s)
    end
  end
end
