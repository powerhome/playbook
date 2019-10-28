# frozen_string_literal: true

module Playbook
  module PbLabelPill
    class LabelPill
      include Playbook::Props

      partial "pb_label_pill/label_pill"

      prop :variant, default: "neutral"
      prop :label
      prop :pill_value

      def classname
        generate_classname("pb_label_pill_label")
      end
      # def label
      #   if is_set? configured_label
      #     pb_caption = Playbook::PbCaption::Caption.new(text: configured_label, classname: "pb_label_pill_label")
      #     ApplicationController.renderer.render(partial: pb_caption, as: :object)
      #   end
      # end

      # def pill
      #   if is_set? configured_pill_value
      #     pb_pill = Playbook::PbPill::Pill.new(text: configured_pill_value, variant: variant, classname: "pb_label_pill_pill")
      #     ApplicationController.renderer.render(partial: pb_pill, as: :object)
      #   end
      # end
    end
  end
end
