module Playbook
  module PbDocHelper
    def pb_title(title)
      title.remove('pb_').titleize.tr("_", " ")
    end

    def has_kit_type?(kit, type)
      type ||= "rails"
      if type == "rails"
        Dir["playbook/pb_#{kit}/*.html.erb"].empty?
      elsif type == "react"
        Dir["playbook/pb_#{kit}/*.jsx"].empty?
      end
    end

    def pb_kit(kit: "", type: "rails")
      @type = type
      @kit_examples = get_kit_examples(kit, type)
      render partial: "playbook/shared/kit_example"
    end

    def pb_kit_first(kit: "", type: "rails")
      @type = type
      kit_example_list = get_kit_examples(kit, type)
      @kit_examples = !kit_example_list.nil? && kit_example_list.count > 0 ? kit_example_list.take(1) : []
      render partial: "playbook/shared/kit_example"
    end

    # DEPRECIATED - Please leave in place until finalized
    # def pb_kit(kit: "", type: "rails")
    #   story_file = "playbook/pb_#{kit}/docs/#{type}"
    #   pb_kit_examples(kit, type)
    #   render partial: story_file if
    #       lookup_context.find_all(story_file,[],true).any?
    # end

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
    def get_kit_examples(kit, type)
      example_file = "#{Playbook::Engine.root}/app/pb_kits/playbook/pb_#{kit}/docs/example.yml"
      if File.exist? example_file
        examples_list = YAML.load_file(example_file)
        examples_list = examples_list.inject({}){|item,(k,v)| item[k.to_sym] = v; item}
        all_kit_examples = {}
        all_kit_examples[:kit] = kit
        all_kit_examples[:examples] = examples_list[:examples][type]
        pp all_kit_examples[:examples]
        return all_kit_examples
      else
        return {}
      end
    end

    def render_clickable_title(kit)
      render :inline => "<a href='#{kit_show_path(kit)}'>#{pb_rails(:heading, props: { text: pb_title(kit), tag: 'h3', size: '2' })}</a>"
    end
  end
end
