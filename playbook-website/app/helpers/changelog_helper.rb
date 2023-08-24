# frozen_string_literal: true

module ChangelogHelper
  def changelog_to_hash(changelog)
    md_html = render_markdown(changelog)
    document = Nokogiri::HTML5(md_html)
    posts = []

    document.css("h1").each_with_index do |title, i|
      index_element = i + 1
      start_element = "h1:nth-of-type(#{index_element})"
      end_element = "h1:nth-of-type(#{index_element + 1})"
      set_a = "#{start_element} ~ *:not(#{end_element})"
      my_content = document.css(set_a)
      image = my_content.css("img").map { |img| img["src"] }
      next if image.nil?

      posts << {
        title: title.text,
        description: my_content.css("p ~ p").map(&:text).first,
        date: my_content.css("h5").map(&:text).first,
        image: image,
        link: title.css("a:first-child").attr("href")&.value&.gsub("#", ""),
        content: my_content.css("p").to_s,
      }
    end

    posts
  end

  def changelog_to_object(changelog)
    hash = changelog_to_hash(changelog)
    hash.map { |post| OpenStruct.new(post) }
  end
end
