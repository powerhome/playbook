# frozen_string_literal: true

module Playbook
  module PbDocs
    class KitExample < Playbook::KitBase
      include Playbook::PbDocHelper

      prop :kit, type: Playbook::Props::String, required: true
      prop :example_title, type: Playbook::Props::String, required: true
      prop :example_key, type: Playbook::Props::String, required: true
      prop :show_code, type: Playbook::Props::Boolean, default: true
      prop :type, type: Playbook::Props::Enum, values: %w[rails react], default: "rails"

      def example
        @example ||= pb_doc_example(type, kit, example_key)
      end

      def description
        @sample_description ||= pb_doc_example_description(kit, example_key)
      end

      def highlighter
        type.eql?("rails") ? "erb" : "react"
      end

      def source
        @source ||= pb_doc_example_source(type, kit, example_key)
      end
    end
  end
end
