require "webpacker/react/railtie" if defined?(Rails)
require "webpacker/react/helpers"
require "webpacker/react/component"

module Playbook
  module PbKitHelper
    # Public helper to display rails kit
    def pb_rails(kit, props:{}, &block)
      render_rails(kit, props, &block)
    end

    # Public helper to display react kit
    def pb_react(component_name, props = {}, options = {})
      render_react(component_name, props, options)
    end

  private

    def render_rails(kit, props, &block)
      props = defined?(props) && !props.nil? ? props : {}
      if( !kit.match(/[\/\\]/) )
        kit_class_name = kit.to_s.tr(" ", "_").camelize
        kit_class_obj = "Playbook::Pb#{kit_class_name}::#{kit_class_name}"
      else
        kit_folder_name = kit.split('/')[0].to_s.tr(" ", "_").camelize
        kit_class_name = kit.split('/')[-1].to_s.tr(" ", "_").camelize
        kit_class_obj = "Playbook::Pb#{kit_folder_name}::#{kit_class_name}"
      end
      kit_class_obj = kit_class_obj.safe_constantize
      render(partial: kit_class_obj.new(**props, &block), as: :object)
    end

    def render_react(component_name, props = {}, options = {})
      if defined?(props[:props]) && !props[:props].nil?
        if props.keys[0] === :props
          props = props[:props]
        end
      else
        {}
      end
      ::Webpacker::React::Component.new(component_name.camelize).render(props, options)
    end
  end
end
