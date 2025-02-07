# frozen_string_literal: true

module PagesHelper
  def truncate(str, length)
    if str.length <= length
      str
    else
      "#{str[0...(length - 3)]}..."
    end
  end
end
