# frozen_string_literal: true

require "English"

namespace :pb_release do
  desc "Update the version number in preparation to release"
  task :version do
    dryrun = ARGV.include? "-d"
    puts "Dry run only!!!" if dryrun

    puts "\n"
    puts "*" * 20
    puts " Create New Playbook Release "
    puts "*" * 20
    ack = "\nFirst, before creating a new version please make sure you are familiar with SemVer guidlines: "
    ack += "\nhttps://semver.org/#semantic-versioning-specification-semver. "
    ack += "\n\nDoing so will ensure the proper version is selected for the release. "
    ack += "\nSee also: https://github.com/powerhome/playbook/wiki/Releasing-a-New-Version#determining-the-version."
    ack += "\n\nReady to start? Y/N"
    $stdout.puts ack
    agreed = $stdin.gets.chomp.downcase

    exit if agreed != "y"

    old_version = Playbook::VERSION
    $stdout.puts "What would you like the next release number to be? Currently #{old_version}"
    new_version = $stdin.gets.chomp

    alpha = false

    if new_version.scan(".").count > 3
      $stdout.puts "Looks like you are creating an alpha. Is this true? Y/N"
      alpha = $stdin.gets.chomp.downcase == "y"
      unless alpha
        $stdout.puts "Something looks wrong here, cancelling. Please re-check your version number and try again."
        exit
      end
    end

    puts "Ok great, let's make version #{new_version}"
    puts "\n\n"

    new_version_js = alpha ? new_version.gsub(".pre", "").gsub(".alpha", "-alpha") : new_version
    old_version_js = alpha ? old_version.gsub(".pre", "").gsub(".alpha", "-alpha") : old_version

    # Update package.json
    package = File.read("package.json")
    new_package = package.gsub(/"version": "#{old_version_js}",/, "\"version\": \"#{new_version_js}\",")
    File.open("package.json", "w") { |file| file.puts new_package }
    puts "Updated package.json"

    $stdout.puts `(cd ../; yarn)`

    # Update version.rb
    version_rb = File.read("lib/playbook/version.rb")
    old_version_rb = version_rb.gsub(/PREVIOUS_VERSION\s=\s"\w{1,3}.\w{1,3}.\w{1,3}"/, "PREVIOUS_VERSION = \"#{old_version}\"")
    new_version_rb = old_version_rb.gsub(/\sVERSION\s=\s"\w{1,3}.\w{1,3}.\w{1,3}"/, " VERSION = \"#{new_version}\"")
    File.open("lib/playbook/version.rb", "w") { |file| file.puts new_version_rb }
    puts "Updated lib/playbook/version.rb"

    `bundle`
    puts "Updated Gemfile.lock"
    puts "\n\n"

    if alpha || dryrun
      $stdout.puts "Not creating github tag for #{alpha ? 'alpha release' : 'dry run'}."
      exit
    end

    puts "\nLets create a tag..."
    puts "\nWrite a brief tag release description. You can edit this later on GitHub."
    description = $stdin.gets.chomp
    puts "\nCreating Tag..."
    `git tag -a #{new_version} -m "#{description || new_version}"`
    puts "\nPushing Tag to GitHub..."
    `git push origin #{new_version}`

    puts "Commit your changes and create a PR to merge to master"
  end

  def npm_whoami_or_abort!
    puts "\nChecking npm authentication..."
    whoami_output = `npm whoami --registry https://registry.npmjs.org 2>&1`.strip
    if $CHILD_STATUS.success? && !whoami_output.empty?
      puts "✅ Confirmed logged in to npm as #{whoami_output}"
    else
      abort "🚫 Not logged in to npmjs. Please run:\n  npm login --registry https://registry.npmjs.org --auth-type=web"
    end
  end

  desc "Publish to RubyGems & NPM"
  task :push do
    dryrun = ARGV.include? "-d"
    puts "Dry run only!!!" if dryrun

    version = Playbook::VERSION
    looks_like_alpha = version.scan(".").count > 3
    npm_version = looks_like_alpha ? version.gsub(".pre", "").gsub(".alpha", "-alpha") : version
    puts "You about to release version #{version} | #{npm_version} (NPM). Is that correct? (y/N)"
    input = $stdin.gets.chomp
    raise Nope unless input.casecmp("y").zero?

    npm_whoami_or_abort!

    # NPM Packaging
    puts "\nGenerating distribution files"
    `yarn release`
    puts "\nCreating NPM package..."
    `npm pack`

    # RubyGems
    puts "\nCreating Gem..."
    `bin/build_gem`
    puts "\nCreating Docs Gem..."
    `gem build lib/playbook_ui_docs.gemspec`
    # Publish to RubyGems
    unless dryrun
      puts "\nPushing to RubyGems..."
      `gem push playbook_ui-#{version}.gem`
      `gem push playbook_ui_docs-#{version}.gem`
      puts "\nPushed to RubyGems. Now lets clean up..."
      `rm -rf playbook_ui-*.gem playbook_ui_docs-*.gem`
    end

    # Publish to NPM
    unless dryrun
      # `rm -rf dist/playbook-doc.js dist/playbook-rails.js dist/app  dist/pb_doc_helper.rb dist/menu.yml`
      `rm -rf dist/app  dist/pb_doc_helper.rb`
      puts "\nPublishing to NPM..."
      npm_suffix = looks_like_alpha ? "--tag alpha" : ""
      cmd = "npm publish --registry https://registry.npmjs.org playbook-ui-#{npm_version}.tgz #{npm_suffix}"
      puts "$ #{cmd}"
      puts "A browser prompt may open for WebAuthn (Touch ID / YubiKey / passkey)..."
      success = system(cmd)

      abort "npm publish failed. If no browser prompt appeared, try running the same command manually:\n  #{cmd}" unless success

      puts "\nPublished to NPM. Now lets clean up..."
      `rm -rf playbook-ui-*.tgz`
    end

    if dryrun
      puts "Dry run complete. Nothing was published to NPM or RubyGems."
      exit
    end

    # Tags
    puts "\nPushed to NPM."
    puts "\n\n"
    puts "Complete! Don't forget to add your release notes https://github.com/powerhome/playbook/releases/tag/#{version}"
  end
end
