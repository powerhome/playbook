# frozen_string_literal: true

module Playbook
  module PbTitleCount
    class TitleCount
      include Playbook::Props

        partial "pb_title_count/title_count"

        prop :align, type: Playbook::Props::Enum,
             values: %w[left center right],
             default: "left"
        prop :size, type: Playbook::Props::Enum,
                    values: %w[lg sm],
                    default: "sm"
        prop :title
        prop :count

      def classname
        generate_classname("pb_title_count")
      end

      def title_size
        size == "lg" ? 3 : 4
      end

      def title
        if is_set? configured_title
          pb_title = Playbook::PbTitle::Title.new(size: title_size, text: configured_title, classname: "pb_title_count_text")
          ApplicationController.renderer.render(partial: pb_title, as: :object)
        end
      end

      def count
        if is_set? configured_count
          value = if configured_count.is_a?(Integer) || configured_count.is_a?(Float)
                    format_number(configured_count)
                  else
                    configured_count
                  end

          pb_count = Playbook::PbBody::Body.new(color: "light") do
            value.to_s
          end
          ApplicationController.renderer.render(partial: pb_count, as: :object)
        end
      end

      def format_number(number)
        number.to_s.gsub(/(\d)(?=\d{3}+(?:\.|$))(\d{3}\..*)?/, '\1,\2')
      end
    end
  end
end
