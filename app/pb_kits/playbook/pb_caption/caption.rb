# frozen_string_literal: true

module Playbook
  module PbCaption
    class Caption
      include Playbook::Props

      prop :dark, default: false
      prop :large, default: false
      prop :tag, type: Playbook::Props::Enum,
                 values: %w[h1 h2 h3 h4 h5 h6 p span div],
                 default: "div"
      prop :text, default: "Caption"

      def classname
        [
          [
            "pb_caption_kit",
            large_class,
            dark_class,
          ].compact.join("_"),
          prop(:classname),
        ].join(" ")
      end

      def to_partial_path
        "pb_caption/caption"
      end

    private

      def large_class
        large ? "lg" : nil
      end

      def dark_class
        dark ? "dark" : nil
      end
    end
  end
end
