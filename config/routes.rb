Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  mount SimpleFormMarkdownEditor::Engine => "/"

  # NEED TO REDO THIS

  # resources :sections
  # resources :categories
  # resources :page_tags
  # resources :pages

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

  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  root to: "home#index"
end
