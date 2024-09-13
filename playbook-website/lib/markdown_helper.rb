# frozen_string_literal: true

require "redcarpet"
require "rouge"
require "rouge/plugins/redcarpet"
require "action_view"

module PlaybookWebsite
  module Markdown
    module Helper
      def self.call(template, source)
        compiled_source = markdown(source)
        erb.call(template, compiled_source)
      end

      def self.erb
        @erb ||= ActionView::Template.registered_template_handler(:erb)
      end

      def render_markdown(text)
        PlaybookWebsite::Markdown::Helper.markdown(text)
      end

      def render_frontmatter(file)
        FrontMatterParser::Parser.parse_file(file)
      end

      def self.markdown(text)
        options = {
          filter_html: false,
          hard_wrap: true,
          link_attributes: { rel: "nofollow", target: "_blank" },
          space_after_headers: true,
          fenced_code_blocks: true,
          no_styles: false,
          safe_links_only: true,
        }

        extensions = {
          lax_spacing: true,
          no_intra_emphasis: true,
          autolink: true,
          superscript: true,
          fenced_code_blocks: true,
          tables: true,
          disable_indented_code_blocks: false,
          strikethrough: true,
          underline: true,
          highlight: true,
          footnotes: true,
          with_toc_data: true,
        }

        # toc_renderer = Redcarpet::Render::HTML_TOC.new(with_toc_data: true)
        # @TOC = Redcarpet::Markdown.new(toc_renderer)
        # puts "TOC: #{@TOC.inspect}"

        # Strip Frontmatter
        text = text.gsub(/^(---\s*.*??)^(---\s*$?)/m, "")
        renderer = HTMLBlockCode.new(options)
        markdown = Redcarpet::Markdown.new(renderer, extensions)
        key = cache_key(text)
        Rails.cache.fetch key do
          markdown.render(text).html_safe
        end
      end

      def self.cache_key(text)
        Digest::MD5.hexdigest(text)
      end

      def render_code(text, language)
        formatter = Rouge::Formatters::HTML.new(scope: ".highlight")
        lexer = Rouge::Lexer.find(language)

        lexer = Rouge::Lexers::PlainText.new if lexer.nil?

        formatter.format(lexer.lex(text))
      end

      class HTML < Redcarpet::Render::HTML
        include Rouge::Plugins::Redcarpet
      end

      def rouge_markdown(text)
        render_options = {
          filter_html: true,
          hard_wrap: true,
          link_attributes: { rel: "nofollow" },
        }
        renderer = HTML.new(render_options)

        extensions = {
          autolink: true,
          fenced_code_blocks: true,
          lax_spacing: true,
          no_intra_emphasis: true,
          strikethrough: true,
          superscript: true,
        }
        markdown = Redcarpet::Markdown.new(renderer, extensions)
        markdown.render(text)
      end
    end

    class HTMLWithPants < Redcarpet::Render::HTML
      include Redcarpet::Render::SmartyPants
    end

    class HTML < Redcarpet::Render::HTML
      include Rouge::Plugins::Redcarpet
    end

    class HTMLBlockCode < Redcarpet::Render::HTML
      include ActionView::Helpers::AssetTagHelper

      # def block_code(code, language)
      #   "\n.nf\n#{normal_text(rouge(code, language))}\n.fi\n"
      # end

      def table(header, body)
        "<table class='pb_table table-sm table-responsive-collapse table-card table-collapse-sm'>" \
          "<thead>#{header}</thead>" \
          "<tbody>#{body}</tbody>" \
        "</table>"
      end

      def header(title, level)
        @headers ||= []
        permalink = title.gsub(/\W+/, "-")
        if @headers.include?(permalink)
          permalink += "_1"
          loop do
            break unless @headers.include?(permalink)

            permalink.gsub!(/_(\d+)$/, "_#{Regexp.last_match(1).to_i + 1}")
          end
        end
        @headers << permalink
        permalink_markup = %(<a name="#{permalink}" class="markdown-header-anchor" )
        permalink_markup += %(href="##{permalink}"><span class="far fa-link markdown-header-anchor-icon"></span></a>)
        %(\n<h#{level} id="#{permalink}">#{title} #{permalink_markup}</h#{level}>\n)
      end

      def image(link, title, alt_text)
        return nil if link.nil?

        %(<a href="#{link}" target="_blank">#{image_tag(link, title: title, alt: alt_text, class: 'imageloader lazyload')}</a>)
      end
    end
  end
end
