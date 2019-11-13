# frozen_string_literal: true

module Playbook
  module PbProgressPills
    class ProgressPills
      include Playbook::Props

      partial "pb_progress_pills/progress_pills"

      prop :active, type: Playbook::Props::Number,
                    default: 0
      prop :text
      prop :dark, type: Playbook::Props::Boolean,
                  default: false
      prop :steps, type: Playbook::Props::Number,
                   default: 3
      prop :status

      def classname
        generate_classname("pb_progress_pills_kit", dark_class)
      end

      def dark_class
        dark ? "dark" : nil
      end

      def with_status
        yield status if status.present?
      end

      def each_step(&block)
        1.upto(steps, &block)
      end

      def active_step(step)
         step <= active ? "_active" : "_inactive"
      end

      def dark_pill
          dark ? "_dark" : nil
      end

    end
  end
end
