require "json"

module Playbook
  module PbDocHelper
    def pb_title(title)
      title.remove('pb_').titleize.tr("_", " ")
    end

    def has_kit_type?(kit, type)
      type ||= "rails"
      story_file = "playbook/pb_#{kit}/docs/#{type}"
      lookup_context.find_all(story_file,[],true).any?
    end

    def pb_kit(kit: "", type: "rails")
      story_file = "playbook/pb_#{kit}/docs/#{type}"
      render partial: story_file if
          lookup_context.find_all(story_file,[],true).any?
    end

    def pb_kits(type: "rails")
      display_kits = []
      MENU["kits"].sort.each do |kit|
        title = render_clickable_title(kit)
        ui = raw("<div class='pb--docItem-ui'>
            #{pb_kit(kit: kit, type: type)}</div>")
        display_kits << title+ui
      end
      raw("<div class='pb--docItem'>"+display_kits.map {
          |k| k }.join("</div><div class='pb--docItem'>")+"</div>")
    end

  private

    def render_clickable_title(kit)
      render :inline => "<a href='#{kit_show_path(kit)}'>#{pb_rails(:heading, props: { text: pb_title(kit), tag: 'h3', size: '2' })}</a>"
    end
  end
end
