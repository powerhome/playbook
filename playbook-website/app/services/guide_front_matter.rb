# frozen_string_literal: true

require "yaml"

class GuideFrontMatter
  def self.parse(source)
    match = source.match(/\A\uFEFF?---[ \t]*\r?\n(.*?)^---[ \t]*\r?$\n?/m)
    return {} unless match

    metadata = YAML.safe_load(match[1]) || {}
    raise ArgumentError, "Guide front matter must be a mapping" unless metadata.is_a?(Hash)

    metadata
  end
end
