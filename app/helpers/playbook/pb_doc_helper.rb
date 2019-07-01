module Playbook
  module PbDocHelper
    def pb_kit_title(title)
      return title.remove('pb_').titleize.tr("_", " ")
    end

    def has_kit_type?(kit, type)
      type ||= "rails"
      if type == "rails"
        return Dir["playbook/pb_#{kit}/*.html.erb"].empty?
      elsif type == "react"
        return Dir["playbook/pb_#{kit}/*.jsx"].empty?
      end
    end

    def pb_kit(kit: "", type: "rails")
      @type = type
      @kit_examples = get_kit_examples(kit, type)
      return render partial: "playbook/config/kit_example"
    end

    def pb_kits(type: "rails")
      display_kits = []
      MENU["kits"].sort.each do |kit|
        title = render_clickable_title(kit)
        ui = raw("<div class='pb--docItem-ui'>
            #{pb_kit(kit: kit, type: type)}</div>")
        display_kits << title+ui
      end
      return raw("<div class='pb--docItem'>"+display_kits.map {
          |k| k }.join("</div><div class='pb--docItem'>")+"</div>")
    end

    def pb_kit_api(kit)
      kit_class_obj = get_class_name(kit)
      @kit_api = kit_class_obj.instance_method(:initialize).parameters.map(&:last)
      return render partial: "playbook/config/pb_kit_api"
    end

  private
    def get_kit_examples(kit, type)
      example_file = File.join(Playbook::Engine.root,
          "app", "pb_kits", "playbook", "pb_#{kit}", "docs", "example.yml")
      if File.exist? example_file
        examples_list = YAML.load_file(example_file)
        examples_list = examples_list.inject({}){|item,(k,v)| item[k.to_sym] = v; item}
        all_kit_examples = {}
        all_kit_examples[:kit] = kit
        all_kit_examples[:examples] = examples_list[:examples][type]
        return all_kit_examples
      else
        return {}
      end
    end

    def get_class_name(kit)
      folder = is_subkit?(kit) ? pb_camelize(kit.split('/')[0]) : pb_camelize(kit)
      item = is_subkit?(kit) ? pb_camelize(kit.split('/')[-1]) : pb_camelize(kit)
      return "Playbook::Pb#{folder}::#{item}".safe_constantize
    end

    def render_clickable_title(kit)
      return render :inline => "<a href='#{kit_show_path(kit)}'>
          #{pb_rails(:title, props: { text: pb_kit_title(kit),
          tag: 'h3', size: '2' })}</a>"
    end
  end
end
