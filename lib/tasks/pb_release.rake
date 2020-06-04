# frozen_string_literal: true

namespace :pb_release do
  desc "Update the version number in preparation to release"
  task version: :environment do
    puts "\n"
    puts "*" * 20 + " Create New Playbook Release " + "*" * 20
    ack = "\nFirst, before creating a new version please make sure you are familiar with SemVer guidlines: "
    ack += "\nhttps://semver.org/#semantic-versioning-specification-semver. "
    ack += "\n\nDoing so will ensure the proper version is selected for the release. "
    ack += "\nSee also: https://github.com/powerhome/playbook/wiki/Releasing-a-New-Version#determining-the-version."
    ack += "\n\nReady to start? y/N"
    STDOUT.puts ack
    agreed = STDIN.gets.chomp.downcase

    if agreed == "y"
      old_version = Playbook::VERSION
      STDOUT.puts "What would you like the next release number to be? Currently #{old_version}"
      new_version = STDIN.gets.chomp
      puts "Ok great, let's make version #{new_version}"
      puts "\n\n"

      # Update package.json
      package = File.read("package.json")
      new_package = package.gsub(/"version": "#{old_version}",/, "\"version\": \"#{new_version}\",")
      File.open("package.json", "w") { |file| file.puts new_package }
      puts "Updated package.json"

      # Update version.rb
      version_rb = File.read("lib/playbook/version.rb")
      new_version_rb = version_rb.gsub(/VERSION = "#{old_version}".freeze/, "VERSION = \"#{new_version}\".freeze")
      File.open("lib/playbook/version.rb", "w") { |file| file.puts new_version_rb }
      puts "Updated lib/playbook/version.rb"

      # Update gemfile.lock
      gemfile = File.read("Gemfile.lock")
      new_gemfile = gemfile.gsub(/playbook_ui \(#{Regexp.escape(old_version)}\)/, "playbook_ui (#{new_version})")
      File.open("Gemfile.lock", "w") { |file| file.puts new_gemfile }
      puts "Updated Gemfile.lock"
      puts "\n\n"

      puts "\nCreating dist files"
      `yarn release`

      puts "Commit your changes and create a PR to merge to master"
    end
  end

  desc "Publish to RubyGems, NPM, and Create a Tag"
  task push: :environment do
    version = Playbook::VERSION
    puts "You about to release version #{version}. Is that correct? (y/N)"
    input = STDIN.gets.chomp
    raise Nope unless input.downcase == "y"

    # RubyGems
    puts "\nCreating Gem..."
    `gem build playbook_ui.gemspec`
    puts "\nPushing to RubyGems..."
    `gem push playbook_ui-#{version}.gem`
    puts "\nPushed to RubyGems. Now lets clean up..."
    `rm -rf playbook_ui-#{version}.gem`

    # NPM
    puts "\nPushing to NPM..."
    `npm publish`

    # Tags
    puts "\nPushed to NPM. Now lets create a tag..."
    puts "\nWrite a brief tag release description. You can edit this later on GitHub."
    description = STDIN.gets.chomp
    puts "\nCreating Tag..."
    `git tag -a #{version} -m "#{description}"`
    puts "\nPushing Tag to GitHub..."
    `git push origin #{version}`

    puts "\n\n"
    puts "Complete! Don't forget to add your release notes https://github.com/powerhome/playbook/releases/tag/#{version}"
  end
end
