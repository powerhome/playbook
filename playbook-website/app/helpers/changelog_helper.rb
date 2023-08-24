# frozen_string_literal: true

module ChangelogHelper
  def changelog_to_hash(changelog)
    markdown_html = render_markdown(changelog)
    document = parse_html(markdown_html)

    posts = []

    document.css("h1").each_with_index do |title_element, index|
      post = extract_post_data(document, title_element, index)
      posts << post if post[:image].present?
    end

    posts
  end

private

  def parse_html(html)
    Nokogiri::HTML5.parse(html)  # Use Nokogiri's parse method directly
  end

  def extract_post_data(document, title_element, index)
    content = extract_content(document, index)

    image_urls = extract_images(content)
    return {} if image_urls.empty?

    {
      title: title_element.text,
      description: extract_description(content),
      date: extract_date(content),
      image: image_urls,
      link: extract_link(title_element),
      content: content.css("p").to_s,
    }
  end

  def extract_content(document, index)
    index_element = index + 1
    start_element = "h1:nth-of-type(#{index_element})"
    end_element = "h1:nth-of-type(#{index_element + 1})"
    set_a = "#{start_element} ~ *:not(#{end_element})"
    document.css(set_a)
  end

  def extract_description(content)
    first_paragraph = content.at_css("p ~ p")
    first_paragraph&.text
  end

  def extract_date(content)
    first_h5 = content.at_css("h5")
    first_h5&.text
  end

  def extract_images(content)
    content.css("img").map { |img| img["src"] }
  end

  def extract_link(title_element)
    link_element = title_element.at_css("a:first-child")
    link = link_element&.attr("href")
    link&.gsub("#", "")
  end
end
