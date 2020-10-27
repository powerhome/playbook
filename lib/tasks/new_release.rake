# frozen_string_literal: true

require "rake"

def format_query(query)
  res = query
  res = res.split[1]
  res[0] = ""
  current_remote_version = res.chop
  current_remote_version
end

# run with...
# `bundle exec rake "app:new_release[arg]"`  <<-- Create Makefile command that's more concise?
# Arg options: major, minor, patch, alpha
task :new_release, [:var] => [:environment] do |_task, args|
  if args[:var] == "alpha"
    # Search ruby gems for current alpha version and format response
    current_remote_version = format_query(`gem search playbook_ui --pre`)
    puts "current alpha: #{current_remote_version}"
  else
    # Search ruby gems for current version and format response
    current_remote_version = format_query(`gem search playbook_ui`)
    puts "current: #{current_remote_version}"
    num_triplet = current_remote_version.split(".")
  end

  # Upversion appropriately based on argument
  # Return newly formatted version as 'new_version' variable
  # Error handling for invalid arguments
  new_version = ""
  case args[:var]
  when "alpha"
    current_remote_version[-1] = (current_remote_version[-1].to_i + 1).to_s
    new_version = current_remote_version
  when "major"
    new_version = "#{num_triplet[0].to_i + 1}.0.0"
  when "minor"
    new_version = "#{num_triplet[0]}.#{num_triplet[1].to_i + 1}.0"
  when "patch"
    new_version = "#{num_triplet[0]}.#{num_triplet[1]}.#{num_triplet[2].to_i + 1}"
  else
    puts "Argument Error: Valid Args - 'alpha', 'major', 'minor', 'patch'"
  end

  # TODO: Create Prompt for a 'this will be the new version, are you sure??' confirmation
  # Option to enter your desired version as a string if no
  puts "new #{args[:var]} version = #{new_version}"

  # Upversion package.json
  if args[:var] == "alpha"
    remote_npm_alpha = `npm show playbook-ui@alpha version`
    new_npm_alpha = remote_npm_alpha.chomp.dup
    new_npm_alpha[-1] = (new_npm_alpha[-1].to_i + 1).to_s

    `npm version #{new_npm_alpha} --no-git-tag-version --allow-same-version`
  else
    `npm version #{new_version} --no-git-tag-version --allow-same-version`
  end

  # Upversion version.rb
  current_local_version = Playbook::VERSION
  version_rb = File.read("lib/playbook/version.rb")
  new_version_rb = version_rb.gsub(current_local_version, new_version)
  File.open("lib/playbook/version.rb", "w") { |file| file.puts new_version_rb }

  # Build Gem
  `rm -rf playbook_ui-*.gem`
  `gem build playbook_ui.gemspec`
  # TODO: Publish Gem

  # TODO: Build node_module
  # TODO: Publish node_module
end
 