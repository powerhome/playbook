# frozen_string_literal: true

require "rails-html-sanitizer"

module PlaybookMcp
  module HtmlSanitizer
    # Kits that may accept HTML children for composition (e.g. table markup).
    CHILDREN_ALLOWED_KITS = %w[
      table
      advanced_table
      card
      collapsible
      dialog
    ].freeze

    ALLOWED_TAGS = %w[
      a abbr b br caption col colgroup div em h1 h2 h3 h4 h5 h6 hr i img label
      li ol p span strong sub sup table tbody td tfoot th thead tr u ul
    ].freeze

    ALLOWED_ATTRIBUTES = %w[
      abbr align alt class colspan headers href id rowspan scope src title
      data-title
    ].freeze

  module_function

    def children_allowed?(kit)
      CHILDREN_ALLOWED_KITS.include?(kit.to_s)
    end

    def sanitize(html)
      return "" if html.nil?

      # Drop script elements (and their text) before allowlist sanitize, which
      # otherwise may leave inner text behind after stripping tags.
      pre = html.to_s
                .gsub(%r{<\s*script\b[^>]*>.*?<\s*/\s*script\s*>}mi, "")
                .gsub(%r{<\s*/?\s*script\b[^>]*>}mi, "")

      sanitizer.sanitize(
        pre,
        tags: ALLOWED_TAGS,
        attributes: ALLOWED_ATTRIBUTES
      )
    end

    def sanitizer
      @sanitizer ||= Rails::Html::SafeListSanitizer.new
    end
  end
end
