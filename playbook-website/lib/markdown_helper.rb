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
        permalink_markup += %( href="##{permalink}"><span class="markdown-header-anchor-icon"><!--?xml version="1.0"?--><svg xmlns="http://www.w3.org/2000/svg" style="height: auto; width: auto;" viewBox="0 0 31 25" fill="none" class="pb_custom_icon svg-inline--fa pb_icon_kit svg_fw" id="" data="{}" aria="{:label=>&quot;away&quot;}" tabindex=""><path d="M28.0918 12.918L22.7949 18.2149C20.123 20.8399 15.8574 20.8399 13.2324 18.2149C10.748 15.6836 10.6074 11.6993 12.9043 9.02738L13.1387 8.74613C13.5605 8.27738 14.2637 8.2305 14.7324 8.65238C15.2012 9.07425 15.248 9.77738 14.8262 10.2461L14.6387 10.4805C13.0449 12.2618 13.1387 14.9336 14.8262 16.6211C16.5605 18.3555 19.4199 18.3555 21.2012 16.6211L26.498 11.3243C28.2324 9.543 28.2324 6.73051 26.498 4.94926C24.8105 3.30863 22.1387 3.21488 20.3574 4.76176L20.0762 4.99613C19.6074 5.41801 18.9043 5.37113 18.4824 4.90238C18.0605 4.43363 18.1074 3.73051 18.5762 3.30863L18.8574 3.07426C21.5293 0.730505 25.5605 0.87113 28.0918 3.35551C30.7168 5.98051 30.7168 10.2461 28.0918 12.918ZM3.66992 11.8399L9.01367 6.543C11.6387 3.918 15.9043 3.918 18.5293 6.543C21.0605 9.02738 21.2012 13.0586 18.8574 15.7305L18.5762 16.0118C18.2012 16.4805 17.4512 16.5743 16.9824 16.1524C16.5137 15.7305 16.4668 15.0274 16.8887 14.5586L17.1699 14.2774C18.7168 12.4961 18.623 9.82425 16.9355 8.13675C15.2012 6.3555 12.3418 6.3555 10.6074 8.13675L5.26367 13.4336C3.5293 15.168 3.5293 18.0274 5.26367 19.8086C6.95117 21.4493 9.62305 21.543 11.4043 19.9961L11.6855 19.7618C12.1543 19.3399 12.8574 19.3868 13.2793 19.8555C13.7012 20.3243 13.6543 21.0274 13.1855 21.4493L12.9043 21.6836C10.2324 24.0274 6.20117 23.8868 3.66992 21.4024C1.04492 18.7774 1.04492 14.4649 3.66992 11.8399Z" fill="currentColor"></path></svg></span></a> )
        %(\n<h#{level} id="#{permalink}">#{title} #{permalink_markup}</h#{level}>\n)
      end

      def image(link, title, alt_text)
        return nil if link.nil?

        %(<a href="#{link}" target="_blank">#{image_tag(link, title: title, alt: alt_text, class: 'imageloader lazyload')}</a>)
      end
    end
  end
end
