# frozen_string_literal: true

module ChangelogHelper
  def changelog_to_hash(changelog)
    posts = []

    markdown_html = render_markdown(changelog)
    document = parse_html(markdown_html)

    document.css("h1").lazy.take(5).each_with_index do |title_element, index|
      title_text = title_element.text
      puts title_text
      ### Only create a post of the title has letters. Small releases only have a version number as thier title
      if title_text.match?(/[a-zA-Z]/)
        post = extract_post_data(document, title_element, index)
        posts << post
      end
    end

    posts
  end

private

  def parse_html(html)
    Nokogiri::HTML5(html)
  end

  def extract_post_data(document, title_element, index)
    index_element = index + 1
    start_element = "h1:nth-of-type(#{index_element})"
    end_element = "h1:nth-of-type(#{index_element + 1})"
    set_a = "#{start_element} ~ *:not(#{end_element})"
    content = document.css(set_a)
    title_text = title_element.text

    {
      title: title_text,
      description: extract_description(content),
      date: extract_date(content),
      link: extract_link(title_element),
      content: content.css("p").to_s,
    }
  end

  def extract_description(content)
    first_paragraph = content.css("p ~ p").first
    first_paragraph&.text
  end

  def extract_date(content)
    first_h5 = content.css("h5").first
    first_h5&.text
  end

  def extract_link(title_element)
    link = title_element.css("a:first-child").attr("href")&.value
    link&.gsub("#", "")
  end
end
