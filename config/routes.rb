Playbook::Engine.routes.draw do
  root              to: "pages#kits"
  get 'home',       to: "pages#home"
  get 'principles', to: "pages#principles"
  get 'dashboards', to: "examples#dashboards"
  get 'fullscreen', to: "pages#fullscreen"
  get 'grid',       to: "pages#grid"
  get 'tokens',     to: "pages#tokens"
  get 'kits',       to: "pages#kits"
  get 'examples',   to: "pages#examples"
  get 'utilities',  to: "pages#utilities"
  get 'resources',  to: "pages#resources"
  get 'kits/:name', to: "pages#kit_show_rails", as: 'kit_show'
  get 'kits/:name/rails', to: "pages#kit_show_rails", as: 'kit_show_rails'
  get 'kits/:name/react', to: "pages#kit_show_react", as: 'kit_show_reacts'

  get 'guides',     to: "guides#create_kit"
  get 'guides/use-in-nitro', to: "guides#use_nitro"
end
