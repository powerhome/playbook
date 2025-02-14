# frozen_string_literal: true

module Playbook
  module PbProgressPills
    class ProgressPills < Playbook::KitBase
      prop :active, type: Playbook::Props::Number,
                    default: 0
      prop :value
      prop :steps, type: Playbook::Props::Number,
                   default: 3
      prop :title
      prop :full_width_pill, type: Playbook::Props::Boolean,
                             default: false

      def classname
        generate_classname("pb_progress_pills_kit")
      end

      def with_status
        yield title if title.present?
      end

      def each_step(&block)
        1.upto(steps, &block)
      end

      def active_step(step)
        step <= active ? "_active" : "_inactive"
      end

      def make_full_width
        full_width_pill ? " full_width_pill" : nil
      end

      def aria_attributes
        return aria if aria.present?

        { hidden: true }
      end

      def dark_pill
        dark ? " dark" : nil
      end
    end
  end
end
