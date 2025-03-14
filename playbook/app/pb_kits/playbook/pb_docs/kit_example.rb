# frozen_string_literal: true

# rubocop:disable Style/CaseLikeIf

module Playbook
  module PbDocs
    class KitExample < Playbook::KitBase
      prop :kit, type: Playbook::Props::String, required: true
      prop :example_title, type: Playbook::Props::String, required: true
      prop :example_key, type: Playbook::Props::String, required: true
      prop :show_code, type: Playbook::Props::Boolean, default: true
      prop :type, type: Playbook::Props::Enum, values: %w[rails react swift], default: "rails"
      prop :dark, type: Playbook::Props::Boolean, default: false

      def example
        if type == "rails"
          render inline: source
        elsif type == "react"
          react_component example_key.camelize, { dark: dark }
        elsif type == "swift"
          ## render the markdown file
          render inline: source
        end
      end

      def description
        @description ||= read_kit_file("docs", "_#{example_key}.md")
      end

      def highlighter
        type.eql?("rails") ? "erb" : "react"
      end

      def source
        @source ||= begin
          extension = if type == "rails"
                        "html.erb"
                      else
                        type == "swift" ? "swift" : "jsx"
                      end
          stringified_code = read_kit_file("docs", "_#{example_key}.#{extension}")
          sanitize_code(stringified_code)
        end
      end

      def tsx_source
        read_kit_file("", "_#{example_key}.tsx")
      end

      def swift_source
        read_kit_file("", "_#{example_key}.swift")
      end

    private

      def sanitize_code(stringified_code)
        stringified_code = stringified_code.gsub('"../.."', '"playbook-ui"')
                                           .gsub('"../../"', '"playbook-ui"')
                                           .gsub("'../../'", "'playbook-ui'")
                                           .gsub("'../..'", "'playbook-ui'")
                                           .gsub(%r{from "../.*}, "from 'playbook-ui'")
                                           .gsub(%r{from '../.*}, "from 'playbook-ui'")
        stringified_code = stringified_code.gsub(/import\s+(\w+)\s+from\s+['"]playbook-ui['"]/) do
          "import { #{::Regexp.last_match(1)} } from 'playbook-ui'"
        end
        stringified_code = stringified_code.gsub("import { FormattedDate }", "import { Date as FormattedDate }")
        # Combine separate playbook-ui import statements into one
        imports = stringified_code.scan(/^\s*import\s+{([^}]+)}\s+from\s+['"]playbook-ui['"]/)
        components = imports.flatten.join(", ").split(",").map(&:strip).uniq
        if components.any?
          new_import_statement = "import { #{components.join(', ')} } from 'playbook-ui'"
          stringified_code.gsub!(/^\s*import\s+{([^}]+)}\s+from\s+['"]playbook-ui['"]/, "")
          stringified_code = stringified_code.sub(/import\s+React[\s\S]+?\n/, "\\0\n#{new_import_statement}")
        end
        # Replace several empty lines with one empty line
        stringified_code.gsub!(/\n\s*\n{2,}/, "\n\n")
        stringified_code = dark ? stringified_code.gsub("{...props}", "dark") : stringified_code.gsub(/\s*{...props}\s*\n/, "\n")
        if stringified_code.include?("props: { ")
          stringified_code = stringified_code.gsub("props: {", "props: {dark: true,") if type == "rails" && dark
        elsif type == "rails" && dark
          stringified_code = stringified_code.gsub("props: {", "props: {\n    dark: true,")
        end
        stringified_code.gsub(" {...props}", "")
      end

      def read_kit_file(folder, *args)
        path = ::Playbook.kit_path(kit, folder, *args)
        path.exist? ? path.read : ""
      end
    end
  end
end

# rubocop:enable Style/CaseLikeIf
