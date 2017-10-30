json.extract! page, :id, :title, :body_markdown, :body_html, :order, :user_id, :type_id, :category_id, :created_at, :updated_at
json.url page_url(page, format: :json)
