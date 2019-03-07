require "webpacker/react/railtie" if defined?(Rails)
require "webpacker/react/helpers"
require "webpacker/react/component"

module Playbook
  module PbKitHelper
    def pb_rails(kit, props:{}, docs: false, &block)
      render_rails(kit, props, docs, &block)
    end

    def pb_react(kit, props:{}, docs: false, options:{})
      render_react(kit, props, docs, options)
    end

    # def pb_explode(kit)
    #   @exists = nil
    #
    #   Dir.foreach("../../app/pb_kits/playbook/pb_#{kit}/docs/examples/") do |kitVariation|
    #     next if kitVariation == '.' or kitVariation == '..'
    #     kitVariation = File.basename(kitVariation,'.html.erb')
    #     kitVariation = kitVariation[1..-1]
    #
    #     f = File.open("../../app/pb_kits/playbook/pb_#{kit}/docs/rails.html.slim", "r")
    #       f.each_line do |line|
    #         if line.include? "\= render partial: \"playbook/pb_list/docs/examples/#{kitVariation}\""
    #           puts "This kit variation exists"
    #           @exists = true
    #         else
    #           @exists = false
    #         end
    #       end
    #     f.close
    #
    #     open('../../app/pb_kits/playbook/pb_list/docs/rails.html.slim', 'a') { |f|
    #       f.puts "\= render partial: \"playbook/pb_list/docs/examples/#{kitVariation}\""
    #     }
    #     puts "kit injected"
    #
    #   end
    # end


  private


    def render_rails(kit, props, docs, &block)
      props = defined?(props) && !props.nil? ? props : {}
      kit_class_obj = get_class_name(kit)
      available_props = kit_class_obj.options if defined? kit_class_obj.options

      ui = render(partial: kit_class_obj.new(**props, &block), as: :object)
      docs == true ? render_docs(kit, props, "rails", ui, available_props, block) : ui
    end

    def render_react(kit, props, docs, options)
      if defined?(props[:props]) && !props[:props].nil?
        props = props[:props] if props.keys[0] === :props
      end

      ui = ::Webpacker::React::Component.new(kit.camelize).render(props, options)
      docs == true ? render_docs(kit, props, "react", ui, nil) : ui
    end

    def is_subkit?(kit)
      kit.match(/[\/\\]/)
    end

    def pb_camelize(string)
      string.to_s.tr(" ", "_").camelize
    end

    def get_class_name(kit)
      folder = is_subkit?(kit) ? pb_camelize(kit.split('/')[0]) : pb_camelize(kit)
      item = is_subkit?(kit) ? pb_camelize(kit.split('/')[-1]) : pb_camelize(kit)
      "Playbook::Pb#{folder}::#{item}".safe_constantize
    end

    def render_docs(kit, props, type, ui, available_props, block=nil)
      if defined?(kit) && defined?(ui)
        available_props ||= []
        theme = defined?(props[:dark]) && props[:dark] == true ? "dark" : "light"
        wrap = raw("<div class='pb--kit-example'>#{ui}</div>")
        docs = render(partial: Playbook::Config::PbDoc.new(
                {name: kit, props: props, nested: block, type: type, available_props: available_props}
              ), as: :object)
        raw "<div class=\"pb--doc #{theme}_ui\">#{wrap+docs}</div>"
      end
    end
  end
end
