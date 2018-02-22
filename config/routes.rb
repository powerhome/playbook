Rails.application.routes.draw do
  devise_for :users
  mount SimpleFormMarkdownEditor::Engine => "/"

  resources :sections
  resources :categories
  resources :page_tags
  resources :pages

  resources :sections do
    resources :categories
  end

  resources :categories do
    resources :pages
  end

  resources :pages do
    resources :page_tags
  end

  resources :tags
  resources :types

  root to: "sections#index"
end
