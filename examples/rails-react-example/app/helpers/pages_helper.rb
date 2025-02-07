# frozen_string_literal: true

module PagesHelper
  def truncate(str, length)
    if str.length <= length
      str
    else
      "#{str[0...(length - 3)]}..."
    end
  end

  def user_nav_options
    [
      {
        label: "Profile",
        value: "Profile",
        icon: "user",
        id: "profile",
        link: root_path
      },
      {
        label: "Alerts",
        value: "Alerts",
        count: current_user.notifications,
        icon: "bell",
        id: "alerts",
        link: root_path
      },
      {
        label: "Inbox",
        value: "Inbox",
        count: current_user.inbox,
        icon: "inbox",
        id: "inbox",
        link: root_path
      },
      {
        label: "Settings",
        value: "Settings",
        icon: "gear",
        id: "settings",
        link: root_path
      },
      {
        label: "Log Out",
        value: "Log Out",
        icon: "right-from-bracket",
        id: "log_out",
        link: root_path
      },
    ]
  end
end
