# frozen_string_literal: true

namespace :pb_release do
  desc "Update the version number in preparation to release"
  task :version do
    puts "\n"
    puts "*" * 20
    puts " Create New Playbook Release "
    puts "*" * 20
    ack = "\nFirst, before creating a new version please make sure you are familiar with SemVer guidlines: "
    ack += "\nhttps://semver.org/#semantic-versioning-specification-semver. "
    ack += "\n\nDoing so will ensure the proper version is selected for the release. "
    ack += "\nSee also: https://github.com/powerhome/playbook/wiki/Releasing-a-New-Version#determining-the-version."
    ack += "\n\nReady to start? y/N"
    $stdout.puts ack
    agreed = $stdin.gets.chomp.downcase

    if agreed == "y"
      old_version = Playbook::VERSION
      $stdout.puts "What would you like the next release number to be? Currently #{old_version}"
      new_version = $stdin.gets.chomp
      puts "Ok great, let's make version #{new_version}"
      puts "\n\n"

      # Update package.json
      package = File.read("package.json")
      new_package = package.gsub(/"version": "#{old_version}",/, "\"version\": \"#{new_version}\",")
      File.open("package.json", "w") { |file| file.puts new_package }
      puts "Updated package.json"

      # Update version.rb
      version_rb = File.read("lib/playbook/version.rb")
      old_version_rb = version_rb.gsub(/PREVIOUS_VERSION\s=\s"\w{1,3}.\w{1,3}.\w{1,3}"/, "PREVIOUS_VERSION = \"#{old_version}\"")
      new_version_rb = old_version_rb.gsub(/\sVERSION\s=\s"\w{1,3}.\w{1,3}.\w{1,3}"/, " VERSION = \"#{new_version}\"")
      File.open("lib/playbook/version.rb", "w") { |file| file.puts new_version_rb }
      puts "Updated lib/playbook/version.rb"

      `bundle`
      puts "Updated Gemfile.lock"
      puts "\n\n"

      puts "\nLets create a tag..."
      puts "\nWrite a brief tag release description. You can edit this later on GitHub."
      description = $stdin.gets.chomp
      puts "\nCreating Tag..."
      `git tag -a #{new_version} -m "#{description || new_version}"`
      puts "\nPushing Tag to GitHub..."
      `git push origin #{new_version}`

      puts "Commit your changes and create a PR to merge to master"
    end
  end

  desc "Publish to RubyGems & NPM"
  task :push do
    version = Playbook::VERSION
    puts "You about to release version #{version}. Is that correct? (y/N)"
    input = $stdin.gets.chomp
    raise Nope unless input.downcase == "y"

    # NPM
    puts "\nGenerating distribution files"
    `yarn release`
    puts "\nCreating NPM package..."
    `npm pack`
    puts "\nPublishing to NPM..."
    `npm publish playbook-ui-#{version}.tgz`
    puts "\nPublished to NPM. Now lets clean up..."
    `rm -rf playbook-ui-*.tgz`

    # RubyGems
    puts "\nCreating Gem..."
    `gem build playbook_ui.gemspec`
    puts "\nPushing to RubyGems..."
    `gem push playbook_ui-#{version}.gem`
    puts "\nPushed to RubyGems. Now lets clean up..."
    `rm -rf playbook_ui-*.gem`

    # Tags
    puts "\nPushed to NPM."
    puts "\n\n"
    puts "Complete! Don't forget to add your release notes https://github.com/powerhome/playbook/releases/tag/#{version}"
  end
end
