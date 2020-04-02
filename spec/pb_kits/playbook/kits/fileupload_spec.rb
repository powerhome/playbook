# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_fileupload/fileupload"

RSpec.describe Playbook::PbFileupload::Fileupload do
  subject { Playbook::PbFileupload::Fileupload }

  it { is_expected.to define_partial }

  # Do not leave this file blank. Use other spec files for example tests.
end
