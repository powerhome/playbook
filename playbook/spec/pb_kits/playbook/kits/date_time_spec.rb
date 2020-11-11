# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_date_time/date_time"

RSpec.describe Playbook::PbDateTime::DateTime do
  subject { Playbook::PbDateTime::DateTime }

  it { is_expected.to define_partial }
  it { is_expected.to define_prop(:show_icon)
                      .of_type(Playbook::Props::Boolean)
                      .with_default(false) }
  it { is_expected.to define_prop(:show_day_of_week)
                      .of_type(Playbook::Props::Boolean)
                      .with_default(false) }                    
  it { is_expected.to define_prop(:dark)
                      .of_type(Playbook::Props::Boolean)
                      .with_default(false) }
  it { is_expected.to define_prop(:date)
                      .of_type(Playbook::Props::Date) }
  it { is_expected.to define_enum_prop(:align)
                      .with_values("left", "center", "right")
                      .with_default "left" }
  it { is_expected.to define_enum_prop(:size)
                      .with_values("sm", "md")
                      .with_default "md" }

end
