require "json"

module Playbook
  module PbDocHelper
    # Generate pretty kit names
    def pb_title(title)
      title.remove('pb_').titleize.tr("_", " ")
    end

    # Generate all variations of a kit with docs
    def pb_kit(kit: "", type: "rails", show_docs: true)
      if has_variations?(kit)
        kit_variations = get_variations(kit)

        display_variations = []
        kit_variations[:variations].each do |variation|
          if type == "rails"
            if has_children?(variation)
              render_children_obj = render_children(variation)
              display_variations << render_variation(kit, variation, render_children_obj[:children], render_children_obj[:helper_children], show_docs)
            else
              if show_docs == true
                kit_render = pb_rails_with_docs("#{kit}", props: variation[:props], doc_variation: variation)
              else
                kit_render= pb_rails("#{kit}", props: variation[:props])
              end
              display_variations << kit_render
            end
          elsif type == "react"
            display_variations << render_react_pack(kit, variation[:props], show_docs, variation)
          end
        end
        start_doc = render_doc("playbook/pb_#{kit}/start") if lookup_context.find_all("playbook/pb_#{kit}/start",[],true).any?
        variations = raw display_variations.map { |k| k }.join(" ")
        end_doc = render_doc("playbook/pb_#{kit}/end") if lookup_context.find_all("playbook/pb_#{kit}/end",[],true).any?
        kit_display_obj = [
          start_doc,
          variations,
          end_doc
        ]

        if show_docs == true
          raw kit_display_obj.join(" ")
        else
          raw variations
        end
      else
        return
      end
    end

    # Generate all vartiations of all kits without docs
    def pb_kits(type: "rails")
      display_kits = []
      MENU["kits"].sort.each do |kit|
        title = render_clickable_title(kit)
        ui = pb_kit(kit: kit, type: type, show_docs: false)
        display_kits << title+ui
      end
      raw("<div class='pb--docItem'>"+display_kits.map { |k| k }.join("</div><div class='pb--docItem'>")+"</div>")
    end

    # Display rails kit ui with docs
    def pb_rails_with_docs(kit, props:{}, doc_variation: variation, doc_children: doc_children, &block)
      ui_color = get_variation_theme(props)
      ui = raw("<div class='pb--kit-example #{ui_color}-ui'>"+render_rails(kit, props, &block)+"</div>")
      docs = render_variation_docs(kit, props, "rails", children:doc_children, block:block)
      variation_title = render_variation_title(doc_variation)
      usage = render_variation_usage(doc_variation)
      variation_title+usage+ui+docs
    end

    # Display react kit ui with docs
    def pb_react_with_docs(kit, props:{}, options:{}, doc_variation: variation, doc_children: doc_children)
      ui_color = get_variation_theme(props)
      ui = raw("<div class='pb--kit-example #{ui_color}-ui'>"+render_react(kit, props, options)+"</div>")
      docs = render_variation_docs(kit, props, "react")
      variation_title = render_variation_title(doc_variation)
      usage = render_variation_usage(doc_variation)
      variation_title+usage+ui+docs
    end

  private
    # Variations
    def has_variations?(name)
      File.file?("#{Playbook::Engine.root}/app/pb_kits/playbook/pb_#{name}/_variations.json")
    end

    def render_variation(kit, variation, children, helper_children, show_docs)
      if show_docs == true
        pb_rails_with_docs("#{kit}", props: variation[:props], doc_variation: variation, doc_children: helper_children) do
          children.map { |k| k }.join(" ").html_safe
        end
      else
        pb_rails("#{kit}", props: variation[:props]) do
          children.map { |k| k }.join(" ").html_safe
        end
      end
    end

    def render_variation_docs(kit, props, type, children:{}, block:nil)
      render(partial: Playbook::Config::PbDoc.new(
        {name: "#{kit}", props: props, nested: block, type: type, doc_children: children}
      ), as: :object)
    end

    def render_variation_title(doc_variation)
      defined?(doc_variation[:name]) && (doc_variation[:name] != nil) ? raw("<h4>#{pb_title(doc_variation[:name])}</h4>") : ""
    end

    def render_variation_usage(doc_variation)
      defined?(doc_variation[:usage]) && (doc_variation[:usage] != nil) ? raw("<div class='pb--doc-usage'>Usage: <span>"+doc_variation[:usage]+"</span></div>") : ""
    end

    def get_variation_theme(props)
      defined?(props[:dark]) && props[:dark] == true ? "dark" : "light"
    end

    def get_variations(name)
      json_from_file = File.read("#{Playbook::Engine.root}/app/pb_kits/playbook/pb_#{name}/_variations.json")
      data = JSON.parse(json_from_file, :symbolize_names => true)
    end

    # Children
    def has_children?(variation)
      !variation[:children].nil?
    end

    def render_children(variation)
      children = []
      helper_children = []
      variation[:children].each do |child|
        if child[:type] == "string" || child[:type] == "html"
          helper_children << child[:value].html_safe
          children << child[:value].html_safe
        elsif child[:type] == "kit"
          helper_children << "<%= pb_rails(\"#{child[:value][:name]}\", props: #{child[:value][:props].to_json})%>"
          children << pb_rails("#{child[:value][:name]}", props: child[:value][:props])
        end
      end
      obj = {
        children: children,
        helper_children: helper_children
      }
    end

    def render_child(child)
      if child[:type] == "string" || child[:type] == "html"
        child[:value].html_safe
      elsif child[:type] == "kit"
        pb_rails("#{child[:value][:name]}", props: child[:value][:props])
      end
    end

    # Other
    def render_react_pack(kit, props, show_docs, variation)
      if show_docs == true
        kit_render = pb_react_with_docs("#{kit.camelize}", props: props, options: {}, doc_variation: variation)
      else
        kit_render = pb_react("#{kit.camelize}", props: props)
      end
      react_pack = [
        kit_render
      ]
      react_pack.join(" ");
    end

    def render_clickable_title(kit)
      render :inline => "<a href='#{kit_show_path(kit)}'>#{pb_rails(:heading, props: { text: pb_title(kit), tag: 'h3', size: '2' })}</a>"
    end

    def render_doc(path)
      render partial: path
    end
  end
end
