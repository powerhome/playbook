# frozen_string_literal: true

# rubocop:disable Style/CaseLikeIf

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
        @description ||= read_kit_file("_#{example_key}.md")
      end

      def highlighter
        type.eql?("rails") ? "erb" : "react"
      end

      def source
        @source ||= begin
          extension = type == "react" ? "jsx" : "html.erb"
          stringified_code = read_kit_file("_#{example_key}.#{extension}")
          sanitize_code(stringified_code)
        end
      end

    private

      def sanitize_code(stringified_code)
        stringified_code = stringified_code.gsub(%r{'../.*}, "'playbook-ui'")
                                           .gsub(%r{"../.*}, '"playbook-ui"')
        stringified_code = dark ? stringified_code.gsub("{...props}", "dark") : stringified_code.gsub(/\s*{...props}\s*\n/, "\n")
        if stringified_code.include?("props: { ")
          stringified_code = stringified_code.gsub("props: {", "props: {dark: true,") if type == "rails" && dark
        elsif type == "rails" && dark
          stringified_code = stringified_code.gsub("props: {", "props: {\n    dark: true,")
        end
        stringified_code
      end

      def read_kit_file(*args)
        path = ::Playbook.kit_path(kit, "docs", *args)
        path.exist? ? path.read : ""
      end
    end
  end
end

# rubocop:enable Style/CaseLikeIf
