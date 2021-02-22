# frozen_string_literal: true

module Playbook
  module PbDocs
    class KitExample < Playbook::KitBase
      include Playbook::Markdown::Helper

      prop :kit, type: Playbook::Props::String, required: true
      prop :example_title, type: Playbook::Props::String, required: true
      prop :example_key, type: Playbook::Props::String, required: true
      prop :show_code, type: Playbook::Props::Boolean, default: true
      prop :type, type: Playbook::Props::Enum, values: %w[rails react], default: "rails"
      prop :dark, type: Playbook::Props::Boolean, default: false

      def example
        if type == "rails"
          render inline: source
        elsif type == "react"
          react_component example_key.camelize, { dark: dark }
        end
      end

      def description
        @description ||= read_kit_file(kit, "_#{example_key}.md")
      end

      def highlighter
        type.eql?("rails") ? "erb" : "react"
      end

      def source
        @source ||= begin
          extension = type == "react" ? "jsx" : "html.erb"
          read_kit_file("_#{example_key}.#{extension}")
        end
      end

    private

      def read_kit_file(*args)
        path = ::Playbook.kit_path(kit, "docs", *args)
        path.exist? ? path.read : ""
      end
    end
  end
end
