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
      raw("<div class='pb--docItem'>" + display_samples.join("</div><div class='pb--docItem'>") + "</div>")
    end

    def pb_sample(sample: "", type: "rails")
      @type = type
      @sample = sample
    end
  end
end
