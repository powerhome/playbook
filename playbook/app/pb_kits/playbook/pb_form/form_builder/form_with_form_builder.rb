# frozen_string_literal: true

module Playbook
  module PbForm
    module FormBuilder
      class FormWithFormBuilder < ActionView::Helpers::FormBuilder
        include FormBuilder
      end
    end
  end
end
