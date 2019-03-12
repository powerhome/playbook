require "webpacker/react/railtie" if defined?(Rails)
require "webpacker/react/helpers"
require "webpacker/react/component"

module Playbook
  module PbKitHelper
    def pb_rails(kit, props:{}, &block)
      render_rails(kit, props, &block)
    end

    def pb_react(kit, props:{}, options:{})
      render_react(kit, props, options)
    end


  private

    def render_rails(kit, props, &block)
      props = defined?(props) && !props.nil? ? props : {}
      kit_class_obj = get_class_name(kit)
      return render(partial: kit_class_obj.new(**props, &block), as: :object)
    end

    def render_react(kit, props, options)
      if defined?(props[:props]) && !props[:props].nil?
        props = props[:props] if props.keys[0] === :props
      end
      return ::Webpacker::React::Component.new(kit.camelize).render(props, options)
    end

    def is_subkit?(kit)
      return kit.match(/[\/\\]/)
    end

    def pb_camelize(string)
      return string.to_s.tr(" ", "_").camelize
    end

    def get_class_name(kit)
      folder = is_subkit?(kit) ? pb_camelize(kit.split('/')[0]) : pb_camelize(kit)
      item = is_subkit?(kit) ? pb_camelize(kit.split('/')[-1]) : pb_camelize(kit)
      return "Playbook::Pb#{folder}::#{item}".safe_constantize
    end
  end
end
