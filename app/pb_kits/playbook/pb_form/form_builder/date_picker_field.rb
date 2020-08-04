# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      module DatePickerField
        # def date_field(name, props: {})
        #   # props[:name] = name

        #   input = super(name)
        #   puts name
        #   puts input

        #   @template.pb_rails("date_picker", props: props) do
        #     input
        #   end
        # end
        # def date_picker(name, props: {})
        #   predicate = name.to_s.split("_")[0]
        #   html_name = "#{predicate}[#{name}]"
        #   id = predicate + "_" + name.to_s

        #   props[:name] = html_name
        #   props[:picker_id] = id

        #   @template.pb_rails("date_picker", props: props)
        # end
        def date_picker(_name, props: {})
          @template.pb_rails("date_picker", props: props)
        end
      end
    end
  end
end
