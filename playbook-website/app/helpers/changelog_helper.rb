# frozen_string_literal: true

# controllers/concerns/changelog_helper.rb
module ChangelogHelper
  def changelog_to_hash(changelog)
    posts = []

    markdown_html = render_markdown(changelog)
    document = parse_html(markdown_html)

    document.css("h1").lazy.take(5).each_with_index do |title_element, i|
      post = extract_post_data(document, title_element, i)
      index_element = i + 1
      start_element = "//h1[#{index_element}]"
      end_element = "//h1[#{index_element + 1}]"
      set_a = "#{start_element}/following-sibling::*"
      set_b = "#{end_element}/preceding-sibling::*"
      my_content = document.xpath("#{set_a}[ count(.|#{set_b}) = count(#{set_b}) ]
      | #{start_element} | #{end_element}")
      image_url = image = my_content.search("img").map { |img| img["src"] }&.first
      next if image.nil?
      next unless image_url.present? # Skip posts without images

      posts << {
        title: post[:title],
        description: post[:description],
        date: post[:date],
        image: image_url,
        link: post[:link],
      }
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

    {
      title: title_element.text,
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

  def extract_image_url(content)
    match_data = content.match(/!\[.*\]\((.*?)\)/)
    image_url = match_data[1] if match_data
    image_url&.gsub(/\A\s+|\s+\z/, "")
  end

  def extract_link(title_element)
    link = title_element.css("a:first-child").attr("href")&.value
    link&.gsub("#", "")
  end
end
