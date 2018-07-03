source 'https://rubygems.org'

ruby '2.5.0'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.4'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
gem 'health_check'
gem "paranoia", "~> 2.2"
gem 'rails_admin', '~> 1.3'

# AUTHENTICATION & ROLES
gem 'devise', '~> 4.4.0'

# JAVASCRIPT & JSON
gem 'jquery-rails'
gem 'jquery-ui-rails', '~> 5.0 '
gem 'coffee-rails', '~> 4.2'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'uglifier', '>= 1.3.0'
gem 'rails-assets-simplemde', source: 'https://rails-assets.org'
gem 'rails-assets-lazysizes', source: 'https://rails-assets.org'
gem 'prism-rails'

# MARKUP
gem 'slim-rails'
gem 'faker', github: 'stympy/faker', branch: 'master'

# MARKDOWN
gem 'redcarpet'
gem 'simple_form_markdown_editor'

# STYLES
gem "nitro_sg", github: "powerhome/nitro-storybook", tag: "v2.0.9"
gem 'sass-rails', '~> 5.0'

group :development, :test do
  gem 'byebug'
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem "better_errors"
  gem "binding_of_caller"
end

gem 'tzinfo-data'
