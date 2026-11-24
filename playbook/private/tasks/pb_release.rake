# frozen_string_literal: true

require "English"
require "net/http"

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

    # Appraisal lockfiles pin the local playbook_ui version too; CI installs them frozen.
    # Pin each lockfile's own Bundler so a different Bundler on PATH can't rewrite BUNDLED WITH.
    Dir["gemfiles/*.gemfile"].each do |gemfile|
      env = bundler_pin("#{gemfile}.lock").merge("BUNDLE_GEMFILE" => File.expand_path(gemfile))
      updated = Bundler.with_unbundled_env do
        system(env, "bundle", "install", "--quiet")
      end
      abort "Failed to update #{gemfile}.lock. Run `BUNDLE_GEMFILE=#{gemfile} bundle install` and retry." unless updated
      puts "Updated #{gemfile}.lock"
    end

    # The website bundles playbook_ui from this checkout, so its lockfile records the version too.
    # Clear Bundler's env so this bundles playbook-website's Gemfile, not playbook's, but pin the
    # lockfile's own Bundler so a different Bundler on PATH can't rewrite BUNDLED WITH.
    website_dir = "../playbook-website"
    website_bundled = Bundler.with_unbundled_env { system(bundler_pin("#{website_dir}/Gemfile.lock"), "bundle", chdir: website_dir) }
    if website_bundled
      puts "Updated playbook-website/Gemfile.lock"
    else
      warn "Could not update playbook-website/Gemfile.lock. Run `bundle` in playbook-website."
    end
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

    generate_changelog

    puts "\nChanged files:"
    system("git", "status", "--short", chdir: "..")
    puts "\nEdit the title and description in CHANGELOG.md, then commit your changes and create a PR to merge to master"
  end

  # Env that runs the Bundler version a lockfile was written with, so bundling keeps its BUNDLED WITH.
  def bundler_pin(lockfile)
    bundled_with = File.exist?(lockfile) && File.read(lockfile)[/^BUNDLED WITH\n\s+(\S+)/, 1]
    bundled_with ? { "BUNDLER_VERSION" => bundled_with } : {}
  end

  # Runs in a separate process so the generator reads the new version from version.rb.
  def generate_changelog
    puts "\nGenerating the CHANGELOG.md section..."
    env = {}
    unless %w[CHANGELOG_GITHUB_TOKEN GH_TOKEN GITHUB_TOKEN].any? { |key| !ENV[key].to_s.strip.empty? }
      gh_token = `gh auth token 2>/dev/null`.strip
      env["CHANGELOG_GITHUB_TOKEN"] = gh_token unless gh_token.empty?
    end

    generated = Bundler.with_unbundled_env do
      system(env, "ruby", "-Ilib", "-rplaybook/changelog_generator", "-e", "Playbook::ChangelogGenerator.run!")
    end
    warn "Changelog generation failed. Fix the error above, then run `make changelog` from the repo root." unless generated
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

    puts "\nChecking for external runtime dependencies..."
    abort "Release stopped. Fix the external runtime dependency check above, then retry." unless system("yarn", "check:external-deps")

    resume = ENV["PLAYBOOK_RESUME_RELEASE"] == "1"
    abort "Resume is only available for publishing." if resume && dryrun

    package_args = ["bash", "bin/package_release", npm_version, version]
    package_args << "--verify-only" if resume
    abort "Release stopped. Package preparation failed." unless system(*package_args)

    unless dryrun
      resume_hint = "Keep both packages and rerun with PLAYBOOK_RESUME_RELEASE=1, or run the command manually."

      puts "\nPushing to RubyGems..."
      puts "If MFA is enabled (UI and API), you will be prompted for an OTP code..."
      gem_file = "playbook_ui-#{version}.gem"
      gem_cmd = "gem push #{gem_file}"
      gem_published = system("bash", "bin/publish_release_package", "rubygems", version)
      abort "gem push failed for #{gem_file}. If no OTP prompt appeared, try:\n  #{gem_cmd}\nor:\n  #{gem_cmd} --otp YOUR_CODE\n#{resume_hint}" unless gem_published

      puts "\nPublishing to NPM..."
      puts "A browser prompt may open for WebAuthn (Touch ID / YubiKey / passkey)..."
      npm_tag_args = looks_like_alpha ? ["--tag", "alpha"] : []
      npm_cmd = ["npm publish --registry https://registry.npmjs.org playbook-ui-#{npm_version}.tgz", *npm_tag_args].join(" ")
      npm_published = system("bash", "bin/publish_release_package", "npm", npm_version, *npm_tag_args)
      abort "npm publish failed. If no browser prompt appeared, try running the same command manually:\n  #{npm_cmd}\n#{resume_hint}" unless npm_published

      File.delete("playbook_ui-#{version}.gem", "playbook-ui-#{npm_version}.tgz")
    end

    if dryrun
      puts "Dry run complete. Nothing was published to NPM or RubyGems."
      exit
    end

    # Tags
    puts "\nPushed to NPM."
    verify_published(version, npm_version)
    puts "\n\n"
    puts "Complete! Don't forget to add your release notes https://github.com/powerhome/playbook/releases/tag/#{version}"
  end

  # Confirms both registries list the release, so you do not need to check email or the registry sites.
  def verify_published(version, npm_version)
    puts "\nChecking that both registries list the release..."
    {
      "RubyGems" => ["https://rubygems.org/api/v2/rubygems/playbook_ui/versions/#{version}.json",
                     "https://rubygems.org/gems/playbook_ui/versions/#{version}"],
      "npm" => ["https://registry.npmjs.org/playbook-ui/#{npm_version}",
                "https://www.npmjs.com/package/playbook-ui/v/#{npm_version}"],
    }.each do |registry, (api_url, page_url)|
      if registry_lists?(api_url)
        puts "✅ #{registry}: #{page_url}"
      else
        warn "⚠️  #{registry} does not list #{registry == 'npm' ? npm_version : version} yet. Check #{page_url} in a few minutes."
      end
    end
  end

  def registry_lists?(url)
    3.times do |attempt|
      sleep(5) if attempt.positive?
      begin
        return true if Net::HTTP.get_response(URI(url)).is_a?(Net::HTTPSuccess)
      rescue
        next
      end
    end
    false
  end
end
