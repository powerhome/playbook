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

    def pb_sample(sample: "", type: "rails", show_code: true)
      @type = type
      # @sample_examples = get_sample_examples(sample, type)
      # @show_code = show_code
      # render partial: "config/sample_example"
    end

    def pb_samples(type: "rails")
      display_samples = []
      samples = MENU['samples']
      samples.sort.each do |sample|
        display_samples << render_pb_doc_sample(sample, type, false)
      end
      raw("<div class='pb--docItem'>" + display_samples.join("</div><div class='pb--docItem'>") + "</div>")
    end
  end
end