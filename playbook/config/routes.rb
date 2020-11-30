Playbook::Engine.routes.draw do
  # Full Page Samples Get Generated Here
  get 'samples/:name', to: "samples#sample_show_rails", as: 'sample_show'
  get 'samples/:name/rails', to: "samples#sample_show_rails", as: 'sample_show_rails'
  get 'samples/:name/react', to: "samples#sample_show_react", as: 'sample_show_reacts'
  get 'samples/', to: "samples#samples_index"
end
