# frozen_string_literal: true

require "redcarpet"

module Playbook
  module Markdown
    class HTMLWithPants < Redcarpet::Render::HTML
      include Redcarpet::Render::SmartyPants
    end

    class TemplateHandler
      class_attribute :default_format
      self.default_format = Mime[:html]

      class << self
        def call(template)
          compiled_source = erb.call(template)
          "#{name}.render(begin;#{compiled_source};end)"
        end

        def render(template)
          markdown.render(template).html_safe
        end

      private

        def md_options
          @md_options ||= {
            autolink: true,
            no_intra_emphasis: true,
            fenced_code_blocks: true,
            strikethrough: true,
            tables: true,
          }
        end

        def markdown
          @markdown ||= Redcarpet::Markdown.new(::Playbook::Markdown::HTMLWithPants, md_options)
        end

        def erb
          @erb ||= ActionView::Template.registered_template_handler(:erb)
        end
      end
    end
  end
end
