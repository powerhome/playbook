require 'redcarpet'

module RedcarpetHelper
  def markdown(text)
    options = {
      filter_html:     false,
      hard_wrap:       true,
      link_attributes: { rel: 'nofollow', target: "_blank" },
      space_after_headers: true,
      fenced_code_blocks: true,
      no_styles: false,
      safe_links_only: true
    }

    extensions = {
      autolink:           true,
      superscript:        true,
      fenced_code_blocks: true,
      tables: true,
      disable_indented_code_blocks: false,
      strikethrough: true,
      underline: true,
      highlight: true,
      footnotes: true,
      with_toc_data: true,
    }

    renderer = HTMLBlockCode.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)

    markdown.render(text).html_safe
  end
end

class HTMLBlockCode < Redcarpet::Render::HTML
  def getId(string)
    string.gsub(/id="(.*?)"/) do
      @id = $1
    end
  end

  def getHeight(string)
    @height = 160
    string.gsub(/height="(.*?)"/) do
      @height = $1
    end
  end

  def getPreview(string)
    @preview = true
    string.gsub(/preview="(.*?)"/) do
      @preview = $1
      if @preview == "false"
        @preview = false
      elsif @preview == "true"
        @preview = true
      end
    end
  end

  def getExpand(string)
    @expand = false
    string.gsub(/expand="(.*?)"/) do
      if $1.present?
        @expand = $1
        if @expand == "false"
          @expand = false
        else
          @expand = true
        end
      end
    end
  end

  def getLinks(string)
    @links = ["view", "copy", "preview"]
    string.gsub(/links="(.*?)"/) do
      @links = $1.split(",").map{|i| i.downcase.strip}
    end
  end

  def getContent(id)
    @content = Page.where(id: id).first
  end

  def header(title, level)
    if level == 2
      @headers ||= []
      permalink = title.gsub(/\W+/, "-")
      if @headers.include?(permalink)
        permalink += "_1"
        loop do
          break if !@headers.include?(permalink)
          permalink.gsub!(/\_(\d+)$/, "_#{$1.to_i + 1}")
        end
      end
      @headers << permalink
      %(\n<h#{level} id=\"#{permalink}\"><a name="#{permalink}" class="markdown-header-anchor anchor" href="##{permalink}"><span class="far fa-link anchor-icon"></span></a>#{title}</h#{level}>\n)
    else
      %(\n<h#{level}>#{title}</h#{level}>\n)
    end
  end

  def playbook_snippet(full_document)
    full_document.gsub! /\[snippet (.*)\]/ do
      @string = $1
      @random_id = Random.rand(100)
      @iframe = %(\n\n)
      @code = %(\n\n)
      @image_preview = %(\n\n)
      @action_buttons = %(\n\n)
      @view_link = %(\n\n)
      @copy_link = %(\n\n)
      @preview_link = %(\n\n)

      getId(@string)

      if !@id.nil?
        permalink = "snippet-#{@id}-#{@random_id}"

        getContent(@id)
        getHeight(@string)
        getPreview(@string)
        getExpand(@string)
        getLinks(@string)

        if @content.present?
          @snippet_encoded = (CGI.escapeHTML @content.body_markdown).html_safe

          # Show iframe preview
          if @preview == true
            @iframe = %(\n<iframe onload="snippetFrameLoad('snippet#{@id}#{@random_id}')" id="snippet#{@id}#{@random_id}" scrolling="no" src="/snippet/#{@id}" width="100%" height="#{@height}"></iframe>\n)
          else
            @iframe = %(\n<iframe onload="snippetFrameLoad('snippet#{@id}#{@random_id}')" class="snippet-hidden" id="snippet#{@id}#{@random_id}" scrolling="no" src="/snippet/#{@id}" width="0" height="0"></iframe>\n)
          end

          # Show image if preview is URL
          if @preview != false && @preview != true
            @iframe = %(\n<iframe onload="snippetFrameLoad('snippet#{@id}#{@random_id}')" class="snippet-hidden" id="snippet#{@id}#{@random_id}" scrolling="no" src="/snippet/#{@id}" width="0" height="0"></iframe>\n)
            @image_preview = %(\n<div class="snippet-preview-image"><a href="#{Rails.application.routes.url_helpers.preview_snippet_path(@id)}" target="_blank" class="uix-component-link preview-image-link m-4 p-0"><img src="#{@preview}" /></a></div>\n)
          end

          # Show links
          if @links.include? 'view'
            @view_link = %(\n<a onclick="toggleSnippet(event, 'snippet#{@id}#{@random_id}')" class="uix-component-link toggle"><i class="far fa-eye mr-1"></i> View code</a>\n)
          end
          if @links.include? 'copy'
            @copy_link = %(\n<a onclick="copySnippet(event, 'snippet#{@id}#{@random_id}')" id="copy-snippet#{@id}#{@random_id}" class="uix-component-link copy hidden"><i id="copy-icon" class="far fa-clone mr-1"></i><i id="copied-icon" class="far fa-check mr-1 hidden"></i> <span id="copy-text">Copy snippet</span></a>\n)
          end
          if @links.include? 'preview'
            @preview_link = %(\n<a href="#{Rails.application.routes.url_helpers.preview_snippet_path(@id)}" target="_blank" class="uix-component-link preview-window"><i class="far fa-external-link mr-1"></i> Preview</a>\n)
          end

          # Auto expand or collapse
          if @expand == true && !@expand.nil?
            @code = %(\n<pre class="mx-4 toggle-snippet-preview line-numbers language-markup shown"><code>#{@snippet_encoded}</code></pre>\n)
            @view_link = %(\n<a onclick="toggleSnippet(event, 'snippet#{@id}#{@random_id}')" class="uix-component-link toggle"><i class="far fa-eye-slash mr-1"></i> Hide code</a>\n)
          else
            @code = %(\n<pre class="mx-4 toggle-snippet-preview line-numbers language-markup"><code>#{@snippet_encoded}</code></pre>\n)
          end

          # Define action buttons based on options
          @action_buttons = %(\n<div class="snippet-actions pb-4">#{@view_link}#{@copy_link}#{@preview_link}</div>\n)

          %(\n<div class="uix-component-frame uix-snippet-frame"><a name="#{permalink}" class="markdown-snippet-anchor anchor" href="##{permalink}"><span class="far fa-link anchor-icon"></span></a>#{@iframe}#{@image_preview}#{@action_buttons}#{@code}</div>\n)
        end
      end

    end
    full_document
  end

  def storybook_component(full_document)
    full_document.gsub! /\[component (.*)\]/ do
      @string = $1
      @default_height = '160'
      @attr = ['', @default_height]

      # Set src from attributes
      @string.gsub(/src="(.*?)"/) do
        @attr[0] = $1
      end

      # Set height from attributes
      @string.gsub(/height="(.*?)"/) do
        if $1
          @attr[1] = $1
        else
          @attr[1] = @default_height
        end
      end

      %(\n<div class="uix-component-frame uix-storybook-frame"><iframe scrolling="no" id="component-preview" src="#{@attr[0]}" width="100%" height="#{@attr[1]}"></iframe><a href="#{@attr[0]}" target="_blank" class="uix-component-link">View component</a></div>\n)
    end
    full_document
  end

  def preprocess(full_document)
    playbook_snippet(full_document)
    storybook_component(full_document)
  end

  def list(contents, list_type)
    @contents = contents
    @list_items = contents.split("\n")

    if @list_items[0].include? "[do]" or @list_items[0].include? "[dont]"
      @element_items = []
      @list_items.each do |item, index|
        item.gsub(/\<li>(.*)\<\/li>/) do
          @element_items.push($1);
        end
      end

      # Doing both because we could have either/both
      # clean up
      @dont_items, @trash_items_dont = @element_items.partition { |x, i|  x.include? "[dont]" }
      @do_items, @trash_items_do = @element_items.partition { |x, i|  x.include? "[do]" }

      @do_list = []
      @do_items.each do |item, index|
        @do_list.push("<li>#{item.sub('[do] ', '')}</li>")
      end
      @do_list = "<ul class='uix-ruleset do-list'>#{@do_list.join("")}</ul>"

      @dont_list = []
      @dont_items.each do |item, index|
        @dont_list.push("<li>#{item.sub('[dont] ', '')}</li>")
      end
      @dont_list = "<ul class='uix-ruleset dont-list'>#{@dont_list.join("")}</ul>"

      "<div class='row uix-ruleset-block'><div class='col-sm-6'>#{@do_list}</div><div class='col-sm-6'>#{@dont_list}</div></div>"
    else
      @contents
    end
  end
end
