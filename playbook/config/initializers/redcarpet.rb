require 'redcarpet'

module ActionView
  module Template::Handlers
    class Markdown
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
          @markdown ||= Redcarpet::Markdown.new(HTMLWithPants, md_options)
        end

        def erb
          @erb ||= ActionView::Template.registered_template_handler(:erb)
        end
      end
    end
  end
end

class HTMLWithPants < Redcarpet::Render::HTML
  include Redcarpet::Render::SmartyPants
end

ActionView::Template.register_template_handler(:md, ActionView::Template::Handlers::Markdown)
