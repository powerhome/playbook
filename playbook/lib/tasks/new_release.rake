# frozen_string_literal: true

require "rake"

# --------------------------------------- #
#           Helper Functions              #
# --------------------------------------- #

def format_query(query)
  res = query
  res = res.split[1]
  res[0] = ""
  latest_remote_version = res.chop
  latest_remote_version
end

def alpha_reducer(alpha)
  count = 0
  third_dot_index = 0

  alpha.split("").each_with_index do |char, i|
    count += 1 if char == "."

    if count == 3
      third_dot_index = i
      break
    end
  end

  alpha_triplet = alpha[0...third_dot_index]
  alpha_triplet
end

def confirmation_loop(version, npm_alpha, rake_arg)
  while true do
    if rake_arg == "alpha"
      STDOUT.puts "\nNew alpha versions will be #{version} and #{npm_alpha} continue?  (y/n)"
    else
      STDOUT.puts "\nNew version will be #{version}, continue?  Type 'n' to enter your version manually. (y/n)"
    end

    response = STDIN.gets.chomp.downcase

    if response == "y"
      puts "\nOkay, changing versions and building packages now."
      break
    end

    if response == "n"
      while true do
        if rake_arg == "alpha"
          STDOUT.puts "\nInput alpha base version"
          alpha_base = STDIN.gets.chomp.downcase
          STDOUT.puts "\nInput alpha suffix version"
          alpha_suffix = STDIN.gets.chomp.downcase

          version = "#{alpha_base}.pre.alpha#{alpha_suffix}"
          npm_alpha = "#{alpha_base}-alpha#{alpha_suffix}"
        else
          STDOUT.puts "\nWhat would you like the version to be?"
          response = STDIN.gets.chomp.downcase

          version = response
        end
        break
      end
    end
  end
  [version, npm_alpha]
end

# run with...
# `bundle exec rake "app:new_release[arg]"`  <<-- Create Makefile command that's more concise?
# Arg options: major, minor, patch, alpha
task :new_release, [:var] => [:environment] do |_task, args|
  new_version = ""

  # --------------------------------------- #
  #             Remote Queries              #
  # --------------------------------------- #
  if args[:var] == "alpha"
    # Search ruby gems for latest alpha version and format response
    latest_remote_alpha = format_query(`gem search playbook_ui --pre`)
    puts "\nLatest remote alpha version: #{latest_remote_alpha}"
  else
    # Search ruby gems for latest version and format response
    latest_remote_version = format_query(`gem search playbook_ui`)
    puts "\nLatest remote version: #{latest_remote_version}"
    # triplet here refers to the maj, min, and patch numbers
    # i.e. x.x.x
    # num_triplet is an array of those three integers
    num_triplet = latest_remote_version.split(".")
  end

  # --------------------------------------- #
  #           Argument Logic Gates          #
  # --------------------------------------- #

  # Upversion appropriately based on argument
  # Return newly formatted version as 'new_version' variable
  # Error handling for invalid arguments
  case args[:var]
  when "alpha"

    alpha_triplet = alpha_reducer(latest_remote_alpha)
    # base here refers to the latest non alpha release
    base_triplet = format_query(`gem search playbook_ui`)

    if alpha_triplet != base_triplet
      # logic used to start newest alpha to new release version
      # i.e. last alpha 7.2.0-alpha4 but 7.3.0 has since been released
      # so next alpha should be 7.3.0-alpha1
      new_version = base_triplet + ".pre.alpha1"
    else
      # Increment latest alpha version by 1
      latest_remote_alpha[-1] = (latest_remote_alpha[-1].to_i + 1).to_s
      new_version = latest_remote_alpha
    end

    npm_alpha = new_version.gsub(".pre.alpha", "-alpha")
  when "major"
    new_version = "#{num_triplet[0].to_i + 1}.0.0"
  when "minor"
    new_version = "#{num_triplet[0]}.#{num_triplet[1].to_i + 1}.0"
  when "patch"
    new_version = "#{num_triplet[0]}.#{num_triplet[1]}.#{num_triplet[2].to_i + 1}"
  else
    puts "\nArgument Error: Valid Args - 'alpha', 'major', 'minor', 'patch'"
    break
  end

  # Allows user to double check version and input manually if necessary
  return_tuple = confirmation_loop(new_version, npm_alpha, args[:var])
  new_version = return_tuple[0]
  npm_alpha = return_tuple[1]

  # --------------------------------------- #
  #      Change Local Versioning Files      #
  # --------------------------------------- #

  # Upversion package.json
  if args[:var] == "alpha"
    `npm version #{npm_alpha} --no-git-tag-version --allow-same-version`
  else
    `npm version #{new_version} --no-git-tag-version --allow-same-version`
  end

  # Upversion version.rb
  current_local_version = Playbook::VERSION
  version_rb = File.read("lib/playbook/version.rb")
  new_version_rb = version_rb.gsub(current_local_version, new_version)
  File.open("lib/playbook/version.rb", "w") { |file| file.puts new_version_rb }

  # --------------------------------------- #
  #        Build and Publish Packages       #
  # --------------------------------------- #

  # RubyGems
  `rm -rf playbook_ui-*.gem`
  puts "\nCreating Gem..."
  `gem build playbook_ui.gemspec`
  puts "\nPushing to RubyGems... (not yet implemented)"
  # `gem push playbook_ui-#{new_version}.gem`

  # NPM
  `rm -rf playbook-ui-*.tgz`
  puts "\nGenerating distribution files"
  `docker-compose run web yarn release`
  puts "\nOrganizing distribution files"
  `rm dist/playbook-rails.css && mv dist/playbook-react.css dist/playbook.css`
  puts "\nCreating NPM package..."
  `npm pack`
  puts "\nPublishing to NPM... (not yet implemented)"
  if args[:var] == "alpha"
    puts "\nNPM Alpha Package Published!"
    # `npm publish playbook-ui-#{npm_alpha}.tgz --tag alpha`
  else
    puts "\nNPM Package Published!... (not yet implemented)"
    # `npm publish playbook-ui-#{new_version}.tgz`
  end
end

# Add colors, improve spacing

# class String
#   # colorization
#   def colorize(color_code)
#     "\e[#{color_code}m#{self}\e[0m"
#   end

#   def red
#     colorize(31)
#   end

#   def green
#     colorize(32)
#   end

#   def yellow
#     colorize(33)
#   end

#   def blue
#     colorize(34)
#   end

#   def pink
#     colorize(35)
#   end

#   def light_blue
#     colorize(36)
#   end
# end
