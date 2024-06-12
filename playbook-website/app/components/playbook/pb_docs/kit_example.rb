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

      include PlaybookWebsite::Markdown::Helper

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

    private

      def sanitize_code(stringified_code)
        stringified_code = stringified_code.gsub('"../.."', '"playbook-ui"')
                                           .gsub('"../../"', '"playbook-ui"')
                                           .gsub("'../../'", "'playbook-ui'")
                                           .gsub("'../..'", "'playbook-ui'")
                                           .gsub(%r{from "../.*}, "from 'playbook-ui'")
                                           .gsub(%r{from '../.*}, "from 'playbook-ui'")
                                           .gsub("'../../../../../../playbook-website/app/javascript/scripts/custom-icons'", "'your-directory/custom-icons.js'")
        stringified_code = dark ? stringified_code.gsub("{...props}", "dark") : stringified_code.gsub(/\s*{...props}\s*\n/, "\n")
        if stringified_code.include?("props: { ")
          stringified_code = stringified_code.gsub("props: {", "props: {dark: true,") if type == "rails" && dark
        elsif type == "rails" && dark
          stringified_code = stringified_code.gsub("props: {", "props: {\n    dark: true,")
        end
        stringified_code.gsub(" {...props}", "")
      end

      def read_kit_file(folder, file_name)
        # puts *args.inspect
        # byebug
        # path = ::Playbook.kit_path(kit, folder, *args)
        # path.exist? ? path.read : ""
        name_array = file_name.split(".")
        if name_array[1] != "md"
          path = ::Playbook.kit_path(kit, folder, file_name)
          path.exist? ? path.read : ""
        else
          puts file_name
          path = ::Playbook.kit_path(kit, folder, file_name)
          if path.exist?
            path.read
          elsif type == "rails"
            name_array[0] += "_rails"
            file_name = name_array.join(".")
            path = ::Playbook.kit_path(kit, folder, file_name)
            path.exist? ? path.read : ""
          elsif type == "react"
            name_array[0] += "_react"
            file_name = name_array.join(".")
            path = ::Playbook.kit_path(kit, folder, file_name)
            path.exist? ? path.read : ""
          end
        end
      end
    end
  end
end

# rubocop:enable Style/CaseLikeIf
