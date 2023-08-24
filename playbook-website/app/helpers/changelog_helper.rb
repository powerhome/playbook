# frozen_string_literal: true

module ChangelogHelper
  def changelog_to_hash(changelog)
    md_html = render_markdown(changelog)
    document = Nokogiri::HTML5(md_html)
    posts = []
    # Loop Through Each Post
    document.search("h1").each_with_index do |title, i|
      index_element = i + 1
      start_element = "//h1[#{index_element}]"
      end_element = "//h1[#{index_element + 1}]"
      set_a = "#{start_element}/following-sibling::*"
      set_b = "#{end_element}/preceding-sibling::*"
      my_content = document.xpath("#{set_a}[ count(.|#{set_b}) = count(#{set_b}) ]
      | #{start_element} | #{end_element}")
      image = my_content.search("img").map { |img| img["src"] }&.first
      next if image.nil?

      posts << {
        title: title.text,
        description: my_content.css("p ~ p").map(&:text)&.first,
        date: my_content.search("h5").map(&:text)&.first,
        image: image,
        link: title.xpath("a[1]")[0]["href"]&.gsub!("#", ""),
        content: my_content.search("p").to_s,
      }
    end
    # Return Posts
    posts
  end

  def changelog_to_object(changelog)
    hash = changelog_to_hash(changelog)
    hash.map { |post| OpenStruct.new(post) }
  end
end
