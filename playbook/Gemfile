# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gemspec

gem "health_check"
gem "simple_form", ">= 5.0.1", "< 6.0.0"
