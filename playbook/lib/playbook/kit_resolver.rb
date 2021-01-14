# frozen_string_literal: true

module Playbook
  class KitResolver
    def self.resolve(*args)
      @resolver ||= new
      @resolver.resolve(*args)
    end

    def initialize
      @cache = Hash.new do |cache, kit_name|
        is_subkit = kit_name.match(%r{[/\\]})
        folder = is_subkit ? kit_name.split("/")[0] : kit_name
        item = is_subkit ? kit_name.split("/")[-1] : kit_name
        @cache[kit_name] = "Playbook::Pb#{folder.camelize}::#{item.camelize}"
      end
    end

    def resolve(kit_name)
      @cache[kit_name].safe_constantize
    end
  end
end
