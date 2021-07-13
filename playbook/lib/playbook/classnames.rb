# frozen_string_literal: true

module Playbook
  module Classnames
    def self.included(base)
      base.prop :classname
      base.prop :dark, type: Playbook::Props::Boolean, default: false
    end

    def generate_classname(*name_parts, separator: "_")
      [
        name_parts.compact.join(separator),
        prop(:classname),
        spacing_props,
        dark_props,
        max_width_props,
        z_index_props,
      ].compact.join(" ")
    end

    def generate_classname_without_spacing(*name_parts, separator: "_")
      [
        name_parts.compact.join(separator),
        prop(:classname),
      ].compact.join(" ")
    end

  private

    def dark_props
      dark ? "dark" : nil
    end
  end
end
