require 'redcarpet_helper'

module ApplicationHelper

  def first_category_page_path(cat)
    if Page.where(category: cat.id).first
      return category_page_path(cat.id, Page.where(category: cat.id).first)
    else
      return new_category_page_path(cat)
    end
  end

  def first_section_category_page_path(section)
    first_category = Category.where(section: section.id).first
    unless first_category.nil?
      return first_category_page_path(first_category)
    else
      return section_path(section)
    end
  end

end
