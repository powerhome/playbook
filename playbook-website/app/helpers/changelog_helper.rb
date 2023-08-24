# frozen_string_literal: true

module ChangelogHelper
  def changelog_to_hash(changelog)
    posts = []

    markdown_html = render_markdown(changelog)
    headings = extract_headings(markdown_html)

    headings.each_with_index do |title, index|
      post = extract_post_data(markdown_html, title, index)
      posts << post if post[:image].present?
    end

    posts
  end

private

  def extract_headings(markdown_html)
    Nokogiri::HTML(markdown_html).css("h1")
  end

  def extract_post_data(markdown_html, title, index)
    index_element = index + 1
    start_element = "h1:nth-of-type(#{index_element})"
    end_element = "h1:nth-of-type(#{index_element + 1})"
    set_a = "#{start_element} ~ *:not(#{end_element})"
    content = Nokogiri::HTML(markdown_html).css(set_a).to_html

    image_urls = extract_images(content)
    return {} if image_urls.empty?

    {
      title: title.text,
      description: extract_description(content),
      date: extract_date(content),
      image: image_urls,
      link: extract_link(title),
      content: Nokogiri::HTML(content).css("p").to_html,
    }
  end

  def extract_description(content)
    description = Nokogiri::HTML(content).css("p ~ p").first
    description&.text
  end

  def extract_images(content)
    rendered_html = Nokogiri::HTML(content)
    rendered_html.css("img").map { |img| img["src"] }
  end

  def extract_date(content)
    first_h5 = Nokogiri::HTML(content).css("h5").first
    first_h5&.text
  end

  def extract_link(title)
    link = title.css("a:first-child").attr("href")&.value
    link&.gsub("#", "")
  end

  def render_markdown(markdown)
    renderer = Redcarpet::Render::HTML.new
    markdown_parser = Redcarpet::Markdown.new(renderer)
    markdown_parser.render(markdown)
  end
end
